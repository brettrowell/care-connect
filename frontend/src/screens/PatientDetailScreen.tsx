import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Card, Input } from "@care-connect/ui/native";
import {
  parseAttachmentInsert,
  parseNoteInsert,
  type AttachmentRow,
  type NoteRow,
  type PatientRow
} from "@care-connect/domain";
import { supabase } from "../config/supabase";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "PatientDetail">;

type NoteWithAttachments = {
  note: NoteRow;
  attachments: AttachmentRow[];
};

export default function PatientDetailScreen({ route }: Props) {
  const { patientId } = route.params;
  const [patient, setPatient] = useState<PatientRow | null>(null);
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [attachmentsByNote, setAttachmentsByNote] = useState<Record<string, AttachmentRow[]>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [attachmentPath, setAttachmentPath] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentMime, setAttachmentMime] = useState("");

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

  useEffect(() => {
    loadPatient();
    loadNotes();
  }, [loadPatient, loadNotes]);

  const notesWithAttachments = useMemo<NoteWithAttachments[]>(
    () =>
      notes.map((note) => ({
        note,
        attachments: attachmentsByNote[note.id] ?? []
      })),
    [notes, attachmentsByNote]
  );

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

      if (attachmentPath.trim()) {
        const attachmentPayload = parseAttachmentInsert({
          storage_path: attachmentPath.trim(),
          file_name: attachmentName.trim() ? attachmentName.trim() : null,
          mime_type: attachmentMime.trim() ? attachmentMime.trim() : null,
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
      setAttachmentPath("");
      setAttachmentName("");
      setAttachmentMime("");
      setStatus("idle");
      await loadNotes();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to add note.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerClassName="px-6 pb-12 pt-6">
      <Text className="text-2xl font-semibold text-slate-900">Patient details</Text>
      {patient ? (
        <Text className="mt-2 text-sm text-slate-600">
          DOB {patient.date_of_birth ?? "Not set"} • Blood type {patient.blood_type ?? "Not set"}
        </Text>
      ) : null}
      {error ? <Text className="mt-3 text-sm text-rose-600">{error}</Text> : null}

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
          <Input
            placeholder="Storage path (ex: notes/1234/file.pdf)"
            value={attachmentPath}
            onChangeText={setAttachmentPath}
          />
          <Input placeholder="File name" value={attachmentName} onChangeText={setAttachmentName} />
          <Input placeholder="Mime type" value={attachmentMime} onChangeText={setAttachmentMime} />
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
  );
}
