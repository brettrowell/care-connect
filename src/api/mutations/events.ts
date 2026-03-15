import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { PatientDailyEvent, PatientSupply, DailyEventType } from '@/types/supabase';
import { eventsKeys } from '../queries/events';
import { suppliesKeys } from '../queries/supplies';

export interface LogEventInput {
  patient_id: string;
  type: DailyEventType;
  occurred_at?: string;
  data?: Record<string, unknown>;
  notes?: string | null;
  media_urls?: string[];
  consumed_supply_id?: string | null;
}

export function useLogEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LogEventInput): Promise<PatientDailyEvent> => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: patient } = await supabase.from('patients').select('group_id').eq('id', input.patient_id).single();
      const group_id = (patient as any)?.group_id;
      const insertPayload: any = {
        patient_id: input.patient_id,
        event_type: input.type,
        occurred_at: input.occurred_at ?? new Date().toISOString(),
        data: input.data ?? {},
        notes: input.notes ?? null,
        media_attachment_ids: input.media_urls ?? [],
        consumed_supply_id: input.consumed_supply_id ?? null,
        created_by: user?.id ?? null,
      };
      if (group_id) insertPayload.group_id = group_id;
      const { data, error } = await supabase
        .from('patient_daily_events')
        .insert(insertPayload)
        .select()
        .single();
      if (error) throw error;

      if (input.consumed_supply_id) {
        const { data: supply } = await supabase
          .from('patient_supplies')
          .select('quantity, current_quantity')
          .eq('id', input.consumed_supply_id)
          .single();
        const current = (supply as any)?.current_quantity ?? (supply as any)?.quantity;
        if (typeof current === 'number') {
          await supabase
            .from('patient_supplies')
            .update({ quantity: Math.max(0, current - 1) })
            .eq('id', input.consumed_supply_id);
        }
      }
      const row = data as any;
      return {
        ...row,
        type: (row.type ?? row.event_type) as PatientDailyEvent['type'],
        media_urls: row.media_urls ?? (row.media_attachment_ids ?? []).map((u: string) => String(u)),
      } as PatientDailyEvent;
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: eventsKeys.list(input.patient_id) });
      const previous = queryClient.getQueryData<PatientDailyEvent[]>(
        eventsKeys.list(input.patient_id)
      );
      const optimistic: PatientDailyEvent = {
        id: `temp-${Date.now()}`,
        patient_id: input.patient_id,
        type: input.type,
        occurred_at: input.occurred_at ?? new Date().toISOString(),
        data: input.data ?? {},
        notes: input.notes ?? null,
        media_urls: input.media_urls ?? [],
        consumed_supply_id: input.consumed_supply_id ?? null,
        created_by: null,
        created_at: new Date().toISOString(),
      } as PatientDailyEvent;
      queryClient.setQueryData(
        eventsKeys.list(input.patient_id),
        (old: PatientDailyEvent[] | undefined) => [optimistic, ...(old ?? [])]
      );
      if (input.consumed_supply_id) {
        queryClient.cancelQueries({ queryKey: suppliesKeys.list(input.patient_id) });
        const prevSupplies = queryClient.getQueryData(suppliesKeys.list(input.patient_id));
        queryClient.setQueryData(
          suppliesKeys.list(input.patient_id),
          (old: PatientSupply[] | undefined) =>
            (old ?? []).map((s) =>
              s.id === input.consumed_supply_id
                ? { ...s, current_quantity: Math.max(0, s.current_quantity - 1) }
                : s
            )
        );
        return { previousEvents: previous, previousSupplies: prevSupplies };
      }
      return { previousEvents: previous };
    },
    onError: (_err, input, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(
          eventsKeys.list(input.patient_id),
          context.previousEvents
        );
      }
      if (context?.previousSupplies) {
        queryClient.setQueryData(
          suppliesKeys.list(input.patient_id),
          context.previousSupplies
        );
      }
    },
    onSettled: (_, __, input) => {
      queryClient.invalidateQueries({ queryKey: eventsKeys.list(input.patient_id) });
      queryClient.invalidateQueries({ queryKey: suppliesKeys.list(input.patient_id) });
    },
  });
}
