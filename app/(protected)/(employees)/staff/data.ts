import { headers } from "next/headers";
import { elysia } from "@/elysia/treaty";

/**
 * Fetches all vouchers from the API.
 * It passes along the necessary headers for authentication.
 */
export const getStaffs = async () => {
  const { data: response } = await elysia.staffs.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;

  return data;
};

// --- Type Definitions ---
// Infers the array type from the getVouchers function's return value.
export type StaffArray = Awaited<ReturnType<typeof getStaffs>>;
// Infers the single voucher object type from the VouchersArray.
export type Staff = NonNullable<StaffArray>[number];
