import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReservationTable from '@/components/ui/reservation-table';
import { Separator } from '@/components/ui/separator';
import { UserDetail } from '@/components/ui/user-detail';

import {
    getReservations,
    getUserReservations,
} from '@/utils/apis/reservations';
import { getCurrentUserData } from '@/utils/apis/user';

import MyPageSkeleton from './components/my-page-skeleton';
import MyPageWrapper from './components/my-page-wrapper';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

const Page = async () => {
    return (
        <div className="max-w-page mx-auto flex flex-col place-content-center">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Min side</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<MyPageSkeleton />}>
                        <MyPageWrapper />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
