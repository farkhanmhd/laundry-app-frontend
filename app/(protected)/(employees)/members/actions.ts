"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { elysia } from "@/elysia/treaty";
import { actionClient } from "@/lib/safe-action";
import { addMemberSchema } from "./schema";

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
