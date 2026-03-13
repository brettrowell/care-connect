import type { Database } from "@care-connect/db";

export type NoteAttachmentRow = Database["public"]["Tables"]["note_attachments"]["Row"];
export type NoteAttachmentInsert = Database["public"]["Tables"]["note_attachments"]["Insert"];
export type NoteAttachmentUpdate = Database["public"]["Tables"]["note_attachments"]["Update"];
export type NoteAttachmentId = NoteAttachmentRow["id"];
