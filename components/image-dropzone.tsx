'use client';

import { File, FilePenLine, Trash, Upload } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Props = {
  label?: string;
  image: string | File | null;
  setImage: (image: File | null) => void;
  id?: string;
  hideLabel?: boolean;
  error?: string[];
};

const ImageUploadDropzone: React.FC<Props> = ({
  label,
  image,
  setImage,
  id,
  hideLabel,
  error,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const previewUrl = useMemo(() => {
    if (typeof image === 'string') {
      return image;
    }

    if (
      image &&
      typeof image === 'object' &&
      'name' in image &&
      'size' in image
    ) {
      return URL.createObjectURL(image);
    }

    return null;
  }, [image]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setFileName(file.name);
        setImage(file);
      }
    },
    [setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  const removeImage = useCallback(() => {
    setImage(null);
    setFileName(null);
  }, [setImage]);

  return (
    <div className="mx-auto w-full">
      {label && (
        <Label
          className={cn('mb-4 flex gap-x-2 font-semibold', {
            'sr-only': hideLabel,
          })}
          htmlFor={id}
        >
          <span>{label}</span>
          {error && (
            <span className="text-red-500">
              {error.map((errMsg) => `* ${errMsg}`).join(', ') || '*'}
            </span>
          )}
        </Label>
      )}
      <div
        {...getRootProps()}
        className={cn(
          'flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
          image ? 'bg-secondary' : 'cursor-pointer'
        )}
      >
        {image ? (
          <div className="group relative w-full">
            <Image
              alt="Uploaded"
              className="h-auto w-full rounded-lg"
              height={300}
              src={previewUrl as string}
              width={300}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 duration-200 group-hover:opacity-100">
              <div className="flex space-x-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('image-upload')?.click();
                  }}
                  size="sm"
                  type="button"
                  variant="secondary"
                >
                  <FilePenLine className="mr-2 h-4 w-4" />
                  Replace
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  size="sm"
                  type="button"
                  variant="destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Upload className="mb-3 h-12 w-12 text-gray-400" />
            <p className="text-gray-600 text-sm">
              Click or drag and drop to upload image
            </p>
          </>
        )}
        <input {...getInputProps()} id="image-upload" />
        {fileName && (
          <div className="mt-4 flex items-center text-gray-500 text-sm">
            <File className="mr-2 h-4 w-4" />
            <span className="font-medium">{fileName}</span>
            <span className="ml-2">(1 file)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadDropzone;
