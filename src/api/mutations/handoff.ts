import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { HandoffToken } from '@/types/supabase';

export function useCreateHandoffToken(patientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expiresInHours: number = 24): Promise<HandoffToken> => {
      const { data: { user } } = await supabase.auth.getUser();
      const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString();
      const token = `ht_${crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
      const { data, error } = await supabase
        .from('handoff_tokens')
        .insert({
          patient_id: patientId,
          token,
          expires_at: expiresAt,
          created_by: user?.id ?? null,
        })
        .select()
        .single();
      if (error) throw error;
      return data as HandoffToken;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['handoff_tokens', patientId] });
    },
  });
}
