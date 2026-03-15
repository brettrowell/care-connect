import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useCurrentGroup } from '@/hooks/useCurrentGroup';
import { usePatientProfile } from '@/api/queries/patients';
import { useRecentEvents } from '@/api/queries/events';
import { useEmergencies } from '@/api/queries/emergencies';
import { CommunicationCueList } from '@/components/caregiver/CommunicationCueList';
import { TimelineItem } from '@/components/caregiver/TimelineItem';

export function HandoffSummaryScreen() {
  const { patient } = useCurrentGroup();
  const { data: profile } = usePatientProfile(patient?.id);
  const { data: events } = useRecentEvents(patient?.id, 15);
  const { data: emergencies } = useEmergencies(patient?.id);

  if (!patient) {
    return (
      <View style={styles.center}>
        <Text>Select a patient first.</Text>
      </View>
    );
  }

  const cues = (profile?.communication_dictionary ?? []) as { cue: string; meaning: string }[];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="titleLarge">{patient.display_name}</Text>
        <Text variant="bodyMedium" style={styles.muted}>
          Handoff summary — share this view via link for temporary read-only access.
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium">Communication cues</Text>
        <CommunicationCueList cues={cues} />
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium">Recent events</Text>
        {(events ?? []).slice(0, 10).map((e) => (
          <TimelineItem key={e.id} event={e} />
        ))}
      </View>

      {(emergencies ?? []).length > 0 && (
        <View style={styles.section}>
          <Text variant="titleMedium">Emergency protocols</Text>
          {(emergencies ?? []).map((em) => (
            <Text key={em.id} variant="bodyMedium">
              • {em.title}
            </Text>
          ))}
        </View>
      )}
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
    padding: 16,
  },
  muted: {
    marginTop: 4,
    opacity: 0.8,
  },
});
