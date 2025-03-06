'use client';

import { Card } from '@/components/ui/card';
import Filters, { FilterCallbackType } from '@/components/ui/filters/filters';

import itemFilterList, { GroupIcons } from './filter-list';
import { TimeDirection } from '@/app/admin/utils/enums';
import { groupParser } from '@/app/booking/components/SearchFilters';
import { api } from '@/trpc/react';
import { ReservationState } from '@prisma/client';
import {
    parseAsArrayOf,
    parseAsString,
    parseAsStringEnum,
    useQueryState,
} from 'nuqs';
import React, { useEffect, useState } from 'react';

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

    // Get groups and items, as they are used in the filters
    const { data: groups } = api.group.getAll.useQuery();
    const { data: items } = api.item.getItems.useQuery({});

    const [filters, setFilters] = useState<FilterCallbackType[]>([]);

    const [_, setQueryGroups] = useQueryState(
        'groups',
        groupParser.withDefault([]),
    );

    const [___, setQueryItems] = useQueryState(
        'items',
        parseAsArrayOf<string>(parseAsString),
    );

    useEffect(() => {
        // if (queryGroups || queryStates || queryItems) return;
        setQueryGroups(
            filters
                .filter((g) => g.parentValue === 'group')
                .map((g) => g.filter.value),
        );

        setQueryItems(
            filters
                .filter((g) => g.parentValue === 'item')
                .map((g) => g.filter.value),
        );
    }, [filters]);

    // Register shortcut listener
    useEffect(() => {
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

        return () => {
            window.removeEventListener('keydown', callback);
            window.removeEventListener('keydown', ignore);
        };
    }, []);

    return (
        <Filters
            open={open}
            setOpen={setOpen}
            filters={filters}
            setFilters={setFilters}
            groupIcons={GroupIcons}
            filterGroups={itemFilterList({
                groups: groups ?? [],
                items: items?.items ?? [],
            })}
            onFilterChange={(value) => {
                setOpen(false);
            }}
        />
    );
}
