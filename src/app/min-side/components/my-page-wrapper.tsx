import ReservationTable from '@/components/ui/reservation-table';
import { UserDetail } from '@/components/ui/user-detail';

import { getUserReservations } from '@/utils/apis/reservations';
import { getCurrentUserData } from '@/utils/apis/user';

const MyPageWrapper = async () => {
    const user = await getCurrentUserData();
    // Fetch the user's reservations
    const reservations = await getUserReservations();
    return (
        <>
            <UserDetail
                image={user.image}
                fullName={user.first_name + ' ' + user.last_name}
            />
            <ReservationTable data={reservations} />
        </>
    );
};

export default MyPageWrapper;
