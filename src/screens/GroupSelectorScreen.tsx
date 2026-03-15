import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Button, Text } from 'react-native-paper';
import { useMemberships } from '@/api/queries/groups';
import { usePatients } from '@/api/queries/patients';
import { useCurrentGroupContext } from '@/contexts/CurrentGroupContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/api/supabase';

export function GroupSelectorScreen({ navigation }: any) {
  const { userId, loading: authLoading } = useAuth();
  const { data: memberships, isLoading } = useMemberships(userId ?? undefined);
  const { setCurrentGroup } = useCurrentGroupContext();

  useEffect(() => {
    if (!authLoading && !userId) navigation.replace('Login');
  }, [authLoading, userId, navigation]);

  const handleSelect = (membership: any, patient: any) => {
    setCurrentGroup(membership, patient);
    navigation.replace('Main');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigation.replace('Login');
  };

  if (authLoading || isLoading || !memberships?.length) {
    return (
      <View style={styles.center}>
        <Text>{isLoading ? 'Loading…' : 'No groups yet. Create one in the app.'}</Text>
        <Button onPress={handleSignOut} style={styles.signOut}>Sign out</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {memberships.map((m) => (
        <GroupPatientList
          key={m.id}
          membership={m}
          onSelect={handleSelect}
        />
      ))}
      <Button mode="outlined" onPress={handleSignOut} style={styles.signOut}>
        Sign out
      </Button>
    </View>
  );
}

function GroupPatientList({
  membership,
  onSelect,
}: {
  membership: any;
  onSelect: (m: any, p: any) => void;
}) {
  const { data: patients } = usePatients(membership.group_id);
  const groupName = (membership.groups as any)?.name ?? 'Group';

  return (
    <>
      <List.Subheader>{groupName}</List.Subheader>
      {(patients ?? []).map((p) => (
        <List.Item
          key={p.id}
          title={p.display_name}
          onPress={() => onSelect(membership, p)}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  signOut: {
    margin: 16,
    minHeight: 48,
  },
});
