import { z } from "zod";

export const addVoucherSchema = z.object({
  name: z.string().min(1, "Voucher name is required"),
  code: z.string().min(1, "Voucher code is required"),
  discountAmount: z
    .int({ error: "Discount Amount must be a number" })
    .min(1, "Discount Amount must be a positive number"),
  pointsCost: z
    .int({ error: "Points Cost must be a number" })
    .min(1, "Points Cost must be a positive number"),
  expiresAt: z.date({ error: "Expiry date is required" }),
  isActive: z.boolean(),
  isVisible: z.boolean(),
});
export type AddVoucherSchema = z.infer<typeof addVoucherSchema>;
