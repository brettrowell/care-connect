import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useCurrentGroup } from '@/hooks/useCurrentGroup';
import { useSupplies } from '@/api/queries/supplies';
import { InventoryCard } from '@/components/owner/InventoryCard';

export function SuppliesScreen() {
  const { patient } = useCurrentGroup();
  const { data: supplies, isLoading } = useSupplies(patient?.id);

  if (!patient) {
    return (
      <View style={styles.center}>
        <Text>Select a patient first.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading supplies…</Text>
      </View>
    );
  }

  const list = supplies ?? [];

  if (list.length === 0) {
    return (
      <View style={styles.center}>
        <Text variant="titleMedium">No supplies yet</Text>
        <Text variant="bodyMedium" style={styles.muted}>
          Add supplies (e.g. feeding bags, syringes) so you can track quantity and get low-stock alerts.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {list.map((s) => (
        <InventoryCard key={s.id} supply={s} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  muted: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.8,
  },
});
