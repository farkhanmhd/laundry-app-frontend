"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
import { type AdjustQuantitySchema, adjustQuantityAction } from "../actions";
import { type UpdateQTY, useProductDialog } from "./state";

const adjustQuantitySchema = z
  .object({
    id: z
      .string({
        error: "Product ID is required.",
      })
      .min(1, { message: "Product ID cannot be empty." }),

    name: z.string({
      error: "Product name is required.",
    }),

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
      .nonnegative({ message: "New quantity cannot be negative." }),

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

export default function AdjustQuantityDialog() {
  const { productState, close } = useProductDialog<UpdateQTY>();

  const defaultValues: UpdateQTY = {
    id: productState?.data.id ? productState.data.id : "",
    name: productState?.data.name ? productState.data.name : "",
    currentQuantity: productState?.data.currentQuantity
      ? productState?.data.currentQuantity
      : 0,
    newQuantity: 0,
    reason: "",
  };

  const form = useForm<UpdateQTY>({
    resolver: zodResolver(adjustQuantitySchema),
    values: defaultValues,
  });

  const { execute, isPending } = useAction(adjustQuantityAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === "success") {
        close();
      }
      toast(actionResult.data?.message);
    },
  });

  const onSubmit = (data: UpdateQTY) => {
    const submittedData: AdjustQuantitySchema = {
      productId: data.id,
      newQuantity: data.newQuantity,
      reason: data.reason,
    };

    execute(submittedData);
  };

  return (
    <AlertDialog onOpenChange={close} open={productState?.open === "adjust"}>
      <AlertDialogContent className="max-w-md p-0">
        <ScrollArea className="max-h-dvh p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle>Stock Adjustment</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details to adjust quantity of this item
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Product Name */}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        disabled
                        onChange={() => ""}
                        placeholder="Enter Product Name"
                        readOnly
                        value={`${field.value} [${form.formState.defaultValues?.id?.toUpperCase()}]`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentQuantity"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Current Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        className="text-right"
                        disabled
                        min="0"
                        onChange={() => ""}
                        placeholder="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newQuantity"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>New Quantity</FormLabel>
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

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        disabled={form.formState.isSubmitting}
                        placeholder="Bonus from Supplier"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-3">
                <AlertDialogCancel
                  disabled={isPending}
                  onClick={() => form.reset(defaultValues)}
                >
                  Cancel
                </AlertDialogCancel>
                <Button disabled={isPending} type="submit">
                  Adjust Quantity
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
