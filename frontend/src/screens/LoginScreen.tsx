import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "@care-connect/ui/native";
import { supabase } from "../config/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setStatus("loading");
    setError(null);

    if (mode === "signUp") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password
      });

      if (signUpError) {
        setStatus("error");
        setError(signUpError.message);
        return;
      }

      setStatus("idle");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setStatus("error");
      setError(signInError.message);
      return;
    }

    setStatus("idle");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-semibold text-slate-900">
        {mode === "signIn" ? "Welcome back" : "Create your account"}
      </Text>
      <Text className="mt-2 text-center text-sm text-slate-600">
        {mode === "signIn"
          ? "Sign in with your Supabase email and password."
          : "Use your email and a strong password to sign up."}
      </Text>
      <View className="mt-6 w-full gap-4">
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
        />
        <TextInput
          autoCapitalize="none"
          autoComplete="password"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900"
        />
        {error ? <Text className="text-sm text-rose-600">{error}</Text> : null}
        <Button
          title={
            status === "loading" ? (mode === "signIn" ? "Signing in..." : "Creating account...") : mode === "signIn" ? "Sign in" : "Sign up"
          }
          variant="solid"
          disabled={status === "loading"}
          onPress={handleSubmit}
        />
        <Button
          title={mode === "signIn" ? "Need an account?" : "Already have an account?"}
          variant="outline"
          onPress={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
        />
      </View>
    </View>
  );
}
