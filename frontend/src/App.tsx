import React, { useCallback, useEffect, useRef } from "react";
import { StatusBar, Text, View } from "react-native";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthState, getGuardRedirect } from "./auth/guards";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const auth = useAuthState();
  const navigationRef = useRef(createNavigationContainerRef<RootStackParamList>()).current;

  const runGuard = useCallback(() => {
    if (!navigationRef.isReady()) return;
    const route = navigationRef.getCurrentRoute();
    if (!route) return;

    const redirect = getGuardRedirect(route.name, auth, {
      publicRoutes: ["Login"],
      fallbackRoute: "Login"
    });

    if (redirect && route.name !== redirect) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: redirect }]
      });
      return;
    }

    if (auth.status === "authenticated" && route.name === "Login") {
      navigationRef.reset({
        index: 0,
        routes: [{ name: "Home" }]
      });
    }
  }, [auth, navigationRef]);

  useEffect(() => {
    runGuard();
  }, [runGuard]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={navigationRef} onStateChange={runGuard}>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center"
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {auth.status === "loading" ? (
        <View className="absolute bottom-6 left-0 right-0 items-center">
          <View className="rounded-full bg-white px-4 py-2 shadow">
            <Text>Checking session...</Text>
          </View>
        </View>
      ) : null}
    </SafeAreaProvider>
  );
}
