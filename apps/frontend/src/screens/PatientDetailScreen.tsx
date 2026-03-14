import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as DocumentPicker from "expo-document-picker";
import { Button, Card, Input } from "@care-connect/ui/native";
import {
  parseAttachmentInsert,
  parseNoteInsert,
  parsePatientEventInsert,
  QUICK_EVENT_TYPE_NAMES,
  type AttachmentRow,
  type NoteRow,
  type PatientRow,
  type QuickEventTypeName
} from "@care-connect/domain";
import { supabase } from "../config/supabase";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "PatientDetail">;

type EventTypeRow = { id: string; name: string; category: string | null };
type PatientEventRow = {
  id: string;
  patient_id: string;
  event_type_id: string | null;
  title: string | null;
  description: string | null;
  event_date: string | null;
  notes: string | null;
  created_at: string | null;
};

type NoteWithAttachments = {
  note: NoteRow;
  attachments: AttachmentRow[];
};

type SelectedFile = {
  uri: string;
  name: string;
  mimeType?: string | null;
  size?: number | null;
};

const ATTACHMENTS_BUCKET = "attachments";

function buildStoragePath(noteId: string, fileName: string) {
  const safeName = fileName.trim().replace(/\s+/g, "_");
  return `notes/${noteId}/${safeName}`;
}

export default function PatientDetailScreen({ route }: Props) {
  const { patientId } = route.params;
  const [patient, setPatient] = useState<PatientRow | null>(null);
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [attachmentsByNote, setAttachmentsByNote] = useState<Record<string, AttachmentRow[]>>({});
  const [eventTypes, setEventTypes] = useState<EventTypeRow[]>([]);
  const [quickEvents, setQuickEvents] = useState<PatientEventRow[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);

  const [quickEventType, setQuickEventType] = useState<QuickEventTypeName | null>(null);
  const [quickEventDescription, setQuickEventDescription] = useState("");
  const [quickEventNotes, setQuickEventNotes] = useState("");
  const [quickEventSubmitting, setQuickEventSubmitting] = useState(false);

  const loadPatient = useCallback(async () => {
    const { data, error: patientError } = await supabase
      .from("patients")
      .select("*")
      .eq("id", patientId)
      .single();

    if (patientError) {
      setError(patientError.message);
      return;
    }

    setPatient(data ?? null);
  }, [patientId]);

  const loadAttachments = useCallback(async (noteIds: string[]) => {
    if (noteIds.length === 0) {
      setAttachmentsByNote({});
      return;
    }

    const { data, error: attachmentError } = await supabase
      .from("attachments")
      .select("*")
      .eq("attached_type", "note")
      .in("attached_id", noteIds);

    if (attachmentError) {
      setError(attachmentError.message);
      return;
    }

    const grouped = (data ?? []).reduce<Record<string, AttachmentRow[]>>((acc, attachment) => {
      const list = acc[attachment.attached_id] ?? [];
      list.push(attachment);
      acc[attachment.attached_id] = list;
      return acc;
    }, {});

    setAttachmentsByNote(grouped);
  }, []);

  const loadNotes = useCallback(async () => {
    const { data, error: notesError } = await supabase
      .from("notes")
      .select("*")
      .eq("patient_id", patientId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (notesError) {
      setError(notesError.message);
      return;
    }

    const rows = data ?? [];
    setNotes(rows);
    await loadAttachments(rows.map((row) => row.id));
  }, [patientId, loadAttachments]);

  const loadEventTypes = useCallback(async () => {
    const { data, error: typesError } = await supabase
      .from("event_types")
      .select("id, name, category")
      .eq("category", "quick");

    if (typesError) {
      setError(typesError.message);
      return;
    }
    setEventTypes((data ?? []) as EventTypeRow[]);
  }, []);

  const loadQuickEvents = useCallback(async () => {
    const { data: typesData } = await supabase
      .from("event_types")
      .select("id")
      .eq("category", "quick");
    const typeIds = (typesData ?? []).map((r) => r.id);
    if (typeIds.length === 0) {
      setQuickEvents([]);
      return;
    }

    const { data, error: eventsError } = await supabase
      .from("patient_events")
      .select("id, patient_id, event_type_id, title, description, event_date, notes, created_at")
      .eq("patient_id", patientId)
      .in("event_type_id", typeIds)
      .is("deleted_at", null)
      .order("event_date", { ascending: false })
      .limit(50);

    if (eventsError) {
      setError(eventsError.message);
      return;
    }
    setQuickEvents((data ?? []) as PatientEventRow[]);
  }, [patientId]);

  useEffect(() => {
    loadPatient();
    loadNotes();
    loadEventTypes();
    loadQuickEvents();
  }, [loadPatient, loadNotes, loadEventTypes, loadQuickEvents]);

  const openQuickEventModal = (typeName: QuickEventTypeName) => {
    setQuickEventType(typeName);
    setQuickEventDescription("");
    setQuickEventNotes("");
  };

  const closeQuickEventModal = () => {
    setQuickEventType(null);
    setQuickEventDescription("");
    setQuickEventNotes("");
  };

  const submitQuickEvent = async () => {
    if (!quickEventType || !quickEventDescription.trim()) return;
    const eventType = eventTypes.find((e) => e.name === quickEventType);
    if (!eventType) return;

    setQuickEventSubmitting(true);
    setError(null);
    try {
      const payload = parsePatientEventInsert({
        patient_id: patientId,
        event_type_id: eventType.id,
        title: quickEventType,
        description: quickEventDescription.trim(),
        notes: quickEventNotes.trim() || null,
        event_date: new Date().toISOString(),
        status: "logged"
      });
      const { error: insertError } = await supabase.from("patient_events").insert(payload);
      if (insertError) {
        setError(insertError.message);
        return;
      }
      closeQuickEventModal();
      await loadQuickEvents();
    } finally {
      setQuickEventSubmitting(false);
    }
  };

  const notesWithAttachments = useMemo<NoteWithAttachments[]>(
    () =>
      notes.map((note) => ({
        note,
        attachments: attachmentsByNote[note.id] ?? []
      })),
    [notes, attachmentsByNote]
  );

  const handlePickAttachment = async () => {
    setError(null);
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false
    });

    if (result.canceled) return;
    const asset = result.assets?.[0];
    if (!asset) return;

    setSelectedFile({
      uri: asset.uri,
      name: asset.name ?? "attachment",
      mimeType: asset.mimeType ?? null,
      size: asset.size ?? null
    });
  };

  const handleAddNote = async () => {
    if (!noteBody.trim()) {
      setError("Note body is required.");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const { data: auth } = await supabase.auth.getUser();
      const payload = parseNoteInsert({
        patient_id: patientId,
        title: noteTitle.trim() ? noteTitle.trim() : null,
        note: noteBody.trim(),
        created_by: auth.user?.id ?? null
      });

      const { data: note, error: noteError } = await supabase
        .from("notes")
        .insert(payload)
        .select()
        .single();

      if (noteError) {
        setStatus("error");
        setError(noteError.message);
        return;
      }

      if (selectedFile) {
        const blob = await fetch(selectedFile.uri).then((response) => response.blob());
        const storagePath = buildStoragePath(note.id, selectedFile.name);
        const { error: uploadError } = await supabase.storage
          .from(ATTACHMENTS_BUCKET)
          .upload(storagePath, blob, {
            contentType: selectedFile.mimeType ?? undefined,
            upsert: false
          });

        if (uploadError) {
          setStatus("error");
          setError(uploadError.message);
          return;
        }

        const attachmentPayload = parseAttachmentInsert({
          storage_path: storagePath,
          file_name: selectedFile.name,
          mime_type: selectedFile.mimeType ?? null,
          file_size: selectedFile.size ?? null,
          attached_type: "note",
          attached_id: note.id,
          uploaded_by: auth.user?.id ?? null
        });

        const { error: attachmentError } = await supabase
          .from("attachments")
          .insert(attachmentPayload);

        if (attachmentError) {
          setStatus("error");
          setError(attachmentError.message);
          return;
        }
      }

      setNoteTitle("");
      setNoteBody("");
      setSelectedFile(null);
      setStatus("idle");
      await loadNotes();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to add note.");
    }
  };

  return (
    <>
      <ScrollView className="flex-1 bg-slate-50" contentContainerClassName="px-6 pb-12 pt-6">
        <Text className="text-2xl font-semibold text-slate-900">Patient details</Text>
        {patient ? (
          <Text className="mt-2 text-sm text-slate-600">
            DOB {patient.date_of_birth ?? "Not set"} • Blood type {patient.blood_type ?? "Not set"}
          </Text>
        ) : null}
        {error ? <Text className="mt-3 text-sm text-rose-600">{error}</Text> : null}

        <Card className="mt-6">
          <Text className="text-lg font-semibold text-slate-900">Quick log</Text>
          <Text className="mt-1 text-sm text-slate-600">
            Log bowel, feeding, vomit, or medication with a short description.
          </Text>
          <View className="mt-4 flex-row flex-wrap gap-2">
            {QUICK_EVENT_TYPE_NAMES.map((name) => (
              <Button
                key={name}
                title={name}
                variant="outline"
                onPress={() => openQuickEventModal(name)}
              />
            ))}
          </View>
        </Card>

        {quickEvents.length > 0 ? (
          <Card className="mt-6">
            <Text className="text-lg font-semibold text-slate-900">Recent quick events</Text>
            <View className="mt-4 gap-3">
              {quickEvents.slice(0, 20).map((ev) => (
                <View
                  key={ev.id}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2"
                >
                  <Text className="text-sm font-semibold text-slate-800">
                    {ev.title ?? "Event"}
                  </Text>
                  <Text className="text-sm text-slate-700">{ev.description ?? "—"}</Text>
                  {ev.notes ? (
                    <Text className="mt-1 text-xs text-slate-500">{ev.notes}</Text>
                  ) : null}
                  <Text className="mt-1 text-xs text-slate-400">
                    {ev.event_date ?? ev.created_at ?? ""}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        ) : null}

        <Card className="mt-6">
          <Text className="text-lg font-semibold text-slate-900">Add note</Text>
        <View className="mt-4 gap-3">
          <Input placeholder="Title (optional)" value={noteTitle} onChangeText={setNoteTitle} />
          <Input
            placeholder="Note"
            value={noteBody}
            onChangeText={setNoteBody}
            multiline
            className="min-h-[120px]"
          />
          <Text className="text-xs font-semibold text-slate-700">Attachment (optional)</Text>
          {selectedFile ? (
            <View className="rounded-xl border border-slate-200 bg-white px-3 py-2">
              <Text className="text-xs text-slate-700">{selectedFile.name}</Text>
              <Text className="text-xs text-slate-500">{selectedFile.mimeType ?? "Unknown type"}</Text>
            </View>
          ) : (
            <Text className="text-xs text-slate-500">No file selected.</Text>
          )}
          <Button title="Pick file" variant="outline" onPress={handlePickAttachment} />
          <Button
            title={status === "loading" ? "Saving..." : "Add note"}
            onPress={handleAddNote}
            disabled={status === "loading"}
          />
        </View>
      </Card>

      <Card className="mt-6">
        <Text className="text-lg font-semibold text-slate-900">Notes</Text>
        <View className="mt-4 gap-4">
          {notesWithAttachments.length === 0 ? (
            <Text className="text-sm text-slate-500">No notes yet.</Text>
          ) : null}
          {notesWithAttachments.map(({ note, attachments }) => (
            <View key={note.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <Text className="text-sm font-semibold text-slate-900">
                {note.title ?? "Untitled note"}
              </Text>
              <Text className="mt-2 text-sm text-slate-700">{note.note}</Text>
              <Text className="mt-2 text-xs text-slate-500">{note.created_at ?? ""}</Text>
              {attachments.length > 0 ? (
                <View className="mt-3 gap-2">
                  {attachments.map((attachment) => (
                    <View key={attachment.id} className="rounded-xl bg-slate-50 px-3 py-2">
                      <Text className="text-xs text-slate-700">
                        {attachment.file_name ?? attachment.storage_path}
                      </Text>
                      <Text className="text-xs text-slate-500">{attachment.mime_type ?? ""}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </Card>
      </ScrollView>

      <Modal
        visible={quickEventType !== null}
        transparent
        animationType="fade"
        onRequestClose={closeQuickEventModal}
      >
        <Pressable
          className="flex-1 justify-center bg-black/50 p-6"
          onPress={closeQuickEventModal}
        >
          <Pressable className="rounded-2xl bg-white p-6" onPress={(e) => e.stopPropagation()}>
            <Text className="text-lg font-semibold text-slate-900">
              Log: {quickEventType ?? ""}
            </Text>
            <Text className="mt-1 text-sm text-slate-600">Description (required)</Text>
            <Input
              placeholder="e.g. Normal, loose, blood noted..."
              value={quickEventDescription}
              onChangeText={setQuickEventDescription}
              className="mt-2"
            />
            <Text className="mt-3 text-sm text-slate-600">Notes (optional)</Text>
            <Input
              placeholder="Any extra details"
              value={quickEventNotes}
              onChangeText={setQuickEventNotes}
              className="mt-2"
            />
            <View className="mt-6 flex-row gap-3">
              <Button
                title="Cancel"
                variant="outline"
                onPress={closeQuickEventModal}
                disabled={quickEventSubmitting}
              />
              <Button
                title={quickEventSubmitting ? "Saving..." : "Save"}
                onPress={submitQuickEvent}
                disabled={quickEventSubmitting || !quickEventDescription.trim()}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
