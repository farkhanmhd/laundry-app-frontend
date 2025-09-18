'use client';

import { IconMenu, IconMoonStars, IconSun, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { adminSheetData } from '@/lib/constants';
import { SheetLinks } from './sheet-links';
import SignoutDialog from './signout-dialog';

const SidebarSheet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const toggleSidebar = useCallback(() => {
    setOpen(!open);
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const handleThemeChange = () => {
    setTheme(theme === 'light' || theme === 'system' ? 'dark' : 'light');
  };

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button className="h-12 w-12 rounded-full" variant="secondary">
          <IconMenu
            className="text-primary"
            style={{ width: '26px', height: '26px' }}
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="justify-between p-0"
        defaultCloseButton={false}
        side="left"
      >
        <SheetTitle className="hidden" />
        <SheetHeader className="flex w-full flex-row items-center justify-between gap-3 p-3">
          <div className="w-full">
            <div className="flex gap-4 rounded-full bg-primary/10 p-2">
              <Image
                alt="user-image"
                className="rounded-full"
                height={50}
                src="/placeholder.svg"
                width={50}
              />
              <div className="flex flex-col justify-center gap-0.5">
                <span className="font-medium">Farkhan Mhd</span>
                <span className="text-muted-foreground text-xs">Admin</span>
              </div>
            </div>
          </div>
          <SheetClose asChild>
            <Button
              className="h-12 w-12 rounded-full"
              size="lg"
              variant="ghost"
            >
              <IconX />
            </Button>
          </SheetClose>
        </SheetHeader>

        <ScrollArea className="min-h-0">
          <SheetLinks items={adminSheetData} />
        </ScrollArea>

        <SheetFooter className="mt-0 p-3">
          <div className="flex flex-row items-center justify-between rounded-full p-2">
            <Button
              className="h-12 w-12 rounded-full"
              onClick={handleThemeChange}
              size="icon"
              variant="secondary"
            >
              {theme === 'light' ? <IconSun /> : <IconMoonStars />}
            </Button>
            <SignoutDialog />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
