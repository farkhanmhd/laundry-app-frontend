'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { CurrentDate } from '@/components/current-date';
import { SiteHeader } from '@/components/site-header';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { adminSheetData } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const pageTitle = adminSheetData.find(
    (item) => item.url.split('/')[1] === pathname.split('/')[1]
  )?.title;

  return (
    <>
      <SiteHeader className="justify-between">
        <span className="mx-4 font-semibold text-xl">{pageTitle}</span>
        <div className="flex items-center gap-3">
          <CurrentDate />
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'h-12 rounded-full border-3 bg-background font-semibold'
            )}
            href="/pos"
          >
            POS
          </Link>
        </div>
      </SiteHeader>
      <ScrollArea className="h-[calc(100dvh-80px)]">{children}</ScrollArea>
    </>
  );
};

export default Layout;
