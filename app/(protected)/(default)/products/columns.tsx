'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { formatCurrency } from '@/lib/utils';
import type { ProductData } from './data';

export const columns: ColumnDef<ProductData>[] = [
  {
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="image" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        <Image
          alt="Product Image"
          className="max-h-[60px] rounded-lg"
          height={60}
          src={row.getValue('image')}
          width={60}
        />
      </div>
    ),
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        {row.getValue('id')}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {formatCurrency(row.getValue('price'))}
      </div>
    ),
  },
  {
    accessorKey: 'currentQuantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Current Quantity" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        {row.getValue('currentQuantity')}
      </div>
    ),
  },
];
