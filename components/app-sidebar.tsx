"use client";

import { IconInnerShadowTop } from "@tabler/icons-react";
import Link from "next/link";
import type * as React from "react";
import type { SessionUser } from "@/component-types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/animate-ui/components/radix/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { adminNavData, staffNavData } from "@/lib/constants";

interface Props extends React.ComponentProps<typeof Sidebar> {
  user: SessionUser;
}

export function AppSidebar({ user, ...props }: Props) {
  const role = user.role;

  const menu = role === "admin" ? adminNavData : staffNavData;

  return (
    <Sidebar collapsible="icon" {...props} className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="font-semibold text-base">Laundry App</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
