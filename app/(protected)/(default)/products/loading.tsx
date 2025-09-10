import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MapItems } from '@/lib/utils';

const Loading = () => {
  const arrays = Array.from({ length: 5 });

  return (
    <div className="p-4">
      <div className="mb-0 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 min-w-xs max-w-lg" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <ScrollArea className="rounded-md border">
          <Table>
            <TableHeader className="sticky top-0 z-50 bg-background">
              <TableRow>
                <MapItems
                  of={arrays}
                  render={(_, thIndex) => (
                    <TableHead key={`thi-${thIndex}`}>
                      <Skeleton className="h-8" />
                    </TableHead>
                  )}
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              <MapItems
                of={arrays}
                render={(_, tbIndex) => (
                  <TableRow key={`thi-${tbIndex}`}>
                    <MapItems
                      of={arrays}
                      render={(_, trIndex) => (
                        <TableCell key={`thi-${trIndex}`}>
                          <Skeleton className="h-15" />
                        </TableCell>
                      )}
                    />
                  </TableRow>
                )}
              />
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Loading;
