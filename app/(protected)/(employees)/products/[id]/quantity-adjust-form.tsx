"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { adjustQuantityAction } from "../actions";
import { type AdjustQuantitySchema, adjustQuantitySchema } from "../schema";

export function QuantityAdjustForm({
  productId,
  currentQuantity = 0,
}: {
  productId: string;
  currentQuantity: number;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const initialValues: AdjustQuantitySchema = {
    id: productId,
    currentQuantity,
    newQuantity: 0,
    reason: "",
  };

  const form = useForm<AdjustQuantitySchema>({
    defaultValues: initialValues,
    resolver: zodResolver(adjustQuantitySchema),
    mode: "onTouched",
  });

  const { execute, isPending } = useAction(adjustQuantityAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === "success") {
        toast.success(actionResult.data?.message);
        const newQuantity = form.getValues("newQuantity");
        setIsEditing(false);
        form.reset({ ...initialValues, currentQuantity: newQuantity });
      } else {
        toast.error(actionResult.data?.message);
      }
    },
  });

  function onSubmit(data: AdjustQuantitySchema) {
    execute(data);
  }

  function onCancel() {
    form.reset(initialValues);
    setIsEditing(false);
  }

  return (
    <div className="w-full">
      <h2 className="mb-1 font-semibold text-xl">Stock Adjustment</h2>
      <p className="text-muted-foreground text-sm">
        Adjust inventory quantity.
      </p>
      <Form {...form}>
        <form
          className="mt-4 flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-3">
            <div className="flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50">
              Current Quantity
            </div>
            <div className="flex h-9 items-center justify-end rounded-md border bg-muted/50 px-3 py-1.5 text-foreground/80 text-sm">
              {currentQuantity}
            </div>
          </div>
          <FormField
            control={form.control}
            name="newQuantity"
            render={({ field }) => (
              <FormItem className="space-y-1.25">
                <FormLabel>New Quantity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="text-right"
                    disabled={!isEditing || isPending}
                    min={0}
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
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={!isEditing || isPending}
                    placeholder="e.g. Stock correction"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditing ? (
            <div className="flex items-center justify-end gap-4">
              <Button
                disabled={isPending}
                onClick={onCancel}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                className="w-min"
                disabled={!form.formState.isDirty || isPending}
                type="submit"
                variant="default"
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              className="w-min self-end"
              onClick={() => setIsEditing(true)}
              type="button"
            >
              Edit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
