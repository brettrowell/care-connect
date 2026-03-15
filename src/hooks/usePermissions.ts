import { useMemo } from 'react';
import type { MembershipRole } from '@/types/supabase';
import { useCurrentGroup } from './useCurrentGroup';

const CAN_LOG_EVENTS: MembershipRole[] = ['owner', 'guardian', 'provider', 'caregiver'];
const CAN_MANAGE_GROUP: MembershipRole[] = ['owner', 'guardian'];
const CAN_MANAGE_SUPPLIES: MembershipRole[] = ['owner', 'guardian'];
const CAN_GENERATE_HANDOFF: MembershipRole[] = ['owner', 'guardian'];
const CAN_EDIT_PROFILE: MembershipRole[] = ['owner', 'guardian'];

export function usePermissions() {
  const { role } = useCurrentGroup();

  return useMemo(() => {
    const r = role ?? null;
    return {
      role: r,
      canLogEvents: r !== null && CAN_LOG_EVENTS.includes(r),
      canManageGroup: r !== null && CAN_MANAGE_GROUP.includes(r),
      canManageSupplies: r !== null && CAN_MANAGE_SUPPLIES.includes(r),
      canGenerateHandoff: r !== null && CAN_GENERATE_HANDOFF.includes(r),
      canEditProfile: r !== null && CAN_EDIT_PROFILE.includes(r),
    };
  }, [role]);
}
