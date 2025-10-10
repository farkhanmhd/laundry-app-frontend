"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const PosLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-6">
    <div className="w-full p-4 lg:p-6">
      <section className="space-y-4 lg:space-y-6">
        <Input
          className="h-12 rounded-full bg-background px-6 md:text-base"
          placeholder="Search Items or Services"
        />
        <ScrollArea className="h-[calc(100dvh-144px)] lg:h-[calc(100dvh-168px)]">
          {children}
        </ScrollArea>
      </section>
    </div>
  </div>
);

export default PosLayout;
