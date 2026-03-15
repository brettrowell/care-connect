import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useCurrentGroup } from '@/hooks/useCurrentGroup';
import { usePatientProfile } from '@/api/queries/patients';
import { useUpdateCommunicationDictionary } from '@/api/mutations/profile';
import { CommunicationCueList } from '@/components/caregiver/CommunicationCueList';
import type { CommunicationCue } from '@/types/supabase';

export function CommunicationDictionaryScreen() {
  const { patient } = useCurrentGroup();
  const { data: profile } = usePatientProfile(patient?.id);
  const updateDict = useUpdateCommunicationDictionary(patient?.id ?? '');
  const [cue, setCue] = useState('');
  const [meaning, setMeaning] = useState('');

  const cues = (profile?.communication_dictionary ?? []) as CommunicationCue[];
  const canEdit = true;

  const handleAdd = () => {
    if (!cue.trim() || !meaning.trim() || !patient) return;
    const next = [...cues, { cue: cue.trim(), meaning: meaning.trim() }];
    updateDict.mutate(next, {
      onSuccess: () => {
        setCue('');
        setMeaning('');
      },
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
    <View style={styles.container}>
      <CommunicationCueList cues={cues} editable={canEdit} />
      {canEdit && (
        <View style={styles.form}>
          <TextInput
            label="Cue (what they do)"
            value={cue}
            onChangeText={setCue}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Meaning (what it means)"
            value={meaning}
            onChangeText={setMeaning}
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleAdd}
            disabled={!cue.trim() || !meaning.trim() || updateDict.isPending}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Add cue
          </Button>
        </View>
      )}
    </View>
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
  form: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    minHeight: 48,
  },
  buttonContent: {
    minHeight: 48,
  },
});
