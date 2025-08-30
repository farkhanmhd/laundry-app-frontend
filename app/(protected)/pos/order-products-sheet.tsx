'use client';

import { IconShoppingCart } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { PosOrderProducts } from './pos-order-products';
import { usePosProducts } from './state';

const OrderProductsSheet = () => {
  const isMobile = useIsMobile();
  const { posProduct } = usePosProducts();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="relative h-12 w-12 rounded-full"
            variant="secondary"
          >
            <IconShoppingCart
              className="text-primary"
              style={{ width: '26px', height: '26px' }}
            />
            {posProduct.length > 0 && (
              <Badge className="-top-1 -right-1 absolute rounded-full">
                {posProduct.length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full max-w-full sm:max-w-full">
          <SheetTitle className="hidden" />
          <div className="h-full">
            <PosOrderProducts className="flex" />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return null;
};

export default OrderProductsSheet;
