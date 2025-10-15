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
import { updateServiceAction } from "./actions";
import { type UpdateData, useServiceDialog } from "./state";

const updateServiceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Service name is required"),
  price: z.number().min(1, "Price must be a positive number"),
  image: z.nullable(z.union([z.string(), z.instanceof(File)])).optional(),
});

type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;

export default function UpdateServiceDialog() {
  const { serviceState, close } = useServiceDialog<UpdateData>();
  const defaultValues: UpdateServiceSchema = {
    id: serviceState?.data ? serviceState.data.id : "",
    name: serviceState?.data ? serviceState.data.name : "",
    price: serviceState?.data ? serviceState.data.price : 0,
    image: serviceState?.data ? serviceState.data.image : null,
  };

  const form = useForm<UpdateServiceSchema>({
    resolver: zodResolver(updateServiceSchema),
    values: defaultValues,
  });

  const { execute, isPending } = useAction(updateServiceAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === "success") {
        close();
        form.reset(defaultValues);
      }
      toast(actionResult.data?.message);
    },
  });

  const onSubmit = (data: UpdateServiceSchema) => {
    const { image, ...serviceData } = data;
    if (image instanceof File) {
      execute({ ...serviceData, image });
    } else {
      execute(serviceData);
    }
  };

  return (
    <AlertDialog onOpenChange={close} open={serviceState?.open === "update"}>
      <AlertDialogContent className="max-w-xl p-0">
        <ScrollArea className="max-h-dvh p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle>Update Service</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details to update this service data
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        disabled={form.formState.isSubmitting}
                        placeholder="Enter Service Name"
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

              {/* Unit */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel htmlFor="image-upload">Image</FormLabel>
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
                  Update Service
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
