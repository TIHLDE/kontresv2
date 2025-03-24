'use client';

import { Card } from '@/components/ui/card';
import Filters, {
    Filter,
    FilterCallbackType,
} from '@/components/ui/filters/filters';
import { Skeleton } from '@/components/ui/skeleton';

import itemFilterList, { GroupIcons } from './filter-list';
import { TimeDirection } from '@/app/admin/utils/enums';
import { groupParser } from '@/app/booking/components/SearchFilters';
import { api } from '@/trpc/react';
import { ReservationState } from '@prisma/client';
import {
    parseAsArrayOf,
    parseAsString,
    parseAsStringEnum,
    useQueryStates,
} from 'nuqs';
import React, { useEffect, useMemo, useState } from 'react';

export const reservationStateParser = parseAsArrayOf<ReservationState>(
    parseAsStringEnum(Object.values(ReservationState)),
);

export const timeDirectionParser = parseAsArrayOf<TimeDirection>(
    parseAsStringEnum(Object.values(TimeDirection)),
);

export default function AdminItemFilters({
    ...props
}: React.ComponentProps<typeof Card>) {
    const [open, setOpen] = useState(false);
    const [filterQueries, setFilterQueries] = useQueryStates({
        groups: groupParser.withDefault([]),
        items: parseAsArrayOf<string>(parseAsString).withDefault([]),
    });
    const { data: existingGroups } = api.group.getAll.useQuery();
    const { data: existingItems } = api.item.getItems.useQuery({});

    const filters = useMemo<Filter[]>(() => {
        return [
            ...filterQueries.groups.map(
                (group) =>
                    ({
                        name:
                            existingGroups?.find((g) => g.groupId === group)
                                ?.name ?? 'Ukjent gruppe',
                        value: group,
                        icon: GroupIcons['group'],
                    }) as Filter,
            ),
            ...filterQueries.items.map((item) => {
                return {
                    name:
                        existingItems?.items.find(
                            (i) => i.itemId === parseInt(item),
                        )?.name ?? 'Ukjent gjenstand',
                    value: item,
                    icon: GroupIcons['item'],
                };
            }),
        ] as Filter[];
    }, [filterQueries, existingGroups, existingItems]);

    // Get groups and items, as they are used in the filters
    const { data: groups } = api.group.getAll.useQuery();
    const { data: items } = api.item.getItems.useQuery({});

    // Register shortcut listener
    useEffect(() => {
        console.log(filterQueries.groups);
        const callback = (e: KeyboardEvent) => {
            if (!(e.ctrlKey && e.key === 'k')) return;

            setOpen((prev) => {
                console.log('Setting open to', !prev);
                return !prev;
            });
        };

        const ignore = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', ignore);

        window.addEventListener('keydown', callback);

        // Calculate the initial filter values

        return () => {
            window.removeEventListener('keydown', callback);
            window.removeEventListener('keydown', ignore);
        };
    }, []);

    const onFilterChange = (filters: FilterCallbackType[]) => {
        console.log(filters);
        setFilterQueries({
            groups: filters
                .filter((f) => f.parentValue === 'group')
                .map((f) => f.filter.value),
            items: filters
                .filter((f) => f.parentValue === 'item')
                .map((f) => f.filter.value),
        });
    };

    return (
        <>
            {existingGroups && existingItems && (
                <Filters
                    open={open}
                    setOpen={setOpen}
                    defaultValues={filters}
                    queryParsers={{
                        groups: groupParser.withDefault([]),
                        items: parseAsArrayOf<string>(parseAsString),
                    }}
                    groupIcons={GroupIcons}
                    filterGroups={itemFilterList({
                        groups: groups ?? [],
                        items: items?.items ?? [],
                    })}
                    onFilterChange={(value) => {
                        onFilterChange(value);
                        setOpen(false);
                    }}
                />
            )}
            {!existingGroups && !existingItems && <FilterSkeleton />}
        </>
    );
}

const FilterSkeleton = () => {
    return (
        <div className="flex gap-2 items-center">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-20 h-5" />
        </div>
    );
};
