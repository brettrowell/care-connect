import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { PatientDailyEvent } from '@/types/supabase';

export const eventsKeys = {
  all: ['events'] as const,
  list: (patientId: string, limit?: number) => ['events', patientId, limit ?? 50] as const,
};

/** Uses existing patient_daily_events (event_type, media_attachment_ids); maps to app shape. */
export function useRecentEvents(patientId: string | undefined, limit = 50) {
  return useQuery({
    queryKey: eventsKeys.list(patientId ?? '', limit),
    queryFn: async (): Promise<PatientDailyEvent[]> => {
      const { data, error } = await supabase
        .from('patient_daily_events')
        .select('*')
        .eq('patient_id', patientId!)
        .order('occurred_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      const rows = (data ?? []) as any[];
      return rows.map((r) => ({
        id: r.id,
        patient_id: r.patient_id,
        type: (r.type ?? r.event_type) as PatientDailyEvent['type'],
        occurred_at: r.occurred_at,
        data: r.data ?? {},
        notes: r.notes ?? null,
        media_urls: Array.isArray(r.media_urls) ? r.media_urls : (r.media_attachment_ids ?? []).map((u: string) => String(u)),
        consumed_supply_id: r.consumed_supply_id ?? null,
        created_by: r.created_by ?? null,
        created_at: r.created_at,
      }));
    },
    enabled: !!patientId,
  });
}
