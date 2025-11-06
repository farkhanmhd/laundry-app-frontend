import { z } from "zod";

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

export const updateProductSchema = z.object({
  id: z.string().min(1, "Product id cannot be empty"),
  name: z.string().min(1, "Product name cannot be empty"),
  price: z
    .number()
    .int("Product price must be an integer")
    .nonnegative("Product price cannot be empty"),
  reorderPoint: z
    .number()
    .int("Reorder point must be an integer")
    .nonnegative("Reorder point cannot be empty"),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type UpdateProductBody = Omit<UpdateProductSchema, "id">;

export const adjustQuantitySchema = z
  .object({
    id: z
      .string({
        error: "Product ID is required.",
      })
      .min(1, { message: "Product ID cannot be empty." }),

    currentQuantity: z
      .number({
        error: "Current quantity is required.",
      })
      .int({ message: "Current quantity must be a whole number." })
      .nonnegative({ message: "Current quantity cannot be negative." }),

    newQuantity: z
      .number({
        error: "New quantity is required.",
      })
      .int({ message: "New quantity must be a whole number." })
      .min(1, { message: "New quantity must be at least 1." }),

    reason: z
      .string({
        error: "A reason for the adjustment is required.",
      })
      .min(5, { message: "Please provide a reason (at least 5 characters)." })
      .max(500, { message: "The reason must be 500 characters or less." }),
  })
  .refine((data) => data.newQuantity !== data.currentQuantity, {
    message: "New quantity must be different from the current quantity.",
    path: ["newQuantity"], // Where to display this error
  });

export type AdjustQuantitySchema = z.infer<typeof adjustQuantitySchema>;
