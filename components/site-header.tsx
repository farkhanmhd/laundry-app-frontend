"use client";

import { Search, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import type { SessionUser } from "@/component-types";
import { SidebarTrigger } from "@/components/animate-ui/components/radix/sidebar";
import ThemeSwitcher from "@/components/theme-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePosProducts } from "@/hooks/state";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { superAdminNavData } from "@/lib/constants";
import { Back } from "./back-button";
import { NavigationCommand } from "./navigation-command";

export function SiteHeader({ user }: { user: SessionUser }) {
  const pathname = usePathname();
  const isMedium = useBreakpoint(1280);
  const isMobile = useBreakpoint(768);
  const splittedPathname = pathname.split("/");

  const { posProduct, setPosProduct } = usePosProducts();
  const title = superAdminNavData.find(
    (item) => item.url.split("/")[1] === splittedPathname[1]
  )?.title;

  const handleCartClick = () => {
    setPosProduct({ ...posProduct, open: !posProduct.open });
  };

  const totalItems = useMemo(
    () => posProduct.items.reduce((total, item) => total + item.quantity, 0),
    [posProduct.items]
  );

  return (
    <header className="relative flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center">
          <SidebarTrigger className="-ml-1 hidden md:flex" />
          <Separator
            className="mx-4 hidden data-[orientation=vertical]:h-4 md:flex"
            orientation="vertical"
          />
          {splittedPathname.length >= 3 ? (
            <Back />
          ) : (
            <h1 className="font-medium text-base">{title}</h1>
          )}
        </div>
        {!isMedium && (
          <NavigationCommand
            className="xl:-translate-x-1/2 xl:-translate-y-1/2 hidden justify-start text-muted-foreground md:min-w-xs xl:absolute xl:top-1/2 xl:left-1/2 xl:flex xl:max-w-md"
            user={user}
            variant="secondary"
          >
            <Search />
            Search
          </NavigationCommand>
        )}
        <div className="flex items-center gap-2">
          {!isMobile && isMedium && (
            <NavigationCommand
              className="rounded-full md:flex xl:hidden"
              user={user}
              variant="ghost"
            >
              <Search />
            </NavigationCommand>
          )}
          <Button
            className="relative hidden w-9 rounded-full md:flex"
            onClick={handleCartClick}
            variant="ghost"
          >
            <ShoppingCart />
            {posProduct.items.length > 0 && (
              <Badge className="absolute top-0.5 right-[-0.5px] h-4 w-4 rounded-full p-0 text-[10px]">
                {totalItems}
              </Badge>
            )}
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
