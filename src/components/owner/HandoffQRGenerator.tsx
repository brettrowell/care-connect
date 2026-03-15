import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Text, SegmentedButtons, useTheme } from 'react-native-paper';
import { useCreateHandoffToken } from '@/api/mutations/handoff';

const BASE_URL = typeof window !== 'undefined'
  ? `${window.location.origin}/handoff`
  : 'https://yourapp.com/handoff';

interface HandoffQRGeneratorProps {
  patientId: string;
}

export function HandoffQRGenerator({ patientId }: HandoffQRGeneratorProps) {
  const theme = useTheme();
  const [expiresInHours, setExpiresInHours] = useState(24);
  const createToken = useCreateHandoffToken(patientId);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      const token = await createToken.mutateAsync(expiresInHours);
      const link = `${BASE_URL}?token=${token.token}`;
      setGeneratedLink(link);
      if (Platform.OS === 'web' && typeof navigator?.clipboard?.writeText === 'function') {
        await navigator.clipboard.writeText(link);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.root}>
      <Text variant="titleSmall" style={styles.label}>
        Link expires in
      </Text>
      <SegmentedButtons
        buttons={[
          { value: '6', label: '6h' },
          { value: '24', label: '24h' },
          { value: '72', label: '72h' },
        ]}
        value={String(expiresInHours)}
        onValueChange={(v) => setExpiresInHours(Number(v))}
        style={styles.segmented}
      />
      <Button
        mode="contained"
        onPress={handleGenerate}
        loading={createToken.isPending}
        disabled={createToken.isPending}
        style={styles.button}
      >
        Generate handoff link
      </Button>
      {generatedLink && (
        <View style={styles.linkBox}>
          <Text variant="bodySmall" selectable>
            {generatedLink}
          </Text>
          {Platform.OS === 'web' && (
            <Text variant="labelSmall" style={styles.copied}>
            Copied to clipboard
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  label: {
    marginBottom: 8,
  },
  segmented: {
    marginBottom: 16,
  },
  button: {
    minHeight: 48,
    marginBottom: 16,
  },
  linkBox: {
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
  },
  copied: {
    marginTop: 4,
    opacity: 0.8,
  },
});
