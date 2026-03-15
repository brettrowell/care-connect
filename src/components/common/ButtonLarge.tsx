import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const MIN_HEIGHT = 48;

interface ButtonLargeProps {
  onPress: () => void;
  label: string;
  mode?: 'contained' | 'outlined' | 'text';
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: object;
}

export function ButtonLarge({
  onPress,
  label,
  mode = 'contained',
  icon,
  disabled,
  loading,
  style,
}: ButtonLargeProps) {
  const theme = useTheme();

  return (
    <Button
      mode={mode}
      onPress={onPress}
      icon={icon}
      disabled={disabled}
      loading={loading}
      style={[styles.button, { minHeight: MIN_HEIGHT }, style]}
      contentStyle={styles.content}
      labelStyle={styles.label}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 160,
  },
  content: {
    minHeight: MIN_HEIGHT,
  },
  label: {
    fontSize: 16,
  },
});
