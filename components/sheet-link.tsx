'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SidebarItem } from '@/component-types';
import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface Props {
  item: SidebarItem;
}

export function SheetLink({ item }: Props) {
  const pathname = usePathname();
  const isActive = pathname === item.url;
  return (
    <li>
      <SheetClose asChild>
        <Link
          className={cn(
            'group flex items-center gap-4 px-4 py-3 duration-200 hover:bg-primary/15',
            {
              'bg-primary/15': isActive,
            }
          )}
          href={item.url}
        >
          <div className={cn('rounded-full bg-primary/10 p-3')}>
            <item.icon
              className={cn('text-muted-foreground', {
                'text-primary': isActive,
              })}
            />
          </div>
          <span
            className={cn('text-lg group-hover:text-primary', {
              'text-primary': isActive,
            })}
          >
            {item.title}
          </span>
        </Link>
      </SheetClose>
    </li>
  );
}
