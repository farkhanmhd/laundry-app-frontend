import { z } from "zod";
import { zfd } from "zod-form-data";

export const addProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  image: z.file(),
  price: z
    .int({ error: "Price should be a number" })
    .min(0, "Price must be a positive number"),
  currentQuantity: z
    .int({ error: "Quantity should be a number" })
    .min(0, "Current quantity must be a positive number"),
  reorderPoint: z
    .int({ error: "Reorder Point should be a number" })
    .min(0, "Reorder point must be a positive number"),
});

export type AddProductSchema = z.infer<typeof addProductSchema>;

export const deleteProductSchema = z.object({
  id: z.string(),
});

export const updateProductSchema = zfd.formData({
  id: zfd.text(z.string().min(1, "Product id is required")),
  name: zfd.text(z.string().min(1, "Product name is required")),
  image: zfd.file().optional(),
  price: zfd.numeric(z.number().min(1, "Price must be a positive number")),
  reorderPoint: zfd
    .numeric(z.number().min(1, "Reorder point must be a positive number"))
    .optional(),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type UpdateProductBody = Omit<UpdateProductSchema, "id">;

export const adjustQuantitySchema = z.object({
  productId: z.string().min(1, "Product id cannot be empty"),
  newQuantity: z.number().min(1, "New Quantity must be a positive number"),
  reason: z.string().min(3, "Reason is required"),
});

export type AdjustQuantitySchema = z.infer<typeof adjustQuantitySchema>;
