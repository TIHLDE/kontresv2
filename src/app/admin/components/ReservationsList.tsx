import { getReservations } from '@/utils/apis/reservations';

import ReservationTable from './ReservationTable';
import { Suspense } from 'react';

const ReservationsList = async () => {
    let reservations;
    try {
        reservations = await getReservations();
    } catch (e) {}
    return <ReservationTable data={reservations ?? []} />;
};

export default ReservationsList;
