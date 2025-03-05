'use client';

import { Card } from '@/components/ui/card';

import { TimeDirection } from '../../utils/enums';
import filterList from './filter-list';
import Filters, { FilterCallbackType } from './filters';
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

export default function AdminFilters({
    ...props
}: React.ComponentProps<typeof Card>) {
    const [open, setOpen] = useState(false);

    // Get groups and items, as they are used in the filters
    const { data: groups } = api.group.getAll.useQuery();
    const { data: items } = api.item.getItems.useQuery();

    const [filters, setFilters] = useState<FilterCallbackType[]>([]);

    const [_, setQueryGroups] = useQueryState(
        'groups',
        groupParser.withDefault([]),
    );

    const [__, setQueryStates] = useQueryState(
        'states',
        reservationStateParser.withDefault([]),
    );

    const [___, setQueryItems] = useQueryState(
        'items',
        parseAsArrayOf<string>(parseAsString),
    );

    const [____, setQueryTimeDirection] = useQueryState(
        'time',
        timeDirectionParser.withDefault([]),
    );

    const onFilterChange = (value: FilterCallbackType) => {
        console.log('Filter changed:', value);
    };

    useEffect(() => {
        // if (queryGroups || queryStates || queryItems) return;

        setQueryGroups(
            filters
                .filter((g) => g.parentValue === 'group')
                .map((g) => g.filter.value),
        );

        setQueryStates(
            filters
                .filter((g) => g.parentValue === 'status')
                .map((g) => g.filter.value as ReservationState),
        );

        setQueryItems(
            filters
                .filter((g) => g.parentValue === 'item')
                .map((g) => g.filter.value),
        );
        setQueryTimeDirection(
            filters
                .filter((g) => g.parentValue === 'time')
                .map((g) => g.filter.value as TimeDirection),
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
            filterGroups={filterList({
                groups: groups ?? [],
                items: items ?? [],
            })}
            onFilterChange={(value) => {
                onFilterChange(value);
                setOpen(false);
            }}
        />
    );
}
