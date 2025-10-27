"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import { useState } from "react";
import { useSidebar } from "@/components/animate-ui/components/radix/sidebar";
import DataTable from "@/components/table/data-table";
import { DataTablePagination } from "@/components/table/data-table-pagination";
import DataTableSearch from "@/components/table/data-table-search";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import {
  useSearchQueryParams,
  useTablePaginationSearchParams,
} from "@/lib/search-params";
import { cn } from "@/lib/utils";
import AddServiceDialog from "./add-service-dialog";
import type { ServiceData } from "./data";
import DeleteServiceDialog from "./delete-service-dialog";
import UpdateServiceDialog from "./update-service-dialog";

interface ServicesTableProps<TData extends ServiceData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const ServicesTable = <TData extends ServiceData, TValue>({
  columns,
  data = [],
}: ServicesTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useSearchQueryParams();
  const [pagination, setPagination] = useTablePaginationSearchParams();
  const { open } = useSidebar();
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
    onPaginationChange: setPagination,
    autoResetPageIndex: true,
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0 || globalFilter;

  return (
    <div className="flex h-full flex-col gap-4 lg:gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DataTableSearch
            className="min-w-xs max-w-lg"
            onChange={setGlobalFilter}
            placeholder="Search Services..."
            table={table}
            value={globalFilter}
          />
          {isFiltered && (
            <Button
              className="h-8 px-2 lg:px-3"
              onClick={() => {
                table.resetColumnFilters();
                setGlobalFilter("");
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
          <AddServiceDialog />
        </div>
      </div>

      <DataTable
        className={cn(
          "max-h-[calc(100dvh-188px)] lg:max-h-[calc(100dvh-220px)]",
          {
            "max-w-[calc(100svw-336px)]": open,
            "max-w-[calc(100svw-32px)] md:max-w-[calc(100svw-98px)] lg:max-w-[calc(100svw-114px)]":
              !open,
          }
        )}
        columns={columns}
        table={table}
      />

      <div className="mt-auto">
        <DataTablePagination table={table} />
      </div>
      <UpdateServiceDialog />
      <DeleteServiceDialog />
    </div>
  );
};

export default ServicesTable;
