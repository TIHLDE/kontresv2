import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserDetail } from '@/components/ui/user-detail';

import { getReservations } from '@/utils/apis/reservations';
import { getCurrentUserData } from '@/utils/apis/user';

import ReservationTable from '@/app/admin/components/ReservationTable';
import { motion } from 'framer-motion';

const Page = async () => {
    const user = await getCurrentUserData();

    // Fetch the user's reservations
    const reservations = await getReservations();
    return (
        <div className="max-w-page mx-auto flex flex-col place-content-center">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Min side</CardTitle>
                </CardHeader>
                <CardContent>
                    <UserDetail
                        image={user.image}
                        fullName={user.first_name + ' ' + user.last_name}
                    />
                    <ReservationTable data={reservations} />
                    {user.first_name + ' ' + user.last_name}
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;