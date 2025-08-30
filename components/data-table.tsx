import {
  type ColumnDef,
  flexRender,
  type Table as TableType,
} from '@tanstack/react-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

type Props<TData, TValue> = {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  className: string;
  selectableRows?: boolean;
};

const DataTable = <TData, TValue>({
  table,
  columns,
  className,
  selectableRows,
}: Props<TData, TValue>) => {
  return (
    <ScrollArea className={cn('rounded-md border', className)}>
      <Table className="overflow-hidden">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={cn({
                  'cursor-pointer': selectableRows,
                })}
                data-state={row.getIsSelected() && 'selected'}
                key={row.id}
                onClick={() => selectableRows && row.toggleSelected()}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-16 text-center" colSpan={columns.length}>
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DataTable;
