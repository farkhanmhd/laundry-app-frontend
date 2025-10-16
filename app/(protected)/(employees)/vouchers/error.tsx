"use client";

import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * An error boundary component that catches errors from the voucher page
 * and provides an option to retry the operation.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto rounded-full bg-destructive/10 p-3">
            <Terminal className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="mt-4">Oops, Something Went Wrong</CardTitle>
          <CardDescription>
            {error.message ||
              "An unexpected error occurred while loading vouchers."}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={() => reset()}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
