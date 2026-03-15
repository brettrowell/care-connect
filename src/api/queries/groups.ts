import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { Group, Membership } from '@/types/supabase';

export const groupsKeys = {
  all: ['groups'] as const,
  memberships: (userId: string) => ['groups', 'memberships', userId] as const,
  list: (userId: string) => ['groups', 'list', userId] as const,
};

/** Uses group_members table (existing DB); normalizes to Membership shape. */
export function useMemberships(userId: string | undefined) {
  return useQuery({
    queryKey: groupsKeys.memberships(userId ?? ''),
    queryFn: async (): Promise<Membership[]> => {
      const { data, error } = await supabase
        .from('group_members')
        .select('*, groups(*)')
        .eq('user_id', userId!);
      if (error) throw error;
      const rows = (data ?? []) as any[];
      return rows.map((r) => ({
        id: r.id ?? `${r.group_id}-${r.user_id}`,
        group_id: r.group_id,
        user_id: r.user_id,
        role: r.role as Membership['role'],
        created_at: r.created_at ?? new Date().toISOString(),
        groups: r.groups,
      }));
    },
    enabled: !!userId,
  });
}

export function useGroup(groupId: string | undefined) {
  return useQuery({
    queryKey: ['groups', groupId],
    queryFn: async (): Promise<Group | null> => {
      if (!groupId) return null;
      const { data, error } = await supabase.from('groups').select('*').eq('id', groupId).single();
      if (error) throw error;
      return data as Group;
    },
    enabled: !!groupId,
  });
}
