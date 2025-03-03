'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import FilterButtons from './filter-buttons';
import { ReservationState } from '@prisma/client';
import { X } from 'lucide-react';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import React from 'react';

interface AdminFiltersProps extends React.ComponentProps<typeof Card> {}
export enum TimeDirection {
    none = 'none',
    forward = 'forward',
    backward = 'backward',
}

export default function AdminFilters({ ...props }: AdminFiltersProps) {
    const [query, setQuery] = useQueryState('q');
    const [group, setGroup] = useQueryState('group');
    const [state, setState] = useQueryState<ReservationState>(
        'state',
        parseAsStringEnum(Object.values(ReservationState)).withDefault(
            'APPROVED',
        ),
    );
    const [timeDirection, setTimeDirection] = useQueryState(
        'timeDirection',
        parseAsStringEnum(Object.values(TimeDirection)).withDefault(
            TimeDirection.none,
        ),
    );

    const clearFilters = () => {
        setQuery('').catch(console.error);
        setGroup('').catch(console.error);
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
                <FilterButtons
                    state={state}
                    setState={setState}
                    timeDirection={timeDirection}
                    setTimeDirection={setTimeDirection}
                />
            </CardContent>
        </Card>
    );
}
