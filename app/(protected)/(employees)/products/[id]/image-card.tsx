"use client";

import { useState } from "react";
import ImageUploadDropzone from "@/components/image-dropzone";
import { Button } from "@/components/ui/button";

export const ImageCard = ({
  productId,
  image = "/placeholder.svg",
}: {
  productId: string;
  image: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState<string | File | undefined | null>(
    image
  );

  return (
    <div className="w-full">
      <h2 className="mb-1 font-semibold text-xl">Image</h2>
      <p className="mb-6 text-muted-foreground text-sm">
        Upload a new image for this product. This will be displayed on the
        product page.
      </p>
      <div className="flex w-full flex-col items-center gap-4">
        <div className="w-full max-w-md">
          <ImageUploadDropzone
            disabled={!isEditing}
            hideLabel={false}
            image={newImage}
            setImage={setNewImage}
          />
        </div>
        {isEditing ? (
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setIsEditing(false);
                setNewImage(image);
              }}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>
    </div>
  );
};
