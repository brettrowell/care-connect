import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List } from 'react-native-paper';
import { useCurrentGroup } from '@/hooks/useCurrentGroup';
import { useEmergencies } from '@/api/queries/emergencies';

export function EmergencyScreen() {
  const { patient } = useCurrentGroup();
  const { data: emergencies, isLoading } = useEmergencies(patient?.id);

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
        <Text>Loading protocols…</Text>
      </View>
    );
  }

  const list = emergencies ?? [];

  if (list.length === 0) {
    return (
      <View style={styles.center}>
        <Text variant="titleMedium">No emergency protocols yet</Text>
        <Text variant="bodyMedium" style={styles.muted}>
          Owners can add protocols (e.g. seizure response, G-tube emergency) in a future update.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {list.map((em) => (
        <List.Accordion
          key={em.id}
          title={em.title}
          titleNumberOfLines={2}
          style={styles.accordion}
        >
          {(em.steps ?? []).sort((a, b) => a.order - b.order).map((step, i) => (
            <List.Item
              key={i}
              title={step.text}
              titleNumberOfLines={10}
              style={styles.step}
            />
          ))}
        </List.Accordion>
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
  accordion: {
    backgroundColor: '#fff',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  step: {
    paddingLeft: 24,
  },
});
