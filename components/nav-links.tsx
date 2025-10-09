import Link from "next/link";
import type { SidebarItem } from "@/component-types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapItems } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  items: SidebarItem[];
}

export function NavLinks({ items }: Props) {
  return (
    <ScrollArea className="h-dvh border-r bg-background">
      <aside className="h-dvh">
        <nav className="h-full">
          <ul className="flex h-full flex-col justify-center">
            <MapItems
              of={items}
              render={(item, index) => (
                <Tooltip key={`${item.title.split(" ").join("")}-${index}`}>
                  <TooltipTrigger asChild>
                    <Link
                      className="block p-4 text-muted-foreground"
                      href={item.url}
                    >
                      <item.icon />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              )}
            />
          </ul>
        </nav>
      </aside>
    </ScrollArea>
  );
}
