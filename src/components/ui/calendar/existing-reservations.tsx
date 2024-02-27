import { DetailedReservation } from '../../../utils/apis/types';
import ReservationShard from './reservation-shard';
import {
    add,
    differenceInMinutes,
    getDay,
    getHours,
    isSameDay,
    isSameWeek,
    setHours,
    setMinutes,
    setSeconds,
    startOfDay,
} from 'date-fns';

interface ExistingReservationsProps {
    currentDay: Date;
    view: 'week' | 'day';
    reservations: DetailedReservation[];
    setRelativeMousePosition: (e: any) => void;
}

export default function ExistingReservations({
    currentDay,
    view,
    reservations,
    setRelativeMousePosition,
}: ExistingReservationsProps) {
    let reservationShards = [];

    for (let reservation of reservations) {
        let start = new Date(reservation.start_time);
        let end = new Date(reservation.end_time);

        while (true) {
            if (isSameDay(start, end)) {
                reservationShards.push({
                    start,
                    end,
                    reservation,
                });
                break;
            } else {
                reservationShards.push({
                    start,
                    end: setHours(setMinutes(setSeconds(start, 59), 59), 23),
                    reservation,
                });
                start = add(startOfDay(start), { days: 1 });
            }
        }
    }

    reservationShards = reservationShards.filter((reservation) => {
        let start = new Date(reservation.reservation!.start_time);

        if (view === 'week') {
            return isSameWeek(start, currentDay, { weekStartsOn: 1 });
        } else {
            return isSameDay(start, currentDay);
        }
    });

    return reservationShards.map((res, index) => {
        let { start, end, reservation } = res;
        return (
            <ReservationShard
                setRelativeMousePosition={setRelativeMousePosition}
                top={(getHours(start) * 100) / 23 + '%'}
                left={
                    (100 / 7) * (getDay(start) == 0 ? 6 : getDay(start) - 1) +
                    '%'
                }
                color="red"
                key={index}
                width={100 / 7 + '%'}
                height={(differenceInMinutes(end, start) * 100) / 1440 + '%'}
                reservation={reservation!}
            />
        );
    });
}
