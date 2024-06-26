import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DetailedItem } from '@/utils/apis/types';

import ItemActions from './item-actions';
import { HeaderButton } from './reservation-columns';
import { DialogTitle } from '@radix-ui/react-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Delete, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { Row } from 'react-day-picker';

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
