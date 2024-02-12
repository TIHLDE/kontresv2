import { DetailedReservation } from '../../../utils/apis/types';
import { getWeek, getYear } from 'date-fns';

interface ExistingReservationsProps {
    currentDay: Date;
    view: 'week' | 'day';
    reservations: DetailedReservation[];
}

export default function ExistingReservations({
    currentDay,
    view,
    reservations,
}: ExistingReservationsProps) {
    return reservations.map((reservation, index) => {
        let start = new Date(reservation.start_time);
        let end = new Date(reservation.end_time);
        console.log(start, end);

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
    });
}
