"use client";

import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { UpdateVoucherSchema } from "./actions";
import type { Voucher } from "./data";
import { type UpdateData, useVoucherDialog, type VoucherID } from "./state";

export const columns: ColumnDef<Voucher>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        {row.getValue("code")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "discountAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {formatCurrency(row.getValue("discountAmount"))}
      </div>
    ),
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiry" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("expiresAt"));
      const formattedDate = format(date, "PP, HH:mm");
      return (
        <div className="line-clamp-1 min-w-max font-medium">
          {formattedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = format(date, "PP, HH:mm");
      return (
        <div className="line-clamp-1 min-w-max font-medium">
          {formattedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const active = row.original.isActive;
      return (
        <div className="min-w-max font-medium uppercase">
          <Badge className="font-bold" variant={active ? "default" : "outline"}>
            {active ? "Active" : "Expired"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "isVisible",
    header: () => <div>Visibility</div>,
    cell: ({ row }) => {
      const active = row.original.isVisible;
      return (
        <div className="min-w-max font-medium uppercase">
          <Badge className="font-bold" variant={active ? "default" : "outline"}>
            {active ? "Visible" : "Hidden"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      const { setVoucherState } = useVoucherDialog<VoucherID | UpdateData>();

      const openDeleteDialog = () => {
        setVoucherState({
          open: "delete",
          data: {
            id: row.original.id,
          },
        });
      };

      const openUpdateDialog = () => {
        setVoucherState({
          open: "update",
          data: row.original,
        });
      };

      return (
        <div className="flex items-center gap-2">
          <Button onClick={openUpdateDialog} size="icon" variant="outline">
            <IconEdit />
          </Button>
          <Button onClick={openDeleteDialog} size="icon" variant="outline">
            <IconTrash />
          </Button>
        </div>
      );
    },
  },
];
