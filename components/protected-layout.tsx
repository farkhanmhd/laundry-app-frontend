"use client";

// 1. Correct the imports to use 'framer-motion'
import { AnimatePresence, motion } from "motion/react";
import type { SessionUser } from "@/component-types";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/animate-ui/components/radix/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePosProducts } from "@/hooks/state";
import { PosOrderProducts } from "./pos-order-products";

type Props = {
  user: SessionUser;
  children: React.ReactNode;
};

const ProtectedLayout = ({ children, user }: Props) => {
  const { posProduct } = usePosProducts();

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
        <SiteHeader />
        <ScrollArea className="h-[calc(100dvh-48px)]">
          <div className="relative h-[calc(100dvh-48px)] w-full overflow-x-hidden">
            <motion.div
              animate={{ width: posProduct.open ? "66.67%" : "100%" }}
              className="h-[calc(100dvh-48px)]"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            >
              {children}
            </motion.div>

            <AnimatePresence>
              {posProduct.open && (
                <motion.div
                  animate={{ x: "0%" }}
                  className="absolute top-0 right-0 h-full w-4/12"
                  exit={{ x: "100%" }}
                  initial={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                >
                  <PosOrderProducts />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
