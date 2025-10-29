"use client";

import { Search01Icon, ShoppingCart02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import type { SessionUser } from "@/component-types";
import { SidebarTrigger } from "@/components/animate-ui/components/radix/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePosProducts } from "@/hooks/state";
import { adminNavData } from "@/lib/constants";
import { NavigationCommand } from "./navigation-command";
import ThemeSwitcher from "./theme-switcher";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function SiteHeader({ user }: { user: SessionUser }) {
  const pathname = usePathname();
  const { posProduct, setPosProduct } = usePosProducts();
  const title = adminNavData.find(
    (item) => item.url.split("/")[1] === pathname.split("/")[1]
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
          <h1 className="font-medium text-base">{title}</h1>
        </div>
        <NavigationCommand
          className="lg:-translate-x-1/2 lg:-translate-y-1/2 hidden justify-start text-muted-foreground md:min-w-xs lg:absolute lg:top-1/2 lg:left-1/2 lg:max-w-md xl:flex"
          user={user}
          variant="secondary"
        >
          <HugeiconsIcon icon={Search01Icon} />
          Search
        </NavigationCommand>
        <div className="flex items-center gap-2">
          <NavigationCommand
            className="hidden rounded-full md:flex xl:hidden"
            user={user}
            variant="ghost"
          >
            <HugeiconsIcon icon={Search01Icon} />
          </NavigationCommand>
          <Button
            className="relative hidden w-9 rounded-full md:flex"
            onClick={handleCartClick}
            variant="ghost"
          >
            <HugeiconsIcon icon={ShoppingCart02Icon} />
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
