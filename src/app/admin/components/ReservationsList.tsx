import { getReservations } from '@/utils/apis/reservations';

import ReservationTable from './ReservationTable';
import { Suspense } from 'react';

const ReservationsList = async () => {
    const reservations = await getReservations();
    return <ReservationTable data={reservations} />;
};

export default ReservationsList;
