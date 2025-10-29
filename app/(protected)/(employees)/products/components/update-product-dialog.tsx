"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
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
import { updateProductAction } from "../actions";
import { type UpdateData, useProductDialog } from "./state";

const updateProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Product name is required"),
  image: z.nullable(z.union([z.string(), z.instanceof(File)])).optional(),
  price: z.number().min(1, "Price must be a positive number"),
  reorderPoint: z.number().min(1, "Reorder point must be a positive number"),
});

type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export default function UpdateProductDialog() {
  const { productState, close } = useProductDialog<UpdateData>();
  const defaultValues: UpdateProductSchema = {
    id: productState?.data ? productState.data.id : "",
    name: productState?.data ? productState.data.name : "",
    image: productState?.data ? productState.data.image : null,
    reorderPoint: productState?.data ? productState.data.reorderPoint : 0,
    price: productState?.data ? productState.data.price : 0,
  };

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    values: defaultValues,
  });

  const { execute, isPending } = useAction(updateProductAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === "success") {
        close();
        form.reset(defaultValues);
      }
      toast(actionResult.data?.message);
    },
  });

  const onSubmit = (data: UpdateProductSchema) => {
    const { image, ...restOfData } = data;

    if (image instanceof File) {
      execute({ ...restOfData, image });
    } else {
      execute(restOfData);
    }
  };

  return (
    <AlertDialog onOpenChange={close} open={productState?.open === "update"}>
      <AlertDialogContent className="max-w-xl p-0">
        <ScrollArea className="max-h-[80dvh] p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle>Update Product</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details to update this product data
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Product Name */}
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

              {/* Reorder Point */}
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

              <div className="flex items-center justify-end gap-3">
                <AlertDialogCancel
                  disabled={isPending}
                  onClick={() => form.reset(defaultValues)}
                >
                  Cancel
                </AlertDialogCancel>
                <Button disabled={isPending} type="submit">
                  Update Product
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
