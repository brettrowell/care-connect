import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { supabase } from '@/api/supabase';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const { error: e } = await supabase.auth.signInWithPassword({ email, password });
      if (e) throw e;
      navigation.replace('GroupSelector');
    } catch (e: any) {
      setError(e?.message ?? 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      const { error: e } = await supabase.auth.signUp({ email, password });
      if (e) throw e;
      navigation.replace('GroupSelector');
    } catch (e: any) {
      setError(e?.message ?? 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text variant="headlineMedium" style={styles.title}>
          BridgeCare
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Care handoff, simplified
        </Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
        />
        {error && (
          <Text variant="bodySmall" style={styles.error}>
            {error}
          </Text>
        )}
        <Button
          mode="contained"
          onPress={handleSignIn}
          loading={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Sign in
        </Button>
        <Button
          mode="outlined"
          onPress={handleSignUp}
          disabled={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Sign up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  inner: {
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
  },
  input: {
    marginBottom: 12,
  },
  error: {
    color: '#b00020',
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    minHeight: 48,
  },
  buttonContent: {
    minHeight: 48,
  },
});
