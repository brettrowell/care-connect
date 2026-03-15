import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { EventQuickLogButtons } from '@/components/caregiver/EventQuickLogButtons';
import { TimelineItem } from '@/components/caregiver/TimelineItem';
import { InventoryCard } from '@/components/owner/InventoryCard';
import { HandoffQRGenerator } from '@/components/owner/HandoffQRGenerator';
import { useCurrentGroup } from '@/hooks/useCurrentGroup';
import { usePermissions } from '@/hooks/usePermissions';
import { useRecentEvents } from '@/api/queries/events';
import { useLowStockSupplies } from '@/api/queries/supplies';

export function DashboardScreen({ navigation }: { navigation?: any } = {}) {
  const fromHook = useNavigation<any>();
  const navigation = navigation ?? fromHook;
  const { patient } = useCurrentGroup();
  const permissions = usePermissions();
  const { data: events, isLoading: eventsLoading } = useRecentEvents(patient?.id);
  const { lowStock } = useLowStockSupplies(patient?.id);

  if (!patient) {
    return (
      <View style={styles.center}>
        <Text>Select a patient from the group selector.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Quick log
        </Text>
        <EventQuickLogButtons patientId={patient.id} />
      </View>

      {permissions.canGenerateHandoff && (
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Handoff link
          </Text>
          <HandoffQRGenerator patientId={patient.id} />
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('HandoffSummary')}
            style={styles.linkButton}
          >
            View handoff summary
          </Button>
        </View>
      )}

      {permissions.canManageSupplies && lowStock.length > 0 && (
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Low stock
          </Text>
          {lowStock.slice(0, 3).map((s) => (
            <InventoryCard key={s.id} supply={s} onPress={() => navigation.navigate('Supplies')} />
          ))}
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.row}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Recent events
          </Text>
          <Button
            compact
            onPress={() => navigation.navigate('CommunicationDictionary')}
          >
            Communication
          </Button>
        </View>
        {eventsLoading ? (
          <Text>Loading…</Text>
        ) : (events ?? []).length === 0 ? (
          <Text variant="bodyMedium" style={styles.muted}>
            No events yet. Use quick log above.
          </Text>
        ) : (
          (events ?? []).slice(0, 20).map((event) => (
            <TimelineItem key={event.id} event={event} />
          ))
        )}
      </View>
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
  section: {
    marginTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  linkButton: {
    marginHorizontal: 16,
    marginTop: 8,
    minHeight: 48,
  },
  muted: {
    padding: 16,
    opacity: 0.8,
  },
});
