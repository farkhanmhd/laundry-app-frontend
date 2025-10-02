import { headers } from "next/headers";
import { elysia } from "@/elysia/treaty";

export const getCustomers = async () => {
  const { data: response } = await elysia.customers.get({
    fetch: {
      headers: await headers(),
    },
  });

  const customers = response?.data;

  return customers;
};

export type CustomerData = NonNullable<
  Awaited<ReturnType<typeof getCustomers>>
>[number];
