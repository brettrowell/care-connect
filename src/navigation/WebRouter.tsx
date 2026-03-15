import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from '@/screens/LoginScreen';
import { GroupSelectorScreen } from '@/screens/GroupSelectorScreen';
import { AppStack } from './MobileNavigator';
import { HandoffSummaryScreen } from '@/screens/HandoffSummaryScreen';
import { CommunicationDictionaryScreen } from '@/screens/CommunicationDictionaryScreen';

function WebLayout({ children }: { children: React.ReactNode }) {
  return <View style={styles.layout}>{children}</View>;
}

const screenToPath: Record<string, string> = {
  GroupSelector: '/groups',
  Main: '/app',
  Login: '/login',
};

function LoginRoute() {
  const navigate = useNavigate();
  const nav = { replace: (name: string) => navigate(screenToPath[name] ?? '/login', { replace: true }) };
  return (
    <WebLayout>
      <LoginScreen navigation={nav} />
    </WebLayout>
  );
}

function GroupsRoute() {
  const navigate = useNavigate();
  const nav = { replace: (name: string) => navigate(screenToPath[name] ?? '/login', { replace: true }) };
  return (
    <WebLayout>
      <GroupSelectorScreen navigation={nav} />
    </WebLayout>
  );
}

export function WebRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/groups" element={<GroupsRoute />} />
        <Route path="/app" element={<WebLayout><NavigationContainer><AppStack /></NavigationContainer></WebLayout>} />
        <Route path="/app/communication" element={<WebLayout><CommunicationDictionaryScreen /></WebLayout>} />
        <Route path="/app/handoff" element={<WebLayout><HandoffSummaryScreen /></WebLayout>} />
        <Route path="/handoff" element={<WebLayout><HandoffSummaryScreen /></WebLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    minHeight: '100vh',
  },
});
