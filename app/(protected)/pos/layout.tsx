'use client';

import type { ReactNode } from 'react';
import { CurrentDate } from '@/components/current-date';
import { SiteHeader } from '@/components/site-header';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import OrderProductsSheet from './order-products-sheet';
import { PosOrderProducts } from './pos-order-products';

const PosLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 lg:w-8/12">
        <SiteHeader className="justify-between md:justify-start">
          <CurrentDate />
          <OrderProductsSheet />
        </SiteHeader>
        <section className="space-y-4">
          <div className="px-4">
            <Input
              className="h-12 rounded-full px-6 md:text-base"
              placeholder="Search Items or Services"
            />
          </div>
          <ScrollArea className="h-[calc(100dvh-128px-24px)] px-4">
            {children}
          </ScrollArea>
        </section>
      </div>
      {!isMobile && (
        <PosOrderProducts className="hidden md:flex md:w-1/2 lg:w-4/12" />
      )}
    </div>
  );
};

export default PosLayout;
