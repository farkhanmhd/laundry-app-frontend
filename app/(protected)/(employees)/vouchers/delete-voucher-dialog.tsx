"use client";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
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
import { deleteVoucherAction } from "./actions";
import { useVoucherDialog, type VoucherID } from "./state";

export function DeleteVoucherDialog() {
  const { voucherState, close } = useVoucherDialog<VoucherID>();

  const { execute: confirmAndDeleteProduct, isPending } = useAction(
    deleteVoucherAction,
    {
      onSuccess: (result) => {
        if (result.data?.status === "success") {
          close();
        }
        toast(result.data?.message);
      },
    }
  );

  return (
    <AlertDialog onOpenChange={close} open={voucherState?.open === "delete"}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete voucher?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            voucher .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={() =>
              confirmAndDeleteProduct({
                id: voucherState?.data.id as string,
              })
            }
            variant="destructive"
          >
            Confirm Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
