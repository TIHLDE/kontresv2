import Calendar from '@/components/ui/calendar/calendar';

import { getBookableItem, getReservations } from '@/utils/apis/reservations';
import { DetailedItem, DetailedReservation } from '@/utils/apis/types';

interface CalendarWrapperProps {
    type: string;
}

const CalendarWrapper = async ({ type }: CalendarWrapperProps) => {
    let reservationRequest: DetailedReservation[] = [];
    let item: Partial<DetailedItem> = {};
    try {
        reservationRequest = await getReservations();
        item = await getBookableItem(type);
    } catch (error) {
        console.error(error);
    }

    reservationRequest =
        reservationRequest?.filter(
            (booking) => type === booking?.bookable_item_detail?.id,
        ) ?? [];
    return (
        <Calendar
            typeUUID={type}
            name={item.name as string}
            reservations={reservationRequest}
        />
    );
};

export default CalendarWrapper;
