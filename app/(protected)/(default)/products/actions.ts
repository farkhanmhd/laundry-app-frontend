'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { actionClient } from '@/lib/safe-action';
import {
  addProduct,
  adjustQuantity,
  deleteProduct,
  updateProduct,
} from './data';

const addProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  image: zfd.file(),
  price: z.int().min(0, 'Price must be a positive number'),
  currentQuantity: z.int().min(0, 'Current quantity must be a positive number'),
  reorderPoint: z.int().min(0, 'Reorder point must be a positive number'),
});

export const addProductAction = actionClient
  .inputSchema(addProductSchema)
  .action(async ({ parsedInput }) => {
    const result = await addProduct(parsedInput);

    if (!result) {
      return {
        status: 'error',
        message: 'Something went wrong',
      };
    }

    if (result.status !== 201) {
      return {
        status: 'error',
        message: `Something went wrong. ${result.error?.value?.message}`,
      };
    }

    if (result.data) {
      revalidatePath('/products');
      return {
        status: 'success',
        message: 'New Product added',
      };
    }
  });

const deleteProductSchema = z.object({
  id: z.string(),
});

export const deleteProductAction = actionClient
  .inputSchema(deleteProductSchema)
  .action(async ({ parsedInput }) => {
    const result = await deleteProduct(parsedInput.id);

    if (!result) {
      return {
        status: 'error',
        message: 'Something went wrong',
      };
    }

    if (result.status !== 200) {
      return {
        status: 'error',
        message: 'Something went wrong',
      };
    }

    revalidatePath('/products');
    return {
      status: 'success',
      message: result.data?.message,
    };
  });

const updateProductSchema = zfd.formData({
  id: zfd.text(z.string().min(1, 'Product id is required')),
  name: zfd.text(z.string().min(1, 'Product name is required')),
  image: zfd.file().optional(),
  price: zfd.numeric(z.number().min(0, 'Price must be a positive number')),
  reorderPoint: zfd
    .numeric(z.number().min(0, 'Reorder point must be a positive number'))
    .optional(),
});

type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type UpdateProductBody = Omit<UpdateProductSchema, 'id'>;

const errorResult = {
  status: 'error',
  message: 'Something went wrong',
};

export const updateProductAction = actionClient
  .inputSchema(updateProductSchema)
  .action(async ({ parsedInput }) => {
    const { id, name, price, reorderPoint, image } = parsedInput;

    const data: UpdateProductBody = {
      name,
      price,
      reorderPoint,
      image,
    };

    const result = await updateProduct(id, data);

    if (!result || result.error) {
      return errorResult;
    }

    revalidatePath('/products');
    return {
      status: 'success',
      message: 'Product updated',
    };
  });

const adjustQuantitySchema = z.object({
  productId: z.string().min(1, 'Product id cannot be empty'),
  newQuantity: z.number().min(1, 'New Quantity must be a positive number'),
  reason: z.string().min(3, 'Reason is required'),
});

export type AdjustQuantitySchema = z.infer<typeof adjustQuantitySchema>;

export const adjustQuantityAction = actionClient
  .inputSchema(adjustQuantitySchema)
  .action(async ({ parsedInput }) => {
    const { productId, ...rest } = parsedInput;
    const result = await adjustQuantity(productId, rest);

    if (!result || result.error) {
      return errorResult;
    }

    revalidatePath('/products');
    return {
      status: 'success',
      message: 'Quantity Adjusted',
    };
  });
