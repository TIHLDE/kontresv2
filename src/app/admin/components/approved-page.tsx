import BookingList from './booking-list/booking-list';
import { api } from '@/trpc/server';

export default async function ApprovedPage() {
    const items = await api.reservation.getReservations({
        state: 'APPROVED',
        limit: 20,
        direction: 'forward',
        cursor: null,
    });

    return <BookingList items={items.reservations} />;
}
