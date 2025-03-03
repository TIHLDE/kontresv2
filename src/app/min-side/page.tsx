import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import ReservationView from './components/reservation-view';
import { auth } from '@/auth';
import { api } from '@/trpc/server';
import { redirect, useRouter } from 'next/navigation';

const Page = async () => {
    const session = await auth();
    if (!session) redirect('/login');
    const reservations = await api.reservation.getUserReservations({
        userId: session.user.id,
    });
    return (
        <div className="max-w-page mx-auto flex flex-col place-content-center">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Min side</CardTitle>
                </CardHeader>
                <CardContent>
                    <ReservationView reservations={reservations} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
