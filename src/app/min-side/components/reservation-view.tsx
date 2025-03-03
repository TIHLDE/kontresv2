'use client';

import { reservationColumns } from './reservation-columns';
import { DataTable } from '@/app/admin/components/data-table';
import { BookableItem, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface ReservationViewProps {
    reservations: (Reservation & { bookableItem: BookableItem })[];
}
const ReservationView = ({ reservations }: ReservationViewProps) => {
    const router = useRouter();
    return (
        <DataTable
            columns={reservationColumns}
            rowClickCallback={(data) => {
                router.push(`/reservation/${data.reservationId}`);
            }}
            data={reservations}
            search
            filterProperty="description"
            searchPlaceholder="Søk etter navn..."
        />
    );
};

export default ReservationView;
