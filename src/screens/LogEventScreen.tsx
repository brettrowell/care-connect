import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import type { DailyEventType } from '@/types/supabase';
import { useCurrentGroup } from '@/hooks/useCurrentGroup';
import { useLogEvent } from '@/hooks/useLogEvent';
import { useSupplies } from '@/api/queries/supplies';

const EVENT_OPTIONS: { type: DailyEventType; label: string }[] = [
  { type: 'feeding', label: 'Feeding' },
  { type: 'med_given', label: 'Meds given' },
  { type: 'seizure', label: 'Seizure' },
  { type: 'vomit', label: 'Vomit' },
  { type: 'diaper', label: 'Diaper' },
  { type: 'therapy', label: 'Therapy' },
  { type: 'custom', label: 'Other' },
];

export function LogEventScreen() {
  const { patient } = useCurrentGroup();
  const { logEvent, isPending, error, reset } = useLogEvent();
  const { data: supplies } = useSupplies(patient?.id);
  const [selectedType, setSelectedType] = useState<DailyEventType>('feeding');
  const [notes, setNotes] = useState('');
  const [consumedSupplyId, setConsumedSupplyId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!patient) return;
    logEvent({
      patientId: patient.id,
      type: selectedType,
      notes: notes || undefined,
      consumedSupplyId: consumedSupplyId ?? undefined,
    }).then(() => {
      setNotes('');
      setConsumedSupplyId(null);
      reset();
    });
  };

  if (!patient) {
    return (
      <View style={styles.center}>
        <Text>Select a patient first.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="titleSmall" style={styles.label}>
          Event type
        </Text>
        <View style={styles.chipRow}>
          {EVENT_OPTIONS.map(({ type, label }) => (
            <Button
              key={type}
              mode={selectedType === type ? 'contained' : 'outlined'}
              onPress={() => setSelectedType(type)}
              compact
              style={styles.chip}
            >
              {label}
            </Button>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <TextInput
          label="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          style={styles.input}
          mode="outlined"
        />
      </View>

      {supplies && supplies.length > 0 && (
        <View style={styles.section}>
          <Text variant="titleSmall" style={styles.label}>
            Deduct supply (optional)
          </Text>
          <View style={styles.chipRow}>
            <Button
              mode={!consumedSupplyId ? 'contained' : 'outlined'}
              onPress={() => setConsumedSupplyId(null)}
              compact
              style={styles.chip}
            >
              None
            </Button>
            {supplies.map((s) => (
              <Button
                key={s.id}
                mode={consumedSupplyId === s.id ? 'contained' : 'outlined'}
                onPress={() => setConsumedSupplyId(s.id)}
                compact
                style={styles.chip}
              >
                {s.name}
              </Button>
            ))}
          </View>
        </View>
      )}

      {error && (
        <Text variant="bodySmall" style={styles.error}>
          {(error as Error).message}
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isPending}
        disabled={isPending}
        style={styles.submit}
        contentStyle={styles.submitContent}
      >
        Log event
      </Button>
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
  label: {
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    minHeight: 48,
  },
  input: {
    marginTop: 4,
  },
  error: {
    color: '#b00020',
    paddingHorizontal: 16,
  },
  submit: {
    margin: 16,
    minHeight: 48,
  },
  submitContent: {
    minHeight: 48,
  },
});
