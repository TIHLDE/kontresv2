import { DetailedReservation } from '../../../utils/apis/types';
import ReservationShard from './reservation-shard';
import {
    differenceInMinutes,
    getDay,
    getHours,
    getWeek,
    getYear,
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
    return reservations.map((reservation, index) => {
        let start = new Date(reservation.start_time);
        let end = new Date(reservation.end_time);

        if (
            view === 'week' &&
            !(
                getWeek(start) == getWeek(currentDay) &&
                getYear(start) == getYear(currentDay)
            )
        ) {
            return null;
        }

        if (
            view === 'day' &&
            !(
                start.getDate() == currentDay.getDate() &&
                start.getMonth() == currentDay.getMonth() &&
                start.getFullYear() == currentDay.getFullYear()
            )
        ) {
            return null;
        }

        return (
            <ReservationShard
                setRelativeMousePosition={setRelativeMousePosition}
                top={48 * getHours(start) + 'px'}
                left={(100 / 7) * getDay(start) + '%'}
                color="red"
                key={index}
                width={100 / 7 + '%'}
                height={differenceInMinutes(end, start) / 1440 + '%'}
                reservation={reservation}
            />
        );
    });
}
