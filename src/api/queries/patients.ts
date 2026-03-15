import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { Patient, PatientProfile } from '@/types/supabase';

export const patientsKeys = {
  all: ['patients'] as const,
  list: (groupId: string) => ['patients', 'list', groupId] as const,
  detail: (patientId: string) => ['patients', patientId] as const,
  profile: (patientId: string) => ['patients', patientId, 'profile'] as const,
};

/** Uses existing patients; ensures display_name (added by 0002 migration) has fallback. */
export function usePatients(groupId: string | undefined) {
  return useQuery({
    queryKey: patientsKeys.list(groupId ?? ''),
    queryFn: async (): Promise<Patient[]> => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('group_id', groupId!)
        .order('display_name', { nullsFirst: false });
      if (error) throw error;
      const rows = (data ?? []) as any[];
      return rows.map((p) => ({
        ...p,
        display_name: p.display_name ?? 'Patient',
        updated_at: p.updated_at ?? p.created_at,
      }));
    },
    enabled: !!groupId,
  });
}

export function usePatient(patientId: string | undefined) {
  return useQuery({
    queryKey: patientsKeys.detail(patientId ?? ''),
    queryFn: async (): Promise<Patient | null> => {
      if (!patientId) return null;
      const { data, error } = await supabase.from('patients').select('*').eq('id', patientId).single();
      if (error) throw error;
      const p = data as any;
      return p ? { ...p, display_name: p.display_name ?? 'Patient', updated_at: p.updated_at ?? p.created_at } : null;
    },
    enabled: !!patientId,
  });
}

export function usePatientProfile(patientId: string | undefined) {
  return useQuery({
    queryKey: patientsKeys.profile(patientId ?? ''),
    queryFn: async (): Promise<PatientProfile | null> => {
      if (!patientId) return null;
      const { data, error } = await supabase
        .from('patient_profiles')
        .select('*')
        .eq('patient_id', patientId)
        .maybeSingle();
      if (error) throw error;
      return data as PatientProfile | null;
    },
    enabled: !!patientId,
  });
}
