'use client';

import { Button, ButtonProps } from '@/components/ui/button';

import { DetailedReservation, ReservationState } from '@/utils/apis/types';
import { cn } from '@/utils/cn';

import { stateMap } from '@/app/reservasjon/[id]/components/ReservationMeta';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { ArrowUpDown } from 'lucide-react';

const dateSortingFn = (a: DetailedReservation, b: DetailedReservation) =>
    new Date(a.start_time) > new Date(b.start_time) ? 1 : -1;

export const HeaderButton = ({ className, ...props }: ButtonProps) => {
    return (
        <Button
            className={cn('px-0 hover:bg-transparent', className)}
            {...props}
        />
    );
};

export const reservationColumns: ColumnDef<DetailedReservation>[] = [
    {
        accessorKey: 'author_detail',
        accessorFn: (data) => {
            return (
                data?.author_detail?.first_name +
                ' ' +
                data?.author_detail?.last_name
            );
        },
        header: 'Bruker',
    },
    {
        accessorKey: 'bookable_item_detail',
        header: ({ column }) => {
            return (
                <HeaderButton
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == 'asc')
                    }
                >
                    Gjenstand
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </HeaderButton>
            );
        },
        accessorFn: (data) => data?.bookable_item_detail?.name,
    },
    {
        accessorKey: 'start_time',
        header: ({ column }) => {
            return (
                <HeaderButton
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == 'asc')
                    }
                >
                    Start
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </HeaderButton>
            );
        },
        accessorFn: (data) =>
            format(data.start_time, 'd. LLLL HH:mm', {
                locale: nb,
            }),
        sortingFn: (a, b) => dateSortingFn(a.original, b.original),
    },

    {
        accessorKey: 'end_time',
        header: ({ column }) => {
            return (
                <HeaderButton
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == 'asc')
                    }
                >
                    Slutt
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </HeaderButton>
            );
        },
        accessorFn: (data) =>
            format(data.end_time, 'd. LLLL HH:mm', {
                locale: nb,
            }),
        sortingFn: (a, b) => dateSortingFn(a.original, b.original),
    },
    {
        accessorKey: 'state',
        cell: (data) => (
            <StatusLabel status={data.cell.getValue() as ReservationState} />
        ),
        header: ({ column }) => {
            return (
                <HeaderButton
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == 'asc')
                    }
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </HeaderButton>
            );
        },
    },
];

const StatusLabel = ({ status }: { status: ReservationState }) => {
    const colors: { [STATE in ReservationState]: string } = {
        CANCELLED: 'text-red-500',
        PENDING: 'text-yellow-500',
        CONFIRMED: 'text-green-500',
    };
    return (
        <p className={cn(colors[status], 'font-medium')}>{stateMap[status]}</p>
    );
};
