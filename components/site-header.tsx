import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import SidebarSheet from './sidebar-sheet';

interface Props {
  children: ReactNode;
  className?: string;
}

export function SiteHeader({ children, className }: Props) {
  return (
    <header className="flex gap-2 bg-transparent p-4">
      <SidebarSheet />
      <div className={cn('flex w-full items-center gap-2', className)}>
        {children}
      </div>
    </header>
  );
}
