'use client';

import { TimeDirection } from '../components/admin-filters/admin-filters';
import BookingList from '../components/booking-list/booking-list';
import ReservationTableSkeleton from '../components/old-components/reservation-table-skeleton';
import { api } from '@/trpc/react';
import { ReservationState } from '@prisma/client';
import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';
import { Suspense, useEffect } from 'react';

export default function Approved() {
    const [filters] = useQueryStates({
        q: parseAsString,
        group: parseAsString,
        fromDate: parseAsString,
        toDate: parseAsString,
        state: parseAsStringEnum(Object.values(ReservationState)),
        timeDirection: parseAsStringEnum(Object.values(TimeDirection)),
    });

    // Fetch the reservations based on filter params
    const { data } = api.reservation.getReservations.useQuery(
        {
            direction: 'forward',
            filters: {
                fromDate:
                    filters.timeDirection === TimeDirection.forward
                        ? new Date().toISOString()
                        : undefined,
                toDate:
                    filters.timeDirection === TimeDirection.backward
                        ? new Date().toISOString()
                        : undefined,
                state: filters.state ?? undefined,
                group: filters.group ?? undefined,
            },
        },
        {
            retry: false,
        },
    );

    return (
        <Suspense fallback={<ReservationTableSkeleton />}>
            <BookingList items={data?.reservations ?? []} />
        </Suspense>
    );
}
