import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "@care-connect/ui/native";
import { supabase } from "../config/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setStatus("loading");
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setStatus("error");
      setError(signInError.message);
      return;
    }

    setStatus("idle");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-semibold text-slate-900">Welcome back</Text>
      <Text className="mt-2 text-center text-sm text-slate-600">
        Sign in with your Supabase email and password.
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
          title={status === "loading" ? "Signing in..." : "Sign in"}
          variant="solid"
          disabled={status === "loading"}
          onPress={handleSignIn}
        />
      </View>
    </View>
  );
}
