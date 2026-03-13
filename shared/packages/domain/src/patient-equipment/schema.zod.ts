import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const patientEquipmentRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  name: z.string(),
  description: z.string().nullable(),
  date_received: isoDate,
  date_prescribed: isoDate.nullable(),
  manufacturer: z.string().nullable(),
  model_number: z.string().nullable(),
  serial_number: z.string().nullable(),
  size: z.string().nullable(),
  prescribed_by_id: uuid.nullable(),
  reason_prescribed: z.string(),
  notes: z.string().nullable(),
  warranty_expiration: isoDate.nullable(),
  maintenance_due_date: isoDate.nullable(),
  created_at: isoDateTime.nullable(),
  updated_at: isoDateTime.nullable(),
  status: z.string().nullable(),
  deleted_at: isoDateTime.nullable(),
  supplier_id: uuid.nullable()
});

export const patientEquipmentInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  name: z.string(),
  description: z.string().nullable().optional(),
  date_received: isoDate,
  date_prescribed: isoDate.nullable().optional(),
  manufacturer: z.string().nullable().optional(),
  model_number: z.string().nullable().optional(),
  serial_number: z.string().nullable().optional(),
  size: z.string().nullable().optional(),
  prescribed_by_id: uuid.nullable().optional(),
  reason_prescribed: z.string(),
  notes: z.string().nullable().optional(),
  warranty_expiration: isoDate.nullable().optional(),
  maintenance_due_date: isoDate.nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  updated_at: isoDateTime.nullable().optional(),
  status: z.string().nullable().optional(),
  deleted_at: isoDateTime.nullable().optional(),
  supplier_id: uuid.nullable().optional()
});

export const patientEquipmentUpdateSchema = patientEquipmentInsertSchema.partial();
