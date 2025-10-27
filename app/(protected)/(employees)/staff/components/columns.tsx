"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Staff } from "../data";

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "image",
  },
  {
    accessorKey: "id",
  },
  {
    accessorKey: "name",
  },
  {
    accessorKey: "username",
  },
  {
    accessorKey: "createdAt",
  },
  {
    accessorKey: "updatedAt",
  },
];
