'use client';

import { getReservations } from '@/utils/apis/reservations';
import { type DetailedReservation } from '@/utils/apis/types';

import { DataTable } from '../../app/admin/components/data-table';
import { reservationColumns } from '../../app/admin/components/reservation-columns';
import { useRouter } from 'next/navigation';

const ReservationTable = ({ data }: { data: DetailedReservation[] }) => {
    const router = useRouter();

    const rowClickCallback = (data: DetailedReservation) => {
        router.push(`/reservasjon/${data.id}/`);
    };

    const rejectedReservations = data.filter(
        (reservation) => reservation.state === 'CANCELLED',
    );

    const pendingReservations = data.filter(
        (reservation) => reservation.state === 'PENDING',
    );

    const acceptedReservations = data.filter(
        (reservation) => reservation.state === 'CONFIRMED',
    );

    const allReservations = [
        {
            title: 'Godkjente søknader',
            data: acceptedReservations,
        },
        {
            title: 'Avventende søknader',
            data: pendingReservations,
        },
        {
            title: 'Avslåtte søknader',
            data: rejectedReservations,
        },
    ];

    return (
        <div className="flex flex-col gap-5 mt-10">
            {allReservations.map((reservation, index) => (
                <div key={index}>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">
                        {reservation.title}
                    </h3>
                    <DataTable
                        searchPlaceholder={'Søk etter brukere...'}
                        search={true}
                        columns={reservationColumns}
                        data={reservation.data}
                        filterProperty={'author_detail'}
                        rowClickCallback={rowClickCallback}
                    />
                </div>
            ))}
        </div>
    );
};

export default ReservationTable;
