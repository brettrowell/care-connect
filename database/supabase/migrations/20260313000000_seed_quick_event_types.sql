-- Seed event_types for quick care log (bowel, feeding, vomit, meds).
-- Safe to run multiple times: inserts only when name is missing.
-- Ensure RLS allows your app role to SELECT from event_types and to INSERT/SELECT patient_events (e.g. via group_members + patients).

INSERT INTO public.event_types (name, description, category)
SELECT v.name, v.description, v.category
FROM (VALUES
  ('Bowel movement', 'Quick log: bowel movement with optional description', 'quick'),
  ('Feeding', 'Quick log: feeding with optional description', 'quick'),
  ('Vomit', 'Quick log: vomiting episode with optional description', 'quick'),
  ('Medication', 'Quick log: medication given with optional description', 'quick')
) AS v(name, description, category)
WHERE NOT EXISTS (SELECT 1 FROM public.event_types t WHERE t.name = v.name);
