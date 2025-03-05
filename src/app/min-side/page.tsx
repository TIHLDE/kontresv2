import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { DataTable } from '../admin/components/data-table';
import MyPageSkeleton from './components/my-page-skeleton';
import MyPageWrapper from './components/my-page-wrapper';
import { reservationColumns } from './components/reservation-columns';
import { auth } from '@/auth';
import { api } from '@/trpc/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

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
                    <DataTable
                        columns={reservationColumns}
                        data={reservations}
                        search
                        filterProperty="description"
                        searchPlaceholder="Søk etter navn..."
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
