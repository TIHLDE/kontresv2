import { getItems } from '@/utils/apis/items';
import { getReservations } from '@/utils/apis/reservations';

import ReservationsTable from './components/Filters/components/reservations-table';
import Filters from './components/Filters/filters';
import { cn } from '@/lib/utils';
import React from 'react';

interface FilteredTableProps extends React.HTMLProps<HTMLDivElement> {}
const FilteredTable = async ({ className, ...props }: FilteredTableProps) => {
    let reservations;
    try {
        reservations = await getReservations();
    } catch (e) {}
    return (
        <div
            className={cn(
                'w-full grid lg:grid-cols-[3fr_1fr] grid-cols-1 gap-5',
                className,
            )}
            {...props}
        >
            <ReservationsTable reservations={reservations ?? []} />
            <Filters />
        </div>
    );
};

export default FilteredTable;
