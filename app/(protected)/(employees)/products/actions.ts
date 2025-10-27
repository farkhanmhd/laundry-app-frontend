"use server";

import { revalidatePath } from "next/cache";

import type { elysia } from "@/elysia/treaty";
import { actionClient } from "@/lib/safe-action";
import {
  addProduct,
  adjustQuantity,
  deleteProduct,
  updateProduct,
} from "./data";
import {
  type AddProductSchema,
  addProductSchema,
  adjustQuantitySchema,
  deleteProductSchema,
  type UpdateProductBody,
  updateProductSchema,
} from "./schema";

export type AddProductBody = Parameters<typeof elysia.products.post>[0];

export const addProductAction = actionClient
  .inputSchema(addProductSchema)
  .action(async ({ parsedInput }) => {
    const result = await addProduct(parsedInput as AddProductSchema);

    if (!result) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }

    if (result.status !== 201) {
      return {
        status: "error",
        message: `Something went wrong. ${result.error?.value?.message}`,
      };
    }

    if (result.data) {
      revalidatePath("/products");
      return {
        status: "success",
        message: "New Product added",
      };
    }
  });

export const deleteProductAction = actionClient
  .inputSchema(deleteProductSchema)
  .action(async ({ parsedInput }) => {
    const result = await deleteProduct(parsedInput.id);

    if (!result) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }

    if (result.status !== 200) {
      return {
        status: "error",
        message: "Something went wrong",
      };
    }

    revalidatePath("/products");
    return {
      status: "success",
      message: result.data?.message,
    };
  });

const errorResult = {
  status: "error",
  message: "Something went wrong",
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

    revalidatePath("/products");
    return {
      status: "success",
      message: "Product updated",
    };
  });

export const adjustQuantityAction = actionClient
  .inputSchema(adjustQuantitySchema)
  .action(async ({ parsedInput }) => {
    const { productId, ...rest } = parsedInput;
    const result = await adjustQuantity(productId, rest);

    if (!result || result.error) {
      return errorResult;
    }

    revalidatePath("/products");
    return {
      status: "success",
      message: "Quantity Adjusted",
    };
  });
