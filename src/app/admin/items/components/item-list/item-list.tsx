'use client';

import { AppRouter } from '@/server/api/root';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loadingspinner';

import { itemColumns } from './item-columns';
import { DataTable } from '@/app/admin/components/old-components/data-table';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import { inferProcedureOutput } from '@trpc/server';
import { useRouter } from 'next/navigation';
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';

type GetItemsOutput = inferProcedureOutput<
    AppRouter['item']['getItems']
>['items'][0];

interface ItemListProps {
    items: GetItemsOutput[];
}

export default function ItemList({ items }: ItemListProps) {
    const router = useRouter();

    const handleRowClick = (item: GetItemsOutput) => {
        router.push(`/booking/${item.itemId}`);
    };

    //NOE ER FEIL MED PAGINATION; FIKS DET
    return (
        <DataTable
            columns={itemColumns}
            data={items}
            displayPageNavigation={false}
        />
    );
}
