import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card
      aria-busy="true"
      aria-roledescription="button"
      className="aspect-square cursor-default border-none p-3 shadow-none"
    >
      <CardContent className="flex flex-1 flex-col justify-between gap-2 px-0">
        {/* Image placeholder */}
        <Skeleton className="aspect-square max-h-[300px] rounded-md" />

        {/* Footer placeholders: name and price */}
        <CardFooter className="flex h-[28px] items-center justify-between gap-2 p-0">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-5 w-16" />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
