import type { Database } from "@care-connect/db";

export type AttachmentRow = Database["public"]["Tables"]["attachments"]["Row"];
export type AttachmentInsert = Database["public"]["Tables"]["attachments"]["Insert"];
export type AttachmentUpdate = Database["public"]["Tables"]["attachments"]["Update"];
export type AttachmentId = AttachmentRow["id"];
