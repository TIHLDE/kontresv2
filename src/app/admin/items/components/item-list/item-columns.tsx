import { AppRouter } from '@/server/api/root';

import { BookableItem } from '@prisma/client';
import { type ColumnDef } from '@tanstack/react-table';
import { inferProcedureOutput } from '@trpc/server';

type GetItemsOutput = inferProcedureOutput<AppRouter['item']['getItems']>;

export const itemColumns: ColumnDef<GetItemsOutput['items'][0]>[] = [
    {
        accessorKey: 'name',
        header: 'Gjenstand',
    },
    {
        accessorKey: 'description',
        header: 'Beskrivelse',
    },
    {
        accessorKey: 'group',
        header: 'Gruppe',
        accessorFn: ({ group }) => group.name,
    },
    // {
    //     id: 'actions',
    //     enableHiding: false,
    //     cell: ({ row }) => <ItemActions item={row.original} />,
    // },
];
