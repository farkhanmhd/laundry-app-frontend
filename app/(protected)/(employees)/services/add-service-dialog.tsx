"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
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
import { type AddServiceSchema, addServiceAction } from "./actions";

const addServiceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  price: z
    .number({ error: "Price should be a number" })
    .min(1, "Price must be a positive number"),
  image: z.file(),
});

export default function AddServiceDialog() {
  const [open, setOpen] = useState(false);

  const defaultValues = {
    name: "",
    price: 0,
    image: undefined,
  };

  const form = useForm<AddServiceSchema>({
    resolver: zodResolver(addServiceSchema),
    defaultValues,
  });

  const { execute, isPending } = useAction(addServiceAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === "success") {
        setOpen(false);
        form.reset(defaultValues);
      }
      toast(actionResult.data?.message);
    },
  });

  const onSubmit = (data: AddServiceSchema) => {
    execute(data);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className="h-8">
          <IconPlus />
          <span>Add Service</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md p-0">
        <ScrollArea className="max-h-dvh p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle>Add New Service</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details to add a new service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Service Name */}
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

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel id="image-upload">Image</FormLabel>
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
                  Add Service
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
