"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { SessionUser } from "@/component-types";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { adminNavData, staffNavData } from "@/lib/constants";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export function NavigationCommand({ user }: { user: SessionUser }) {
  const { push } = useRouter();
  const [commandOpen, setCommandOpen] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const role = user.role;
  const menu = role === "admin" ? adminNavData : staffNavData;

  return (
    <>
      <Button
        className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 min-w-md justify-start text-muted-foreground"
        onClick={() => setCommandOpen(!commandOpen)}
        size="sm"
        variant="secondary"
      >
        <Search />
        Search
      </Button>
      <CommandDialog
        className="rounded-lg border shadow-md md:min-w-[450px]"
        onOpenChange={setCommandOpen}
        open={commandOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <ScrollArea className="h-[300px]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Menu">
              {menu.map((item, index) => (
                <CommandItem
                  key={`item-${item.url}-${index}`}
                  onSelect={() => {
                    push(item.url);
                    setCommandOpen(false);
                  }}
                >
                  <HugeiconsIcon icon={item.icon} />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setTheme("dark")}>
                <IconMoonStars />
                <span>Set Dark Mode</span>
              </CommandItem>
              <CommandItem onSelect={() => setTheme("light")}>
                <IconSun />
                <span>Set Light Mode</span>
              </CommandItem>
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </CommandDialog>
    </>
  );
}
