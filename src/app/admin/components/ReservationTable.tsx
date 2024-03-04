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

    return (
        <DataTable
            searchPlaceholder={'Søk etter brukere...'}
            search={true}
            columns={reservationColumns}
            data={data}
            rowClickCallback={rowClickCallback}
        />
    );
};

export default ReservationTable;
