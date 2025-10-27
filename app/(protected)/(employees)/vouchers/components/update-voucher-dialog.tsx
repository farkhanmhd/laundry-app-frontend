"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DateTimePicker } from "@/components/date-time-picker";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { updateVoucherAction } from "../actions";
import { type UpdateData, useVoucherDialog } from "./state";

const addVoucherSchema = z.object({
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

const updateVoucherSchema = addVoucherSchema.partial().extend({
  id: z.string().min(1, "Voucher ID is required"),
});

type UpdateVoucherSchema = z.infer<typeof updateVoucherSchema>;

export default function UpdateVoucherDialog() {
  const { voucherState, close } = useVoucherDialog<UpdateData>();

  const defaultValues: UpdateVoucherSchema = {
    id: "",
    name: "",
    code: "",
    discountAmount: 0,
    pointsCost: 0,
    isVisible: false,
    isActive: false,
  };

  const form = useForm<UpdateVoucherSchema>({
    resolver: zodResolver(updateVoucherSchema),
    values: defaultValues,
  });

  useEffect(() => {
    const data = voucherState?.data;
    if (data) {
      form.reset({
        ...data,
        expiresAt: new Date(data.expiresAt as string),
      });
    }
  }, [voucherState?.data, form.reset]);

  const { execute, isPending } = useAction(updateVoucherAction, {
    onSuccess: ({ data }) => {
      if (data?.status === "success") {
        toast.success(data.message);
        close();
      } else {
        toast.error(data?.message || "An unexpected error occurred.");
      }
    },
    onError: () => {
      toast.error("Failed to add voucher. Please try again.");
    },
  });

  const onSubmit = (data: UpdateVoucherSchema) => {
    execute(data);
  };

  return (
    <AlertDialog onOpenChange={close} open={voucherState?.open === "update"}>
      <AlertDialogContent className="max-w-md p-0">
        <ScrollArea className="max-h-[90dvh] p-6">
          <AlertDialogHeader>
            <AlertDialogTitle>Update Voucher</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details below to update this voucher.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form
              className="mt-6 space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Voucher Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Voucher Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="e.g. Grand Opening Discount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Voucher Code */}
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Voucher Code</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="e.g. LAUNDRYNEW10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Discount Amount */}
              <FormField
                control={form.control}
                name="discountAmount"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Discount Amount (IDR)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        className="text-right"
                        disabled={form.formState.isSubmitting}
                        min="0"
                        onChange={(e) => {
                          const numericValue = Number(
                            e.target.value.replace(/[^0-9]/g, "")
                          );
                          field.onChange(numericValue);
                        }}
                        placeholder="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Points Cost */}
              <FormField
                control={form.control}
                name="pointsCost"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Points Cost</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        className="text-right"
                        disabled={form.formState.isSubmitting}
                        min="0"
                        onChange={(e) => {
                          const numericValue = Number(
                            e.target.value.replace(/[^0-9]/g, "")
                          );
                          field.onChange(numericValue);
                        }}
                        placeholder="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expires At */}
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Expires At</FormLabel>
                    <DateTimePicker
                      date={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status Toggles */}
              <div className="flex items-center space-x-8 pt-2">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Active</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isVisible"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Visible</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <AlertDialogFooter className="pt-6">
                <AlertDialogCancel asChild>
                  <Button disabled={isPending} variant="outline">
                    Cancel
                  </Button>
                </AlertDialogCancel>
                <Button disabled={isPending} type="submit">
                  {isPending ? "Updating..." : "Update Voucher"}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
