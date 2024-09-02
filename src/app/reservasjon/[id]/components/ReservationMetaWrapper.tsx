import { getReservation } from '@/utils/apis/reservations';
import { BaseGroup } from '@/utils/apis/types';

import ReservationMeta from './ReservationMeta';

const ReservationMetaWrapper = async ({
    params,
}: {
    params: { id: string };
}) => {
    const reservation = await getReservation(params.id);
    console.log(reservation);
    const from = new Date(reservation.start_time);
    const to = new Date(reservation.end_time);
    return (
        <ReservationMeta
            from={from.toISOString()}
            to={to.toISOString()}
            group={reservation.group_detail as BaseGroup}
            state={reservation.state}
            user={reservation.author_detail}
            soberWatch={reservation.sober_watch}
            approvedBy={reservation.approved_by}
        />
    );
};

export default ReservationMetaWrapper;
