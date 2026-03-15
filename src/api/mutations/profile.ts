import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { CommunicationCue } from '@/types/supabase';
import { patientsKeys } from '../queries/patients';

export function useUpdateCommunicationDictionary(patientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (communication_dictionary: CommunicationCue[]) => {
      const { data, error } = await supabase
        .from('patient_profiles')
        .upsert(
          { patient_id: patientId, communication_dictionary },
          { onConflict: 'patient_id' }
        )
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.profile(patientId) });
    },
  });
}
