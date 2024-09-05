import { DetailedItem } from '@/utils/apis/types';

import ItemActions from '../../item-actions';
import { ColumnDef } from '@tanstack/react-table';

export const itemColumns: ColumnDef<DetailedItem>[] = [
    {
        accessorKey: 'name',
        header: 'Gjenstand',
    },
    {
        accessorKey: 'description',
        header: 'Beskrivelse',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => <ItemActions item={row.original} />,
    },
];
