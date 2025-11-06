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
import { updateProductAction } from "../actions";
import { type UpdateProductSchema, updateProductSchema } from "../schema";

export function ProductDataForm({
  defaultValues,
}: {
  defaultValues: UpdateProductSchema;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<UpdateProductSchema>({
    defaultValues,
    resolver: zodResolver(updateProductSchema),
    mode: "onTouched",
  });

  const { execute, isPending } = useAction(updateProductAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === "success") {
        toast(actionResult.data?.message);
        setIsEditing(false);
      }
    },
  });

  const onSubmit = (data: UpdateProductSchema) => {
    execute(data);
  };

  function onCancel() {
    form.reset(defaultValues);
    setIsEditing(false);
  }

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center gap-2 font-semibold text-xl">
        <h2>Product Details </h2>
        <span className="text-muted-foreground uppercase">{`#${defaultValues.id}`}</span>
      </div>
      <p className="text-muted-foreground text-sm">
        Update product information.
      </p>
      <Form {...form}>
        <form
          className="mt-4 flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1.25">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    disabled={!isEditing || isPending}
                    placeholder="Product Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="space-y-1.25">
                <FormLabel>Price (IDR)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
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
            name="reorderPoint"
            render={({ field }) => (
              <FormItem className="space-y-1.25">
                <FormLabel>Reorder Point</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
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

          {isEditing ? (
            <div className="flex items-center justify-end gap-4">
              <Button
                disabled={!isEditing || isPending}
                onClick={onCancel}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                className="w-min"
                disabled={!isEditing || isPending || !form.formState.isDirty}
                type="submit"
                variant="default"
              >
                {isPending ? "Updating..." : "Save"}
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
