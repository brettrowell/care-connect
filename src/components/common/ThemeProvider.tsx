import React, { useMemo } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, type BridgeCareTheme } from '@/theme';

const paperLight = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: lightTheme.colors.primary,
    secondary: lightTheme.colors.secondary,
    background: lightTheme.colors.background,
    surface: lightTheme.colors.surface,
    error: lightTheme.colors.error,
    onPrimary: lightTheme.colors.primaryContrast,
    onSurface: lightTheme.colors.text,
    outline: lightTheme.colors.border,
  },
};

const paperDark = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: darkTheme.colors.primary,
    secondary: darkTheme.colors.secondary,
    background: darkTheme.colors.background,
    surface: darkTheme.colors.surface,
    error: darkTheme.colors.error,
    onPrimary: darkTheme.colors.primaryContrast,
    onSurface: darkTheme.colors.text,
    outline: darkTheme.colors.border,
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme: BridgeCareTheme = isDark ? darkTheme : lightTheme;
  const paperTheme = isDark ? paperDark : paperLight;

  const emotionValue = useMemo(() => theme, [theme]);

  return (
    <EmotionThemeProvider theme={emotionValue}>
      <PaperProvider theme={paperTheme}>
        {children}
      </PaperProvider>
    </EmotionThemeProvider>
  );
}
