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
import { Button } from "@/components/ui/button";
import {
  useSearchQueryParams,
  useTablePaginationSearchParams,
} from "@/lib/search-params";
import { cn } from "@/lib/utils";
import type { Voucher } from "../data";
import AddVoucherDialog from "./add-voucher-dialog";
import { DisableVoucherDialog } from "./disable-voucher-dialog";
import UpdateVoucherDialog from "./update-voucher-dialog";

interface VoucherTableProps<TData extends Voucher, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

const VoucherTable = <TData extends Voucher, TValue>({
  data = [],
  columns,
}: VoucherTableProps<TData, TValue>) => {
  const [globalFilter, setGlobalFilter] = useSearchQueryParams();
  const [pagination, setPagination] = useTablePaginationSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 lg:max-w-sm">
          <DataTableSearch
            className="w-full text-sm lg:max-w-lg"
            onChange={setGlobalFilter}
            placeholder="Search by name or code..."
            table={table}
            value={globalFilter}
          />
          {isFiltered && (
            <Button
              className="h-9 px-2 lg:px-3"
              onClick={() => {
                setGlobalFilter("");
              }}
              variant="ghost"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <AddVoucherDialog />
      </div>

      <DataTable
        className={cn(
          "max-h-[calc(100dvh-248px)] md:max-h-[calc(100dvh-184px)] lg:max-h-[calc(100dvh-216px)] [&>div]:max-h-[calc(100dvh-248px)] [&>div]:md:max-h-[calc(100dvh-184px)] [&>div]:lg:max-h-[calc(100dvh-216px)]",
          {
            "max-w-[calc(100svw-32px)] md:max-w-[calc(100svw-336px)]": open,
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
      <UpdateVoucherDialog />
      <DisableVoucherDialog />
    </div>
  );
};

export default VoucherTable;
