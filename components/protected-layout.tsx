"use client";

// 1. Correct the imports to use 'framer-motion'
import type { SessionUser } from "@/component-types";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/animate-ui/components/radix/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNav } from "./mobile-nav";
import { PosOrder } from "./pos-order";

type Props = {
  user: SessionUser;
  children: React.ReactNode;
};

const ProtectedLayout = ({ children, user }: Props) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={user} variant="inset" />
      <SidebarInset className="md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0 md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none">
        <SiteHeader user={user} />
        <ScrollArea className="h-[calc(100dvh-114px)] md:h-[calc(100dvh-48px)]">
          <div className="relative h-[calc(100dvh-114px)] w-full overflow-x-hidden md:h-[calc(100dvh-48px)]">
            {children}
          </div>
        </ScrollArea>
        <PosOrder />
        {isMobile && <MobileNav user={user} />}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
