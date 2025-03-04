'use client';

import { Card } from '@/components/ui/card';

import filterList from './filter-list';
import Filters, { FilterCallbackType } from './filters';
import { api } from '@/trpc/react';
import React, { useEffect, useState } from 'react';

export enum TimeDirection {
    none = 'none',
    forward = 'forward',
    backward = 'backward',
}

export default function AdminFilters({
    ...props
}: React.ComponentProps<typeof Card>) {
    const [open, setOpen] = useState(false);
    const { data: groups } = api.group.getAll.useQuery();
    const { data: items } = api.item.getItems.useQuery();
    const [filters, setFilters] = useState<FilterCallbackType[]>([]);

    const onFilterChange = (value: FilterCallbackType) => {
        console.log('Filter changed:', value);
    };

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
