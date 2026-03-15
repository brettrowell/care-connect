import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import type { PatientDailyEvent } from '@/types/supabase';
import { formatRelativeTime, formatTime } from '@/utils/formatters';

const EVENT_LABELS: Record<string, string> = {
  feeding: 'Feeding',
  med_given: 'Meds given',
  seizure: 'Seizure',
  vomit: 'Vomit',
  diaper: 'Diaper',
  therapy: 'Therapy',
  custom: 'Note',
  other: 'Other',
};

interface TimelineItemProps {
  event: PatientDailyEvent;
}

export function TimelineItem({ event }: TimelineItemProps) {
  const label = EVENT_LABELS[event.type] ?? event.type;
  const time = formatRelativeTime(event.occurred_at);
  const exactTime = formatTime(event.occurred_at);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text variant="titleSmall">{label}</Text>
        <Text variant="bodySmall" style={styles.time}>
          {time}
        </Text>
      </View>
      {event.notes ? (
        <Text variant="bodyMedium" style={styles.notes}>
          {event.notes}
        </Text>
      ) : null}
      <Text variant="labelSmall" style={styles.exact}>
        {exactTime}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    opacity: 0.8,
  },
  notes: {
    marginTop: 4,
  },
  exact: {
    marginTop: 4,
    opacity: 0.6,
  },
});
