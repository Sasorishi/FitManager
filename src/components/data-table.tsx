"use client";

import * as React from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconDotsVertical, IconGripVertical } from "@tabler/icons-react";
import {
  ColumnDef,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Loader from "@/components/loader";

// Définition du schéma des données
export const schema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  goal: z.string(),
  created_at: z.string(),
});

// Composant pour la poignée de drag & drop
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button {...attributes} {...listeners} variant="ghost" size="icon">
      <IconGripVertical />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// Colonnes du tableau
function getColumns({
  setClientToDelete,
  setIsModalOpen,
}: {
  setClientToDelete: (client: z.infer<typeof schema> | null) => void;
  setIsModalOpen: (open: boolean) => void;
}): ColumnDef<z.infer<typeof schema>>[] {
  return [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.index} />,
    },
    {
      accessorKey: "first_name",
      header: "Firstname",
    },
    {
      accessorKey: "last_name",
      header: "Lastname",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "goal",
      header: "Goal",
    },
    {
      accessorKey: "created_at",
      header: "Created at",
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setClientToDelete(row.original);
                setIsModalOpen(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}

// Composant pour chaque ligne draggable
function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      data-dragging={isDragging}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

// Composant principal
export function DataTable({
  data: initialData,
}: {
  data?: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState<z.infer<typeof schema>[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State for modal visibility
  const [clientToDelete, setClientToDelete] = React.useState<z.infer<
    typeof schema
  > | null>(null); // State for the client to delete

  // Fetch des données
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        const clients = await response.json();
        setData(clients);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns: React.useMemo(
      () => getColumns({ setClientToDelete, setIsModalOpen }),
      [setClientToDelete, setIsModalOpen],
    ),
    state: { sorting, columnVisibility },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const deleteClient = async (clientId: string) => {
    try {
      const response = await fetch(`/api/users?id=${clientId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete client");
      }
      // Optionally, you can show a success message or toast here
    } catch (error) {
      console.error("Error deleting client:", error);
      // Optionally, handle the error (e.g., show a toast notification)
    }
  };

  if (loading) return <Loader />;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setData((data) => {
        const oldIndex = data.findIndex(({ id }) => id === active.id);
        const newIndex = data.findIndex(({ id }) => id === over?.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              <SortableContext
                items={data.map(({ id }) => id)}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </SortableContext>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getHeaderGroups()[0]?.headers.length || 0}
                  className="text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DndContext>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {clientToDelete?.first_name}{" "}
              {clientToDelete?.last_name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={async () => {
                if (clientToDelete) {
                  await deleteClient(clientToDelete.id); // Call the DELETE function
                  setData((prevData) =>
                    prevData.filter(
                      (client) => client.id !== clientToDelete.id,
                    ),
                  ); // Update the state
                }
                setIsModalOpen(false); // Close the modal
              }}
            >
              Confirm
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
