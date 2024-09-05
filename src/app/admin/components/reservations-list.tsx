import { getReservations } from '@/utils/apis/reservations';

import ReservationTable from '../../../components/ui/reservation-table';

const ReservationsList = async () => {
    let reservations;
    try {
        reservations = await getReservations();
    } catch (e) {}
    return <ReservationTable data={reservations ?? []} />;
};

export default ReservationsList;
