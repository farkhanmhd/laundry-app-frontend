'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useState } from 'react';
import DataTable from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import DataTableSearch from '@/components/table/data-table-search';
import { DataTableViewOptions } from '@/components/table/data-table-view-options';
import { Button } from '@/components/ui/button';
import {
  useSearchQueryParams,
  useTablePaginationSearchParams,
} from '@/lib/search-params';
import AddProductDialog from './add-product-dialog';
import AdjustQuantityDialog from './adjust-quantity-dialog';
import type { ProductData } from './data';
import DeleteProductDialog from './delete-product-dialog';
import UpdateProductDialog from './update-product-dialog';

interface ProductsTableProps<TData extends ProductData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const ProductsTable = <TData extends ProductData, TValue>({
  columns,
  data,
}: ProductsTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useSearchQueryParams();
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useTablePaginationSearchParams();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      pagination,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0 || globalFilter;

  return (
    <div className="mb-0 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DataTableSearch
            className="min-w-xs max-w-lg"
            onChange={setGlobalFilter}
            placeholder="Search Products..."
            table={table}
            value={globalFilter}
          />
          {isFiltered && (
            <Button
              className="h-8 px-2 lg:px-3"
              onClick={() => {
                table.resetColumnFilters();
                setGlobalFilter('');
              }}
              variant="ghost"
            >
              Reset
              <X />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <DataTableViewOptions table={table} />
          <AddProductDialog />
        </div>
      </div>

      <DataTable
        className="max-h-[calc(100dvh-218px)] max-w-[calc(100svw-32px)]"
        columns={columns}
        table={table}
      />

      <DataTablePagination table={table} />
      <UpdateProductDialog />
      <AdjustQuantityDialog />
      <DeleteProductDialog />
    </div>
  );
};

export default ProductsTable;
