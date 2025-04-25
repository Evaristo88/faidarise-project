// src/components/ThemeProvider.tsx
import React from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  // Your theme configuration
  palette: {
    primary: {
      main: '#3949ab',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}