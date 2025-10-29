import {
  Cash02Icon,
  Menu01Icon,
  Search01Icon,
  ShoppingCart02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useMemo } from "react";
import type { SessionUser } from "@/component-types";
import { useSidebar } from "@/components/animate-ui/components/radix/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePosProducts } from "@/hooks/state";
import { cn } from "@/lib/utils";
import { NavigationCommand } from "./navigation-command";

export const MobileNav = ({ user }: { user: SessionUser }) => {
  const { posProduct, setPosProduct } = usePosProducts();

  const { toggleSidebar } = useSidebar();

  const handleCartClick = () => {
    setPosProduct({ ...posProduct, open: !posProduct.open });
  };

  const totalItems = useMemo(
    () => posProduct.items.reduce((total, item) => total + item.quantity, 0),
    [posProduct.items]
  );

  return (
    <div className="fixed bottom-4 left-4 w-[calc(100dvw-32px)] rounded-full border backdrop-blur-sm">
      <nav className="flex items-center">
        <ul className="flex w-full items-center justify-around p-1">
          <li>
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "size-10 rounded-full"
              )}
              href="/pos"
            >
              <HugeiconsIcon className="size-5" icon={Cash02Icon} />
            </Link>
          </li>
          <li>
            <NavigationCommand
              className="size-10 rounded-full"
              user={user}
              variant="ghost"
            >
              <HugeiconsIcon className="size-5" icon={Search01Icon} />
            </NavigationCommand>
          </li>
          <li>
            <Button
              className="relative size-10 rounded-full"
              onClick={handleCartClick}
              variant="ghost"
            >
              <HugeiconsIcon className="size-5" icon={ShoppingCart02Icon} />
              {posProduct.items.length > 0 && (
                <Badge className="absolute top-0.5 right-[-0.5px] h-4 w-4 rounded-full p-0 text-[10px]">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </li>
          <li>
            <Button
              className="size-10 rounded-full"
              onClick={toggleSidebar}
              variant="ghost"
            >
              <HugeiconsIcon className="size-5" icon={Menu01Icon} />
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
