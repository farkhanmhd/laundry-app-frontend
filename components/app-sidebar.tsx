'use client';

import { IconInnerShadowTop } from '@tabler/icons-react';
import Link from 'next/link';
import type * as React from 'react';
import type { SidebarUserData } from '@/component-types';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { adminNavData, staffNavData } from '@/lib/constants';
import ThemeSwitcher from './theme-switcher';

interface Props extends React.ComponentProps<typeof Sidebar> {
  user: SidebarUserData;
}

export function AppSidebar({ user, ...props }: Props) {
  const navData = user.role === 'admin' ? adminNavData : staffNavData;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="font-semibold text-base">
                  Beringin Coin Laundry
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          {navData.map((nav) => (
            <NavMain items={nav.items} key={nav.label} label={nav.label} />
          ))}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitcher />
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
