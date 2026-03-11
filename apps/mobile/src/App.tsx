import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { Button } from "@care-connect/ui";

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View className="px-6 py-8">
        <Button title="Care Connect Mobile" variant="solid" />
        <View className="h-4" />
        <Button title="NativeWind shared UI" variant="outline" />
      </View>
    </SafeAreaView>
  );
}
