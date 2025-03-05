import { type ReservationWithAuthor } from '@/server/dtos/reservations';

import { DataTable } from '../old-components/data-table';
import { columns } from './columns';

interface BookingListProps {
    items: ReservationWithAuthor[];
}

export default function BookingList({ items }: BookingListProps) {
    return (
        <DataTable
            columns={columns}
            data={items}
            displayPageNavigation={false}
        />
    );
}
