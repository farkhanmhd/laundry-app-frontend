"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { elysia } from "@/elysia/treaty";
import { actionClient } from "@/lib/safe-action";

const addMemberSchema = z.object({
  name: z.string().min(3, "Customer name is required"),
  phone: z.string().min(7, "Phone number is required"),
});

export type AddMemberSchema = z.infer<typeof addMemberSchema>;

export const addMemberAction = actionClient
  .inputSchema(addMemberSchema)
  .action(async ({ parsedInput }) => {
    const result = await elysia.members.post(parsedInput, {
      fetch: {
        headers: await headers(),
      },
    });

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
      revalidatePath("/customers");
      return {
        status: "success",
        message: "New Product added",
      };
    }
  });
