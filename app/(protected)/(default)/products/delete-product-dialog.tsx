'use client';

import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle, // Using Title for better semantics and accessibility
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteProductAction } from './actions';
import { type ProductID, useProductDialog } from './state';

const DeleteProductDialog = () => {
  const { productState, close } = useProductDialog<ProductID>();

  const { execute: confirmAndDeleteProduct, isPending } = useAction(
    deleteProductAction,
    {
      onSuccess: (result) => {
        if (result.data?.status === 'success') {
          close();
        }
        toast(result.data?.message);
      },
    }
  );

  return (
    <AlertDialog onOpenChange={close} open={productState?.open === 'delete'}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product and remove all of its associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={close}>
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isPending || !productState?.data.id}
            onClick={() =>
              confirmAndDeleteProduct({ id: productState?.data.id as string })
            }
            variant="destructive"
          >
            {isPending ? 'Deleting...' : 'Yes, delete product'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductDialog;
