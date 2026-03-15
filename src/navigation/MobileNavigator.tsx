import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginScreen } from '@/screens/LoginScreen';
import { GroupSelectorScreen } from '@/screens/GroupSelectorScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { LogEventScreen } from '@/screens/LogEventScreen';
import { EmergencyScreen } from '@/screens/EmergencyScreen';
import { SuppliesScreen } from '@/screens/SuppliesScreen';
import { HandoffSummaryScreen } from '@/screens/HandoffSummaryScreen';
import { CommunicationDictionaryScreen } from '@/screens/CommunicationDictionaryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabsImpl() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LogEvent"
        component={LogEventScreen}
        options={{
          title: 'Log',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alert-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Supplies"
        component={SuppliesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="package-variant" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/** Stack used after auth: tabs + Communication + Handoff. Use inside NavigationContainer. */
export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        contentStyle: { backgroundColor: '#f5f5f5' },
      }}
      initialRouteName="Main"
    >
      <Stack.Screen
        name="Main"
        component={MainTabsImpl}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CommunicationDictionary"
        component={CommunicationDictionaryScreen}
        options={{ title: 'Communication' }}
      />
      <Stack.Screen
        name="HandoffSummary"
        component={HandoffSummaryScreen}
        options={{ title: 'Handoff' }}
      />
    </Stack.Navigator>
  );
}

export function MobileNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLargeTitle: true,
          contentStyle: { backgroundColor: '#f5f5f5' },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GroupSelector"
          component={GroupSelectorScreen}
          options={{ title: 'Select care group' }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabsImpl}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CommunicationDictionary"
          component={CommunicationDictionaryScreen}
          options={{ title: 'Communication' }}
        />
        <Stack.Screen
          name="HandoffSummary"
          component={HandoffSummaryScreen}
          options={{ title: 'Handoff' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
