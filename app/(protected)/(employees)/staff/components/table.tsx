"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import DataTableSearch from "@/components/table/data-table-search";
import { Button } from "@/components/ui/button";
import { useSearchQueryParams } from "@/lib/search-params";
import type { Staff } from "../data";
import StaffCard from "./staff-card";

interface StaffCardProps<TData extends Staff, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

const StaffCards = <TData extends Staff, TValue>({
  data = [],
  columns,
}: StaffCardProps<TData, TValue>) => {
  const [globalFilter, setGlobalFilter] = useSearchQueryParams();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    autoResetPageIndex: true,
    getRowId: (row) => row.id,
    state: {
      globalFilter,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0 || globalFilter;

  return (
    <div className="flex h-full flex-col gap-4 lg:gap-6">
      <div className="flex w-full items-center gap-2">
        <DataTableSearch
          className="w-full"
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

      <div className="grid grid-cols-4 gap-6">
        {table.getRowModel().rows?.map((row) => (
          <StaffCard key={row.original.id} staff={row.original} />
        ))}
      </div>
    </div>
  );
};

export default StaffCards;
