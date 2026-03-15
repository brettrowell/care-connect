import { useCurrentGroupContext } from '@/contexts/CurrentGroupContext';

export function useCurrentGroup() {
  const { membership, patient, setCurrentGroup, clearCurrentGroup } = useCurrentGroupContext();
  return {
    membership,
    patient,
    groupId: membership?.group_id ?? null,
    patientId: patient?.id ?? null,
    role: membership?.role ?? null,
    setCurrentGroup,
    clearCurrentGroup,
    isReady: !!membership && !!patient,
  };
}
