import { useLogEvent as useLogEventMutation } from '@/api/mutations/events';
import type { DailyEventType } from '@/types/supabase';

export interface LogEventParams {
  patientId: string;
  type: DailyEventType;
  notes?: string | null;
  data?: Record<string, unknown>;
  consumedSupplyId?: string | null;
  mediaUrls?: string[];
}

export function useLogEvent() {
  const mutation = useLogEventMutation();

  const logEvent = (params: LogEventParams) => {
    return mutation.mutateAsync({
      patient_id: params.patientId,
      type: params.type,
      notes: params.notes ?? null,
      data: params.data ?? {},
      consumed_supply_id: params.consumedSupplyId ?? null,
      media_urls: params.mediaUrls ?? [],
    });
  };

  return {
    logEvent,
    isPending: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
