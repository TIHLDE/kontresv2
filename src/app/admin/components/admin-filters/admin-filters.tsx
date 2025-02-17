'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import FilterButtons from './filter-buttons';
import { groupParser } from '@/app/booking/components/SearchFilters';
import { ReservationState } from '@prisma/client';
import { RotateCcw, RotateCcwIcon, X } from 'lucide-react';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import React from 'react';

interface AdminFiltersProps extends React.ComponentProps<typeof Card> {}

export default function AdminFilters({ ...props }: AdminFiltersProps) {
    const [query, setQuery] = useQueryState('q');
    const [groups, setGroups] = useQueryState(
        'groups',
        groupParser.withDefault([]),
    );
    const [state, setState] = useQueryState<ReservationState>(
        'state',
        parseAsStringEnum(Object.values(ReservationState)).withDefault(
            'APPROVED',
        ),
    );

    const clearFilters = () => {
        setQuery(null).catch(console.error);
        setGroups([]).catch(console.error);
        setState('APPROVED').catch(console.error);
    };

    return (
        <Card {...props}>
            <CardHeader className="flex flex-row justify-between items-center">
                <h2>Filtre</h2>
                <Button variant={'destructive'} onClick={clearFilters}>
                    <X />
                </Button>
            </CardHeader>
            <CardContent>
                <FilterButtons state={state} setState={setState} />
            </CardContent>
        </Card>
    );
}
