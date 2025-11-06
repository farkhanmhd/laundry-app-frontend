"use client";

import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapItems } from "@/lib/utils";
import { Button } from "./ui/button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }

  const selectedTheme = {
    light: Sun,
    dark: MoonStar,
    system: Monitor,
  };
  const SelectedIcon = selectedTheme[theme as keyof typeof selectedTheme];

  const dropdownItems = Object.keys(selectedTheme) as Array<
    keyof typeof selectedTheme
  >;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-9 rounded-full" variant="ghost">
          {SelectedIcon && <SelectedIcon aria-hidden="true" size={22} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <MapItems
          of={dropdownItems}
          render={(item, index) => {
            const Icon = selectedTheme[item as keyof typeof selectedTheme];

            return (
              <DropdownMenuItem
                className="cursor-pointer gap-3 px-1"
                key={index}
                onClick={() => setTheme(item)}
              >
                <Icon aria-hidden="true" size={20} />
                <span className="capitalize">{item}</span>
              </DropdownMenuItem>
            );
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
