'use client';

import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type AdjustQuantitySchema, adjustQuantityAction } from './actions';
import { type UpdateQTY, useProductDialog } from './state';

export default function AdjustQuantityDialog() {
  const { productState, close } = useProductDialog<UpdateQTY>();

  const [formInput, setFormInput] = useState<UpdateQTY>({
    id: '',
    name: '',
    currentQuantity: 0,
    newQuantity: 0,
    reason: '',
  });

  useEffect(() => {
    if (productState?.data) {
      setFormInput({
        ...formInput,
        id: productState.data.id,
        name: `${productState.data.name} [${String(productState.data.id).toUpperCase()}]`,
        currentQuantity: productState.data.currentQuantity,
      });
    }
  }, [productState?.data]);

  const resetForm = () => {
    setFormInput({
      id: '',
      name: '',
      currentQuantity: 0,
      reason: '',
      newQuantity: 0,
    });
  };

  const { execute, isPending } = useAction(adjustQuantityAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === 'success') {
        close();
        resetForm();
      }
      toast(actionResult.data?.message);
    },
  });

  const handleInputChange = (
    field: keyof UpdateQTY,
    value: string | number | File | null
  ) => {
    setFormInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submittedData: AdjustQuantitySchema = {
      productId: formInput.id,
      newQuantity: formInput.newQuantity,
      reason: formInput.reason,
    };

    execute(submittedData);
  };

  return (
    <AlertDialog onOpenChange={close} open={productState?.open === 'adjust'}>
      <AlertDialogContent className="max-w-md p-0">
        <ScrollArea className="max-h-dvh p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle>Stock Adjustment</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details to adjust quantity of this item
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Product Name */}

            <div className="space-y-3">
              <Label htmlFor="name">Product</Label>
              <Input
                autoComplete="off"
                disabled
                id="name"
                placeholder="Enter product name"
                value={formInput.name}
              />
            </div>

            {/* Reorder Point */}
            <div className="space-y-3">
              <Label htmlFor="reorderPoint">Current Quantity</Label>
              <Input
                autoComplete="off"
                className="text-right"
                disabled
                id="currentQuantity"
                name="currentQuantity"
                placeholder="0"
                value={formInput.currentQuantity}
              />
            </div>

            {/* Reorder Point */}
            <div className="space-y-3">
              <Label htmlFor="newQuantity">New Quantity</Label>
              <Input
                autoComplete="off"
                className="text-right"
                disabled={isPending}
                id="newQuantity"
                name="newQuantity"
                onChange={(e) =>
                  handleInputChange(
                    'newQuantity',
                    Number(e.target.value.replace(/[^0-9]/g, ''))
                  )
                }
                placeholder="0"
                value={formInput.newQuantity}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="reason">Reason</Label>
              <Input
                autoComplete="off"
                disabled={isPending}
                id="reason"
                onChange={(e) => handleInputChange('reason', e.target.value)}
                placeholder="Reason"
                value={formInput.reason}
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <AlertDialogCancel disabled={isPending} onClick={resetForm}>
                Cancel
              </AlertDialogCancel>
              <Button disabled={isPending} type="submit">
                Update Product
              </Button>
            </div>
          </form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
