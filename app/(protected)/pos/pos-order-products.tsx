'use client';

import { IconPencil } from '@tabler/icons-react';
import Image from 'next/image';
import NumberInput from '@/components/number-input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, formatCurrency, MapItems } from '@/lib/utils';
import { type PosProduct, usePosProducts } from './state';

interface Props {
  className?: string;
}

export function PosOrderProducts({ className }: Props) {
  const { posProduct, setPosProduct } = usePosProducts();
  const total = posProduct.reduce(
    (acc, curr) => acc + curr.quantity * curr.product.price,
    0
  );

  const handleIncrementQuantity = (productId: string) => {
    setPosProduct(
      posProduct.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrementQuantity = (productId: string) => {
    setPosProduct((currentProducts) =>
      currentProducts.reduce((newArray, item) => {
        if (item.product.id === productId) {
          if (item.quantity > 1) {
            newArray.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          newArray.push(item);
        }
        return newArray;
      }, [] as PosProduct[])
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    orderProduct: PosProduct
  ) => {
    // 1. Sanitize the input to get a valid number.
    const newQuantity = Number(e.target.value.replace(/[^0-9]/g, ''));

    // 2. Determine the quantity, ensuring it doesn't exceed the available stock.
    const cappedQuantity = Math.min(
      newQuantity,
      orderProduct.product.currentQuantity
    );

    if (newQuantity === 0) {
      setPosProduct((currentProducts) =>
        currentProducts.filter(
          (item) => item.product.id !== orderProduct.product.id
        )
      );
    }

    setPosProduct((currentProducts) =>
      currentProducts.map((item) =>
        item.product.id === orderProduct.product.id
          ? { ...item, quantity: cappedQuantity }
          : item
      )
    );
  };

  return (
    <div className={cn('h-dvh flex-col overflow-hidden shadow-sm', className)}>
      <header className="flex h-20 items-center justify-center shadow-xs">
        <span className="font-semibold text-lg">Order</span>
      </header>
      <ScrollArea className="min-h-0 flex-1">
        <ul className="flex flex-col divide-y divide-dashed divide-primary/20 px-4">
          {posProduct.length === 0 ? (
            <li className="flex h-[133px] items-center justify-center border-b border-dashed text-secondary-foreground/70">
              No Item Selected
            </li>
          ) : (
            <MapItems
              of={posProduct}
              render={(item, index) => (
                <li
                  className="flex w-full items-end justify-between py-4"
                  key={`${item.product.id}-${index}`}
                >
                  <div className="flex h-full gap-4">
                    <Image
                      alt="Cart item"
                      className="max-h-[100px] rounded-lg object-cover"
                      height={100}
                      src={item.product.image as string}
                      width={150}
                    />
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col">
                        <span className="font-medium">{item.product.name}</span>
                        <span className="text-muted-foreground">
                          {formatCurrency(item.product.price)}
                        </span>
                      </div>
                      <Button className="rounded-full" size="icon">
                        <IconPencil />
                      </Button>
                    </div>
                  </div>
                  <div className="max-w-[120px]">
                    <NumberInput
                      onDecrement={() =>
                        handleDecrementQuantity(item.product.id)
                      }
                      onIncrement={() =>
                        handleIncrementQuantity(item.product.id)
                      }
                      onInputChange={(e) => handleInputChange(e, item)}
                      value={item.quantity}
                    />
                  </div>
                </li>
              )}
            />
          )}
        </ul>
      </ScrollArea>
      <footer>
        <div className="space-y-4 pt-8">
          <div className="flex items-center justify-between px-4 font-semibold text-lg">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex gap-2 px-4">
            <Button className="h-12 flex-1 rounded-full" variant="secondary">
              Add Promo or Voucher
            </Button>
            <Button
              className="h-12 flex-1 rounded-full text-base"
              variant="secondary"
            >
              Cash
            </Button>
          </div>
          <Button
            className="h-16 w-full rounded-none text-lg"
            variant="secondary"
          >
            Place Order
          </Button>
        </div>
      </footer>
    </div>
  );
}
