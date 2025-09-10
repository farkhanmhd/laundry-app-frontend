'use client';

import { IconPlus } from '@tabler/icons-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { toast } from 'sonner';
import ImageUploadDropzone from '@/components/image-dropzone';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { addProductAction } from './actions';
import type { AddProductBody } from './data';

interface InputFormData extends Omit<AddProductBody, 'image'> {
  image: File | null;
}

export default function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<InputFormData>({
    name: '',
    image: null,
    price: 0,
    currentQuantity: 0,
    reorderPoint: 0,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      image: null,
      price: 0,
      currentQuantity: 0,
      reorderPoint: 0,
    });
  };

  const { execute, isPending } = useAction(addProductAction, {
    onSuccess: (actionResult) => {
      if (actionResult.data?.status === 'success') {
        setOpen(false);
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

    if (!formData.image) {
      return;
    }

    execute(formData as AddProductBody);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className="h-8">
          <IconPlus />
          <span>Add Product</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md p-0">
        <ScrollArea className="max-h-dvh p-6">
          <AlertDialogHeader className="mb-6">
            <AlertDialogTitle>Add New Product</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details to add a new product to your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Product Name */}
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

            {/* Current Quantity */}
            <div className="space-y-3">
              <Label htmlFor="currentQuantity">Current Quantity</Label>
              <Input
                autoComplete="off"
                className="text-right"
                disabled={isPending}
                id="currentQuantity"
                min="0"
                name="currentQuantity"
                onChange={(e) =>
                  handleInputChange(
                    'currentQuantity',
                    Number(e.target.value.replace(/[^0-9]/g, ''))
                  )
                }
                placeholder="0"
                value={formData.currentQuantity}
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

            <ImageUploadDropzone
              image={formData.image}
              setImage={(file) => handleInputChange('image', file)}
            />

            <div className="flex items-center justify-end gap-3">
              <AlertDialogCancel disabled={isPending} onClick={resetForm}>
                Cancel
              </AlertDialogCancel>
              <Button disabled={isPending} type="submit">
                Add Product
              </Button>
            </div>
          </form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
