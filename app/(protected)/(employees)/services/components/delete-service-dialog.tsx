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
  AlertDialogTitle, // Using Title for better semantics and accessibility
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteServiceAction } from "../actions";
import { type ServiceID, useServiceDialog } from "./state";

const DeleteServiceDialog = () => {
  const { serviceState, close } = useServiceDialog<ServiceID>();

  const { execute: confirmAndDeleteService, isPending } = useAction(
    deleteServiceAction,
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
    <AlertDialog onOpenChange={close} open={serviceState?.open === "delete"}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            service and remove all of its associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={close}>
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isPending || !serviceState?.data.id}
            onClick={() =>
              confirmAndDeleteService({ id: serviceState?.data.id as string })
            }
            variant="destructive"
          >
            {isPending ? "Deleting..." : "Yes, delete service"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteServiceDialog;
