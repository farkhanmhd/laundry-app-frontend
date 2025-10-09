"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
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
import { type AddMemberSchema, addMemberAction } from "./actions";

const addMemberSchema = z.object({
  name: z.string().min(3, "Customer name is required"),
  phone: z.string().min(7, "Phone number is required"),
});

export default function AddMemberDialog() {
  const [open, setOpen] = useState(false);

  const defaultValues: AddMemberSchema = {
    name: "",
    phone: "",
  };

  const form = useForm<AddMemberSchema>({
    resolver: zodResolver(addMemberSchema),
    defaultValues,
  });

  const { execute, isPending } = useAction(addMemberAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === "success") {
        setOpen(false);
        form.reset(defaultValues);
      }
      toast(actionResult.data?.message);
    },
  });

  const onSubmit = (data: AddMemberSchema) => {
    execute(data);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className="h-8">
          <IconPlus />
          <span>Add Member</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md p-0">
        <ScrollArea className="max-h-dvh p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle>Add New Customer</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details to add a new Member.
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
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        disabled={form.formState.isSubmitting}
                        placeholder="Customer Name"
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-1.25">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        disabled={form.formState.isSubmitting}
                        min="0"
                        placeholder="08123457890"
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
                  Add Member
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
