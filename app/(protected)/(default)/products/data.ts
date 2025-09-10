import { headers } from 'next/headers';
import { getHeadersWithoutContentType } from '@/lib/next-headers';
import { elysia } from '@/treaty';
import type { UpdateProductBody } from './actions';

export const getProducts = async () => {
  const { data: response } = await elysia.products.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

export type ProductsArray = Awaited<ReturnType<typeof getProducts>>;
export type ProductData = NonNullable<ProductsArray>[number];
export type AddProductBody = Parameters<typeof elysia.products.post>[0];

export const addProduct = async (body: AddProductBody) => {
  const result = await elysia.products.post(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const deleteProduct = async (id: string) => {
  const result = await elysia.products({ id }).delete(
    {},
    {
      fetch: {
        headers: await headers(),
      },
    }
  );

  return result;
};

export type UpdateProductData = Parameters<
  ReturnType<typeof elysia.products>['patch']
>[0];

export type UpdateProductImage = Parameters<
  ReturnType<typeof elysia.products>['image']['patch']
>[0];

export const updateProductImage = async (
  id: string,
  body: UpdateProductImage
) => {
  const result = await elysia.products({ id }).image.patch(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const updateProductData = async (
  id: string,
  body: UpdateProductData
) => {
  const result = await elysia.products({ id }).patch(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const updateProduct = async (id: string, data: UpdateProductBody) => {
  const { image, ...productData } = data;

  const updateDataResult = await updateProductData(id, productData);

  if (image) {
    const updateWithImageResult = await updateProductImage(id, { image });

    return updateWithImageResult;
  }

  return updateDataResult;
};

export type AdjustQuantityBody = Parameters<
  ReturnType<typeof elysia.products>['stock']['patch']
>[0];

export const adjustQuantity = async (id: string, body: AdjustQuantityBody) => {
  const result = await elysia.products({ id }).stock.patch(body, {
    fetch: {
      headers: await headers(),
    },
  });

  return result;
};
