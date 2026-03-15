import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import type { PatientSupply } from '@/types/supabase';

interface InventoryCardProps {
  supply: PatientSupply;
  onPress?: () => void;
}

export function InventoryCard({ supply, onPress }: InventoryCardProps) {
  const isLow = supply.current_quantity <= supply.reorder_threshold;

  return (
    <Card mode="elevated" onPress={onPress} style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Text variant="titleMedium">{supply.name}</Text>
          <Text
            variant="titleMedium"
            style={[styles.quantity, isLow && styles.low]}
          >
            {supply.current_quantity} {supply.unit}
          </Text>
        </View>
        {isLow && (
          <Text variant="labelSmall" style={styles.alert}>
            Low stock — reorder at {supply.reorder_threshold} {supply.unit}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    fontWeight: '600',
  },
  low: {
    color: '#b00020',
  },
  alert: {
    marginTop: 4,
    color: '#b00020',
  },
});
