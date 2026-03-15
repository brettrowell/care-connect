export interface BridgeCareTheme {
  colors: {
    primary: string;
    primaryContrast: string;
    secondary: string;
    background: string;
    surface: string;
    error: string;
    text: string;
    textSecondary: string;
    border: string;
    disabled: string;
  };
  spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>;
  touchTargetMinSize: number;
  borderRadius: Record<'sm' | 'md' | 'lg', number>;
  typography: {
    fontFamily: string;
    fontSize: Record<'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>;
  };
}

export const lightTheme: BridgeCareTheme = {
  colors: {
    primary: '#1976d2',
    primaryContrast: '#ffffff',
    secondary: '#004d40',
    background: '#f5f5f5',
    surface: '#ffffff',
    error: '#b00020',
    text: '#1a1a1a',
    textSecondary: '#5f5f5f',
    border: '#e0e0e0',
    disabled: '#9e9e9e',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  touchTargetMinSize: 48,
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  typography: {
    fontFamily: 'System',
    fontSize: {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
  },
};

export const darkTheme: BridgeCareTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#42a5f5',
    primaryContrast: '#000000',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#e4e4e4',
    textSecondary: '#b0b0b0',
    border: '#333333',
  },
};
