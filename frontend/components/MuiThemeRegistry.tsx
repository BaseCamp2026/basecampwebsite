'use client';

import React, { useState } from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom dark theme strictly configured for Basecamp design tokens
const basecampTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F32936',
      dark: '#C91E29',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F5F3EF',
    },
    background: {
      default: '#080808',
      paper: '#151515',
    },
    text: {
      primary: '#F5F3EF',
      secondary: '#A7A5A2',
    },
    divider: '#303030',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '12px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          fontFamily: 'monospace',
          fontSize: '11px',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1E1E1E',
          border: '1px solid #303030',
          color: '#F5F3EF',
          fontSize: '11px',
          fontFamily: 'monospace',
          borderRadius: '8px',
        },
      },
    },
  },
});

export default function MuiThemeRegistry({ children }: { children: React.ReactNode }) {
  // Official Next.js App Router Emotion Cache setup with prepend: true
  // prepend: true ensures MUI styles are inserted before Tailwind CSS, preventing any style wipe or cascade overwrite on refresh
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'mui', prepend: true });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={basecampTheme}>
        {/* Note: CssBaseline is omitted intentionally because Tailwind provides @tailwind base resets */}
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
