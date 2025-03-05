import { BookableItem } from '@prisma/client';
import { type ColumnDef } from '@tanstack/react-table';

export const itemColumns: ColumnDef<BookableItem>[] = [
    {
        accessorKey: 'name',
        header: 'Gjenstand',
    },
    {
        accessorKey: 'description',
        header: 'Beskrivelse',
    },
    // {
    //     id: 'actions',
    //     enableHiding: false,
    //     cell: ({ row }) => <ItemActions item={row.original} />,
    // },
];
