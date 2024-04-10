'use client';

import { getReservations } from '@/utils/apis/reservations';
import { DetailedReservation } from '@/utils/apis/types';



import { DataTable } from './data-table';
import { reservationColumns } from './reservationColumns';
import { useRouter } from 'next/navigation';

const ReservationTable = ({ data }: { data: DetailedReservation[] }) => {
    const router = useRouter();

    const rowClickCallback = (data: DetailedReservation) => {
        router.push(`/reservasjon/${data.id}/`);
    };

    const rejectedReservations = data.filter(
        (reservation) => reservation.state === 'CANCELLED',
    );

    const otherReservations = data.filter(
        (reservation) => reservation.state !== 'CANCELLED',
    );

    return (
        <div className="flex flex-col gap-5">
            <div className="mt-10">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                    Godkjente og pågående søknader
                </h3>
                <DataTable
                    searchPlaceholder={'Søk etter brukere...'}
                    search={true}
                    columns={reservationColumns}
                    data={otherReservations}
                    filterProperty="author_detail"
                    rowClickCallback={rowClickCallback}
                />
            </div>

            <div>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                    Avslåtte søknader
                </h3>
                <DataTable
                    searchPlaceholder={'Søk etter brukere...'}
                    search={true}
                    columns={reservationColumns}
                    data={rejectedReservations}
                    filterProperty="author_detail"
                    rowClickCallback={rowClickCallback}
                />
            </div>
        </div>
    );
};

export default ReservationTable;