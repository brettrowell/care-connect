import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List } from 'react-native-paper';
import type { CommunicationCue } from '@/types/supabase';

interface CommunicationCueListProps {
  cues: CommunicationCue[];
  editable?: boolean;
  onEdit?: () => void;
}

export function CommunicationCueList({ cues }: CommunicationCueListProps) {
  if (cues.length === 0) {
    return (
      <View style={styles.empty}>
        <Text variant="bodyMedium">No communication cues added yet.</Text>
        <Text variant="bodySmall" style={styles.hint}>
          Add cues so caregivers know how this person communicates (e.g. pulls ear = pain).
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll}>
      {cues.map((item, index) => (
        <List.Item
          key={`${item.cue}-${index}`}
          title={item.cue}
          description={item.meaning}
          titleNumberOfLines={2}
          descriptionNumberOfLines={2}
          style={styles.item}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  empty: {
    padding: 24,
  },
  hint: {
    marginTop: 8,
    opacity: 0.8,
  },
  item: {
    minHeight: 48,
  },
});
