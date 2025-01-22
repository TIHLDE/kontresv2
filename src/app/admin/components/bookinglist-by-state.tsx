import BookingList from './booking-list/booking-list';
import { api } from '@/trpc/server';
import { type ReservationState } from '@prisma/client';

interface BookingListProps {
    state: ReservationState;
}

export default async function BookingListByState({ state }: BookingListProps) {
    const items = await api.reservation.getReservations({
        state,
        limit: 20,
        direction: 'forward',
        cursor: null,
    });
    return <BookingList items={items.reservations} />;
}
