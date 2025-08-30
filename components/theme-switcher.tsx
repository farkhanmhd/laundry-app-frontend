'use client';

import { IconDeviceDesktop, IconMoonStars, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { MapItems } from '@/lib/utils';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { state } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const selectedTheme = {
    light: IconSun,
    dark: IconMoonStars,
    system: IconDeviceDesktop,
  };
  const SelectedIcon = selectedTheme[theme as keyof typeof selectedTheme];

  const dropdownItems = Object.keys(selectedTheme) as Array<
    keyof typeof selectedTheme
  >;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <SelectedIcon aria-hidden="true" size={22} />
              <span>Theme</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side={state === 'expanded' ? 'top' : 'right'}
            sideOffset={4}
          >
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default ThemeSwitcher;
