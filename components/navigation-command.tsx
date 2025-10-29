"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
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
import { adminNavData, superAdminNavData } from "@/lib/constants";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  user: SessionUser;
  className?: string;
  children: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export function NavigationCommand({
  user,
  className = "",
  children,
  size,
  variant,
}: Props) {
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
  }, [commandOpen]);

  const role = user.role;
  const menu = role === "superadmin" ? superAdminNavData : adminNavData;

  return (
    <>
      <Button
        className={className}
        onClick={() => setCommandOpen(!commandOpen)}
        size={size}
        variant={variant}
      >
        {children}
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
