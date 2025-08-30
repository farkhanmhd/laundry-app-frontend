'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatCurrency } from '@/lib/utils';
import type { ProductData } from './data';
import { usePosProducts } from './state';

interface Props {
  product: ProductData;
}

export function PosProductCard({ product }: Props) {
  const isMobile = useIsMobile();
  const { posProduct, setPosProduct } = usePosProducts();

  const handleAddToOrder = () => {
    const existingItem = posProduct.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      setPosProduct(
        posProduct.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setPosProduct([...posProduct, { quantity: 1, product }]);
    }

    if (isMobile) {
      toast('1 Item added to cart');
    }
  };

  return (
    <Card
      aria-roledescription="button"
      className="aspect-square cursor-pointer p-3 shadow-none duration-200 hover:shadow"
      onClick={handleAddToOrder}
    >
      <CardContent className="flex flex-1 flex-col justify-between gap-4 px-0">
        <Image
          alt="Product Image"
          className="aspect-square rounded-md object-cover"
          height={1000}
          src={product.image!}
          width={1000}
        />
        <CardFooter className="flex items-center justify-between p-0">
          <span className="font-medium">{product.name}</span>
          <span className="font-semibold text-lg">
            {formatCurrency(product.price)}
          </span>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
