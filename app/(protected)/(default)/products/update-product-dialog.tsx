'use client';

import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ImageUploadDropzone from '@/components/image-dropzone';
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
import { updateProductAction } from './actions';
import type { AddProductBody } from './data';
import { type UpdateData, useProductDialog } from './state';

interface InputFormData
  extends Omit<AddProductBody, 'image' | 'currentQuantity'> {
  id: string;
  image?: File | string | null;
}

export default function UpdateProductDialog() {
  const { productState, close } = useProductDialog<UpdateData>();

  const [formData, setFormData] = useState<InputFormData>({
    id: '',
    name: '',
    image: null,
    price: 0,
    reorderPoint: 0,
  });

  useEffect(() => {
    if (productState?.data) {
      setFormData({
        id: productState.data.id,
        name: productState.data.name,
        price: productState.data.price,
        reorderPoint: productState.data.reorderPoint,
        image: productState.data.image,
      });
    }
  }, [productState?.data]);

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      image: null,
      price: 0,
      reorderPoint: 0,
    });
  };

  const { execute, isPending } = useAction(updateProductAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === 'success') {
        close();
        resetForm();
      }
      toast(actionResult.data?.message);
    },
  });

  const handleInputChange = (
    field: keyof AddProductBody,
    value: string | number | File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { image, ...restOfData } = formData;

    if (image instanceof File) {
      execute({ ...restOfData, image });
    } else {
      execute(restOfData);
    }
  };

  return (
    <AlertDialog onOpenChange={close} open={productState?.open === 'update'}>
      <AlertDialogContent className="max-w-xl p-0">
        <ScrollArea className="max-h-dvh p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle>Update Product</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details to update this product data
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Product Name */}
            <ImageUploadDropzone
              image={formData.image!}
              setImage={(file) => handleInputChange('image', file)}
            />

            <div className="space-y-3">
              <Label htmlFor="name">Product Name</Label>
              <Input
                autoComplete="off"
                disabled={isPending}
                id="name"
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter product name"
                value={formData.name}
              />
            </div>

            {/* Price */}
            <div className="space-y-3">
              <Label htmlFor="price">Price</Label>
              <Input
                autoComplete="off"
                className="text-right"
                disabled={isPending}
                id="price"
                min="0"
                name="price"
                onChange={(e) =>
                  handleInputChange(
                    'price',
                    Number(e.target.value.replace(/[^0-9]/g, ''))
                  )
                }
                placeholder="0"
                value={formData.price}
              />
            </div>

            {/* Reorder Point */}
            <div className="space-y-3">
              <Label htmlFor="reorderPoint">Reorder Point</Label>
              <Input
                autoComplete="off"
                className="text-right"
                disabled={isPending}
                id="reorderPoint"
                name="reorderPoint"
                onChange={(e) =>
                  handleInputChange(
                    'reorderPoint',
                    Number(e.target.value.replace(/[^0-9]/g, ''))
                  )
                }
                placeholder="0"
                value={formData.reorderPoint}
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
