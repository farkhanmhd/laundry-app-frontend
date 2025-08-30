import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Providers } from '@/components/providers';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Beringin Coin Laundry',
    default: 'Beringin Coin Laundry',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${urbanist.className} bg-background antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
