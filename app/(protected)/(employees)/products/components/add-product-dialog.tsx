"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ImageUploadDropzone from "@/components/image-dropzone";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
import { addProductAction } from "../actions";
import type { AddProductSchema } from "../schema";

const addProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  image: z.file(),
  price: z
    .int({ error: "Price should be a number" })
    .min(1, "Price must be a positive number"),
  currentQuantity: z
    .int({ error: "Quantity should be a number" })
    .min(1, "Current quantity must be a positive number"),
  reorderPoint: z
    .int({ error: "Reorder Point should be a number" })
    .min(1, "Reorder point must be a positive number"),
});

export default function AddProductDialog() {
  const [open, setOpen] = useState(false);

  const defaultValues = {
    name: "",
    price: 0,
    currentQuantity: 0,
    reorderPoint: 0,
    image: undefined,
  };

  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues,
  });

  const { execute, isPending } = useAction(addProductAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === "success") {
        setOpen(false);
        form.reset(defaultValues);
      }
      toast(actionResult.data?.message);
    },
  });

  const onSubmit = (data: AddProductSchema) => {
    if (!data.image) {
      return;
    }

    execute(data);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className="h-8">
          <Plus />
          <span>Product</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md p-0">
        <ScrollArea className="max-h-[80dvh] p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle>Add New Product</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details to add a new product to your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        disabled={form.formState.isSubmitting}
                        placeholder="Enter Product Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Price</FormLabel>
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

              {/* Current Quantity */}
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
                name="reorderPoint"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Reorder Point</FormLabel>
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploadDropzone
                        image={field.value}
                        setImage={field.onChange}
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
                  Add Product
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
