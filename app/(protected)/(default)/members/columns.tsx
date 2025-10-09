"use client";

// import { IconAdjustments, IconEdit, IconTrash } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
// import { Button } from "@/components/ui/button";
import type { MemberData } from "./data";

export const columns: ColumnDef<MemberData>[] = [
  // {
  //   accessorKey: "image",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Image" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="line-clamp-1 min-w-max font-medium uppercase">
  //       <Image
  //         alt="Product Image"
  //         className="max-h-[60px] rounded-lg"
  //         height={60}
  //         src={row.getValue("image")}
  //         width={60}
  //       />
  //     </div>
  //   ),
  // },
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
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "points",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Points" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {row.getValue("points")}
      </div>
    ),
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   header: () => <div>Actions</div>,
  //   cell: ({ row }) => {
  //     const { setProductState } = useProductDialog<
  //       ProductID | UpdateData | UpdateQTY
  //     >();

  //     const openDeleteDialog = () => {
  //       setProductState({
  //         open: "delete",
  //         data: {
  //           id: row.original.id,
  //         },
  //       });
  //     };

  //     const openAdjustDialog = () => {
  //       setProductState({
  //         open: "adjust",
  //         data: {
  //           id: row.original.id,
  //           name: row.original.name,
  //           currentQuantity: row.original.currentQuantity,
  //         },
  //       });
  //     };

  //     const openUpdateDialog = () => {
  //       setProductState({
  //         open: "update",
  //         data: row.original,
  //       });
  //     };

  //     return (
  //       <div className="flex items-center gap-2">
  //         <Button onClick={openUpdateDialog} size="icon" variant="outline">
  //           <IconEdit />
  //         </Button>
  //         <Button onClick={openAdjustDialog} size="icon" variant="outline">
  //           <IconAdjustments />
  //         </Button>
  //         <Button onClick={openDeleteDialog} size="icon" variant="outline">
  //           <IconTrash />
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
