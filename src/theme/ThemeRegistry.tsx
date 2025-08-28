'use client';

import * as React from 'react';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo(
    () =>
      createCache({
        key: 'mui',
        prepend: true
      }),
    []
  );

  const prefersDarkMode =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: { main: '#0ea5e9' },
          success: { main: '#16a34a' },
          warning: { main: '#f59e0b' }
        },
        shape: { borderRadius: 16 }
      }),
    [prefersDarkMode]
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
