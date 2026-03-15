import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { supabase } from '@/api/supabase';
import { useAuth } from '@/hooks/useAuth';

const FORM_MAX_WIDTH = 400;
const CARD_HORIZONTAL_PADDING = 32;
const CARD_VERTICAL_PADDING = 28;

export function LoginScreen({ navigation }: any) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const { userId, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signUpMessage, setSignUpMessage] = useState<string | null>(null);

  // If already signed in, go to group selector
  useEffect(() => {
    if (!authLoading && userId) navigation.replace('GroupSelector');
  }, [authLoading, userId, navigation]);

  const handleSignIn = async () => {
    setError(null);
    setSignUpMessage(null);
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
    setSignUpMessage(null);
    setLoading(true);
    try {
      const { data, error: e } = await supabase.auth.signUp({ email, password });
      if (e) throw e;
      // If email confirmation is required, Supabase returns success but no session
      if (data.session) {
        navigation.replace('GroupSelector');
      } else {
        setSignUpMessage('Check your email to confirm your account, then sign in.');
      }
    } catch (e: any) {
      setError(e?.message ?? 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const styles = createStyles(theme.colors);

  if (authLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { maxWidth: Math.min(width - 48, FORM_MAX_WIDTH) }]}>
          <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.title}>
              BridgeCare
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Care handoff, simplified
            </Text>
          </View>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            style={styles.input}
            mode="outlined"
          />

          {error ? (
            <View style={styles.errorWrap}>
              <Text variant="bodySmall" style={styles.error}>
                {error}
              </Text>
            </View>
          ) : null}
          {signUpMessage ? (
            <View style={styles.errorWrap}>
              <Text variant="bodySmall" style={styles.successMessage}>
                {signUpMessage}
              </Text>
            </View>
          ) : null}

          <Button
            mode="contained"
            onPress={handleSignIn}
            loading={loading}
            style={styles.primaryButton}
            contentStyle={styles.buttonContent}
          >
            Sign in
          </Button>
          <Button
            mode="outlined"
            onPress={handleSignUp}
            disabled={loading}
            style={styles.secondaryButton}
            contentStyle={styles.buttonContent}
          >
            Sign up
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function createStyles(colors: {
  background: string;
  surface: string;
  primary: string;
  onSurface: string;
  error: string;
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingVertical: 24,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    card: {
      width: '100%',
      backgroundColor: colors.surface,
      borderRadius: 16,
      paddingHorizontal: CARD_HORIZONTAL_PADDING,
      paddingVertical: CARD_VERTICAL_PADDING,
      ...(Platform.OS === 'web'
        ? {
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }
        : {
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
          }),
    },
    header: {
      marginBottom: 28,
    },
    title: {
      textAlign: 'center',
      fontWeight: '700',
      color: colors.primary,
      marginBottom: 6,
    },
    subtitle: {
      textAlign: 'center',
      color: colors.onSurface,
      opacity: 0.75,
    },
    input: {
      marginBottom: 16,
      backgroundColor: colors.surface,
    },
    errorWrap: {
      marginBottom: 12,
    },
    error: {
      color: colors.error,
    },
    successMessage: {
      color: colors.primary,
      opacity: 0.9,
    },
    primaryButton: {
      marginTop: 8,
      borderRadius: 12,
      minHeight: 48,
    },
    secondaryButton: {
      marginTop: 12,
      borderRadius: 12,
      minHeight: 48,
      borderWidth: 1.5,
    },
    buttonContent: {
      minHeight: 48,
    },
  });
}
