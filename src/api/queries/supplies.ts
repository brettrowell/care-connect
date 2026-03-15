import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { PatientSupply } from '@/types/supabase';

export const suppliesKeys = {
  all: ['supplies'] as const,
  list: (patientId: string) => ['supplies', patientId] as const,
};

/** Uses existing patient_supplies (quantity); maps quantity -> current_quantity, uses reorder_threshold/unit if present. */
export function useSupplies(patientId: string | undefined) {
  return useQuery({
    queryKey: suppliesKeys.list(patientId ?? ''),
    queryFn: async (): Promise<PatientSupply[]> => {
      const { data, error } = await supabase
        .from('patient_supplies')
        .select('*')
        .eq('patient_id', patientId!)
        .order('name');
      if (error) throw error;
      const rows = (data ?? []) as any[];
      return rows.map((s) => ({
        ...s,
        current_quantity: s.current_quantity ?? s.quantity ?? 0,
        reorder_threshold: s.reorder_threshold ?? 1,
        unit: s.unit ?? 'each',
      }));
    },
    enabled: !!patientId,
  });
}

export function useLowStockSupplies(patientId: string | undefined) {
  const query = useSupplies(patientId);
  const lowStock = (query.data ?? []).filter(
    (s) => s.current_quantity <= s.reorder_threshold
  );
  return { ...query, lowStock };
}
