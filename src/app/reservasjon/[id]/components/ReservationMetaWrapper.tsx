import { type Card } from '@/components/ui/card';

import { getReservation } from '@/utils/apis/reservations';
import { type BaseGroup } from '@/utils/apis/types';

import ReservationMeta from './ReservationMeta';

interface ReservationMetaWrapperProps
    extends React.ComponentProps<typeof Card> {
    params: { id: string };
}
const ReservationMetaWrapper = async ({
    params,
    ...props
}: ReservationMetaWrapperProps) => {
    const reservation = await getReservation(params.id);
    const from = new Date(reservation.start_time);
    const to = new Date(reservation.end_time);
    return (
        <ReservationMeta
            from={from.toISOString()}
            to={to.toISOString()}
            group={reservation.group_detail!}
            state={reservation.state}
            user={reservation.author_detail}
            soberWatch={reservation.sober_watch}
            approvedBy={reservation.approved_by_detail}
            {...props}
        />
    );
};

export default ReservationMetaWrapper;
