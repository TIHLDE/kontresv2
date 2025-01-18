'use client';

import { type ReservationWithAuthor } from '@/server/dtos/reservations';

import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ReservationWithAuthor>[] = [
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'author',
        header: 'Author',
        accessorFn: (row) => `${row.author.first_name} ${row.author.last_name}`,
    },
];
