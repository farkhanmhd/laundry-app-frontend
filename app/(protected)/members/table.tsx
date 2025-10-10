"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DataTable from "@/components/table/data-table";
import { DataTablePagination } from "@/components/table/data-table-pagination";
import DataTableSearch from "@/components/table/data-table-search";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { useSearchQuery } from "@/hooks/use-search-query";
import AddMemberDialog from "./add-member-dialog";
import type { MemberData } from "./data";

interface MembersTableProps<TData extends MemberData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
}

const MembersTable = <TData extends MemberData, TValue>({
  columns,
  data,
  total,
}: MembersTableProps<TData, TValue>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const { udpateSearchQuery } = useSearchQuery();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      setPagination((old) => {
        const newPaginationValue =
          updater instanceof Function ? updater(old) : updater;

        const value = newPaginationValue.pageIndex + 1;
        if (value === 1) {
          params.delete("page");
        } else {
          params.set("page", String(value));
        }
        return newPaginationValue;
      });

      replace(`${pathname}?${params.toString()}`);
    },
    autoResetPageIndex: false,
    getRowId: (row) => row.id,
    manualPagination: true,
    rowCount: total,
    state: {
      pagination,
    },
  });

  const handleSearchChange = (value: string) => {
    setGlobalFilter(value);
    udpateSearchQuery(value);
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DataTableSearch
            className="min-w-xs max-w-lg"
            onChange={handleSearchChange}
            placeholder="Search Customer..."
            table={table}
            value={globalFilter}
          />
        </div>
        <div className="flex items-center gap-3">
          <DataTableViewOptions table={table} />
          <AddMemberDialog />
        </div>
      </div>

      <DataTable
        className="h-[calc(100dvh-188px)] max-w-[calc(100svw-32px)] lg:h-[calc(100dvh-220px)]"
        columns={columns}
        table={table}
      />

      <div className="mt-auto">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default MembersTable;

// h - [calc(100dvh-112px)]; max-h-[calc(100dvh-224px)]
