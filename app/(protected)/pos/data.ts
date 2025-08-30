import { headers } from 'next/headers';
import { eden } from '@/treaty';

export const getProducts = async () => {
  const { data: response } = await eden.products.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

export type ProductsArray = Awaited<ReturnType<typeof getProducts>>;
export type ProductData = NonNullable<ProductsArray>[number];
