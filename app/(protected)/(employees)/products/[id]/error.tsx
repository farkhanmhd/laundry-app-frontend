"use client";

import { Ban } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Alert className="mx-auto max-w-md" variant="destructive">
        <Ban className="stroke-red-500" />
        <AlertTitle>Product Not Found</AlertTitle>
        <AlertDescription>
          The product you are looking for does not exist or has been removed.
        </AlertDescription>
      </Alert>
    </div>
  );
}
