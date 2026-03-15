import React from 'react';
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { CurrentGroupProvider } from '@/contexts/CurrentGroupContext';
import { MobileNavigator } from '@/navigation/MobileNavigator';
import { WebRouter } from '@/navigation/WebRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 60 * 1000 },
    mutations: { retry: 0 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CurrentGroupProvider>
          {Platform.OS === 'web' ? <WebRouter /> : <MobileNavigator />}
        </CurrentGroupProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
