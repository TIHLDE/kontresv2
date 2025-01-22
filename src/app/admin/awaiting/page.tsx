import BookingListByState from '../components/bookinglist-by-state';
import ReservationTableSkeleton from '../components/old-components/reservation-table-skeleton';
import { Suspense } from 'react';

export default function Awaiting() {
    return (
        <Suspense fallback={<ReservationTableSkeleton />}>
            <BookingListByState state="PENDING" />
        </Suspense>
    );
}
