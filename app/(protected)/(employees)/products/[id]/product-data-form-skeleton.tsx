import { Skeleton } from "@/components/ui/skeleton";

export function ProductDataFormSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center gap-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="h-5 w-56" />

      <div className="mt-4 flex flex-col gap-5">
        <div className="space-y-1.25">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-1.25">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-1.25">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-[70px] self-end" />
      </div>
    </div>
  );
}
