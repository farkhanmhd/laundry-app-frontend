"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import type { elysia } from "@/elysia/treaty";
import { actionClient } from "@/lib/safe-action";
import { addService, deleteService, updateService } from "./data";

export type AddServiceBody = Parameters<typeof elysia.services.post>[0];
const addServiceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  price: z
    .number({ error: "Price should be a number" })
    .min(0, "Price must be a positive number"),
  image: z.file(),
});

export type AddServiceSchema = z.infer<typeof addServiceSchema>;

export const addServiceAction = actionClient
  .inputSchema(addServiceSchema)
  .action(async ({ parsedInput }) => {
    const result = await addService(parsedInput as AddServiceSchema);

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
      revalidatePath("/services");
      return {
        status: "success",
        message: "New Service added",
      };
    }
  });

const deleteServiceSchema = z.object({
  id: z.string(),
});

export const deleteServiceAction = actionClient
  .inputSchema(deleteServiceSchema)
  .action(async ({ parsedInput }) => {
    const result = await deleteService(parsedInput.id);

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

    revalidatePath("/services");
    return {
      status: "success",
      message: result.data?.message,
    };
  });

const updateServiceSchema = zfd.formData({
  id: zfd.text(z.string().min(1, "Service id is required")),
  name: zfd.text(z.string().min(1, "Service name is required")),
  price: zfd.numeric(z.number().min(1, "Price must be a positive number")),
  image: zfd.file().optional(),
});

export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;
export type UpdateServiceBody = Omit<UpdateServiceSchema, "id">;

const errorResult = {
  status: "error",
  message: "Something went wrong",
};

export const updateServiceAction = actionClient
  .inputSchema(updateServiceSchema)
  .action(async ({ parsedInput }) => {
    const { id, name, price, image } = parsedInput;

    const data: UpdateServiceBody = {
      name,
      price,
      image,
    };

    const result = await updateService(id, data);

    if (!result || result.error) {
      return errorResult;
    }

    revalidatePath("/services");
    return {
      status: "success",
      message: "Service updated",
    };
  });
