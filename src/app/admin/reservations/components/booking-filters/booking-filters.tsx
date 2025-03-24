'use client';

import { Card } from '@/components/ui/card';
import Filters, {
    Filter,
    FilterCallbackType,
} from '@/components/ui/filters/filters';

import reservationFilterList, { GroupIcons } from './filter-list';
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
import React, { useEffect, useState } from 'react';

export const reservationStateParser = parseAsArrayOf<ReservationState>(
    parseAsStringEnum(Object.values(ReservationState)),
);

export const timeDirectionParser = parseAsArrayOf<TimeDirection>(
    parseAsStringEnum(Object.values(TimeDirection)),
);

export default function AdminBookingFilters({
    ...props
}: React.ComponentProps<typeof Card>) {
    const [open, setOpen] = useState(false);

    // Get groups and items, as they are used in the filters
    const { data: groups } = api.group.getAll.useQuery();
    const { data: items } = api.item.getItems.useQuery({});

    const [filters, setFilters] = useState<FilterCallbackType[]>([]);
    const [queryStates, setQueryStates] = useQueryStates({
        groups: groupParser.withDefault([]),
        states: reservationStateParser.withDefault([]),
        items: parseAsArrayOf<string>(parseAsString),
        time: timeDirectionParser.withDefault([]),
    });

    useEffect(() => {
        setQueryStates({
            groups: filters
                .filter((g) => g.parentValue === 'group')
                .map((g) => g.filter.value),
            states: filters
                .filter((g) => g.parentValue === 'status')
                .map((g) => g.filter.value as ReservationState),
            items: filters
                .filter((g) => g.parentValue === 'item')
                .map((g) => g.filter.value),
            time: filters
                .filter((g) => g.parentValue === 'time')
                .map((g) => g.filter.value as TimeDirection),
        });
    }, [filters]);

    // Register shortcut listener
    useEffect(() => {
        const callback = (e: KeyboardEvent) => {
            if (!(e.ctrlKey && e.key === 'k')) return;
            setOpen((prev) => {
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
            queryParsers={{
                groups: groupParser.withDefault([]),
                states: reservationStateParser.withDefault([]),
                items: parseAsArrayOf<string>(parseAsString),
                time: timeDirectionParser.withDefault([]),
            }}
            open={open}
            setOpen={setOpen}
            groupIcons={GroupIcons}
            displayGroupIcons={true}
            filterGroups={reservationFilterList({
                groups: groups ?? [],
                items: items?.items ?? [],
            })}
            onFilterChange={() => {
                setOpen(false);
            }}
        />
    );
}
