"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const PosLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-6">
    <div className="w-full p-4 lg:p-6">
      <section className="space-y-4 lg:space-y-6">
        <Input
          className="rounded-full bg-background px-6 md:h-12 md:text-base"
          placeholder="Search Items or Services"
        />
        <ScrollArea className="h-[calc(100dvh-200px)] lg:h-[calc(100dvh-168px)]">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
            {children}
          </ul>
        </ScrollArea>
      </section>
    </div>
  </div>
);

export default PosLayout;
