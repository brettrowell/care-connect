import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Membership, Patient } from '@/types/supabase';

interface CurrentGroupState {
  membership: Membership | null;
  patient: Patient | null;
}

interface CurrentGroupContextValue extends CurrentGroupState {
  setCurrentGroup: (membership: Membership | null, patient: Patient | null) => void;
  clearCurrentGroup: () => void;
}

const CurrentGroupContext = createContext<CurrentGroupContextValue | null>(null);

export function CurrentGroupProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CurrentGroupState>({
    membership: null,
    patient: null,
  });

  const setCurrentGroup = useCallback((membership: Membership | null, patient: Patient | null) => {
    setState({ membership, patient });
  }, []);

  const clearCurrentGroup = useCallback(() => {
    setState({ membership: null, patient: null });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setCurrentGroup,
      clearCurrentGroup,
    }),
    [state, setCurrentGroup, clearCurrentGroup]
  );

  return (
    <CurrentGroupContext.Provider value={value}>
      {children}
    </CurrentGroupContext.Provider>
  );
}

export function useCurrentGroupContext() {
  const ctx = useContext(CurrentGroupContext);
  if (!ctx) throw new Error('useCurrentGroupContext must be used within CurrentGroupProvider');
  return ctx;
}
