import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "@care-connect/ui";
import { supabase } from "../config/supabase";

export default function HomeScreen() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-semibold text-slate-900">Care Connect</Text>
      <Text className="mt-2 text-center text-sm text-slate-600">
        You made it into the protected area.
      </Text>
      <View className="mt-6 w-full gap-3">
        <Button title="Do something" variant="outline" />
        <Button
          title={isSigningOut ? "Signing out..." : "Sign out"}
          variant="solid"
          onPress={handleSignOut}
          disabled={isSigningOut}
        />
      </View>
    </View>
  );
}
