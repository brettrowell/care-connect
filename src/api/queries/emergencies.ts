import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { Emergency } from '@/types/supabase';

export const emergenciesKeys = {
  all: ['emergencies'] as const,
  list: (patientId: string) => ['emergencies', patientId] as const,
};

export function useEmergencies(patientId: string | undefined) {
  return useQuery({
    queryKey: emergenciesKeys.list(patientId ?? ''),
    queryFn: async (): Promise<Emergency[]> => {
      const { data, error } = await supabase
        .from('emergencies')
        .select('*')
        .eq('patient_id', patientId!)
        .order('title');
      if (error) throw error;
      return (data ?? []) as Emergency[];
    },
    enabled: !!patientId,
  });
}
