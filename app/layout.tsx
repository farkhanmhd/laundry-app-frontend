import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Providers } from '@/components/providers';

const geistSans = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Laundry App',
    default: 'Laundry App',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} bg-background antialiased`}>
        <Providers>
          {children}
          <Toaster expand richColors />
        </Providers>
      </body>
    </html>
  );
}
