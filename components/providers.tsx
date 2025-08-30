'use client';

import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type * as React from 'react';

export function Providers({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NuqsAdapter>
      <NextThemesProvider
        {...props}
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange={false}
        enableSystem
      >
        <JotaiProvider>{children}</JotaiProvider>
      </NextThemesProvider>
    </NuqsAdapter>
  );
}
