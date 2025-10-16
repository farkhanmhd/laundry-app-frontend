import type { UseFormReturn } from "react-hook-form";
import { DateTimePicker } from "@/components/date-time-picker";
import {
  AlertDialogCancel,
  AlertDialogFooter,
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
import { Switch } from "@/components/ui/switch";
import type { AddVoucherSchema, UpdateVoucherSchema } from "./actions";

type Props<T extends AddVoucherSchema | UpdateVoucherSchema> = {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
};

export function VoucherForm({
  form,
  onSubmit,
  isPending = false,
}: Props<AddVoucherSchema | UpdateVoucherSchema>) {
  return (
    <Form {...form}>
      <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                <Input placeholder="e.g. LAUNDRYNEW10" {...field} />
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
              <DateTimePicker date={field.value} onChange={field.onChange} />
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
            {isPending ? "Creating..." : "Create Voucher"}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
