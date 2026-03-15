import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import type { DailyEventType } from '@/types/supabase';
import { useLogEvent } from '@/hooks/useLogEvent';

const QUICK_EVENTS: { type: DailyEventType; label: string; icon: string }[] = [
  { type: 'feeding', label: 'Feeding', icon: 'silverware-fork-knife' },
  { type: 'med_given', label: 'Meds', icon: 'pill' },
  { type: 'seizure', label: 'Seizure', icon: 'alert-circle' },
  { type: 'vomit', label: 'Vomit', icon: 'alert' },
  { type: 'diaper', label: 'Diaper', icon: 'baby-face-outline' },
  { type: 'custom', label: 'Other', icon: 'dots-horizontal' },
];

interface EventQuickLogButtonsProps {
  patientId: string;
}

export function EventQuickLogButtons({ patientId }: EventQuickLogButtonsProps) {
  const theme = useTheme();
  const { logEvent, isPending } = useLogEvent();

  const handlePress = (type: DailyEventType) => {
    logEvent({ patientId, type });
  };

  return (
    <View style={styles.wrapper}>
      {QUICK_EVENTS.map(({ type, label, icon }) => (
        <Button
          key={type}
          mode="contained"
          icon={icon}
          onPress={() => handlePress(type)}
          disabled={isPending}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.content}
          labelStyle={styles.label}
        >
          {label}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  button: {
    minWidth: 100,
    minHeight: 48,
  },
  content: {
    minHeight: 48,
  },
  label: {
    fontSize: 14,
  },
});
