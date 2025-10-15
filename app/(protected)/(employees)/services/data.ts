import { headers } from "next/headers";
import { elysia } from "@/elysia/treaty";
import { getHeadersWithoutContentType } from "@/lib/next-headers";
import { UpdateProductBody } from "../products/actions";
import type { AddServiceBody, UpdateServiceBody } from "./actions";

export const getServices = async () => {
  try {
    const { data: response } = await elysia.services.get({
      fetch: {
        headers: await headers(),
      },
    });

    const data = response?.data;

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch services");
  }
};

export type ServicesArray = Awaited<ReturnType<typeof getServices>>;
export type ServiceData = NonNullable<ServicesArray>[number];

export const addService = async (body: AddServiceBody) => {
  const result = await elysia.services.post(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const deleteService = async (id: string) => {
  const result = await elysia.services({ id }).delete(
    {},
    {
      fetch: {
        headers: await headers(),
      },
    }
  );

  return result;
};

export type UpdateServiceData = Parameters<
  ReturnType<typeof elysia.services>["patch"]
>[0];

export type UpdateServiceImage = Parameters<
  ReturnType<typeof elysia.services>["image"]["patch"]
>[0];

export const updateServiceImage = async (
  id: string,
  body: UpdateServiceImage
) => {
  const result = await elysia.services({ id }).image.patch(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const updateServiceData = async (
  id: string,
  body: UpdateServiceData
) => {
  const result = await elysia.services({ id }).patch(body, {
    fetch: {
      headers: await getHeadersWithoutContentType(),
    },
  });

  return result;
};

export const updateService = async (id: string, data: UpdateServiceBody) => {
  const { image, ...serviceData } = data;
  const updateDataResult = await updateServiceData(id, serviceData);

  if (image) {
    const updateWithImageResult = await updateServiceImage(id, { image });

    return updateWithImageResult;
  }

  return updateDataResult;
};
