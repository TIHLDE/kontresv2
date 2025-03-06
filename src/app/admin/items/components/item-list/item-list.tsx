'use client';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loadingspinner';

import { itemColumns } from './item-columns';
import { DataTable } from '@/app/admin/components/old-components/data-table';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import { BookableItem } from '@prisma/client';
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';

interface ItemListProps {
    items: BookableItem[];
}
export default function ItemList({ items }: ItemListProps) {
    const [filters] = useQueryStates({
        groups: parseAsArrayOf<string>(parseAsString).withDefault([]),
        items: parseAsArrayOf<string>(parseAsString).withDefault([]),
    });

    const {
        data: fetchedItems,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = api.item.getItems.useInfiniteQuery(
        {
            limit: 5,
            filters: {
                groupIds:
                    filters.groups.length > 0 ? filters.groups : undefined,
                items:
                    filters.items.length > 0
                        ? filters.items.map((i) => parseInt(i))
                        : undefined,
            },
        },
        { getNextPageParam: (lastPage) => lastPage.nextCursor },
    );

    //NOE ER FEIL MED PAGINATION; FIKS DET
    return (
        <div className={cn('flex flex-col gap-5')}>
            <div className={cn('', isFetching && 'blur-sm')}>
                <DataTable
                    columns={itemColumns}
                    data={
                        fetchedItems?.pages.flatMap((page) => page.items) ??
                        items
                    }
                    displayPageNavigation={false}
                />
            </div>
            {hasNextPage && (
                <Button
                    className="ml-auto gap-2.5 items-center"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? (
                        <>
                            <LoadingSpinner /> Henter mer
                        </>
                    ) : (
                        'Last inn mer'
                    )}
                </Button>
            )}
        </div>
    );
}
