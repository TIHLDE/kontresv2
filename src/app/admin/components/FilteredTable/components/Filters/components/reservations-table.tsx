import { DetailedReservation } from '@/utils/apis/types';

import { DataTable } from '@/app/admin/components/data-table';
import { reservationColumns } from '@/app/admin/components/reservation-columns';

const ReservationsTable = ({
    reservations,
}: {
    reservations: DetailedReservation[];
}) => {
    return (
        <DataTable
            searchPlaceholder={'Søk etter brukere...'}
            search={true}
            columns={reservationColumns}
            data={reservations}
            filterProperty={'author_detail'}
        />
    );
};

export default ReservationsTable;
