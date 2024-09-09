import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { PermissionApp } from '@/utils/apis/types';
import { checkUserPermissions } from '@/utils/apis/user';

import AdminButtons from './components/AdminButtons';
import DescriptionWrapper from './components/DescriptionWrapper';
import ImageSection from './components/ImageSection';
import ReservationMetaWrapper from './components/ReservationMetaWrapper';
import TitleWrapper from './components/TitleWrapper';
import AdminInfo from './components/admin-info';
import { Suspense } from 'react';

const Page = async ({ params }: { params: { id: string } }) => {
    // Get the booking data
    const id = params.id;

    // Check if admin
    let admin: boolean;
    try {
        admin = await checkUserPermissions([PermissionApp.USER]);
    } catch (error) {
        admin = false;
    }

    return (
        <div className="md:max-w-2xl max-w-page mx-auto min-h-screen w-full">
            <Card className="">
                <ImageSection className="z-0" />
                <div className="relative -mt-40">
                    <Suspense
                        fallback={
                            <Skeleton className="w-1/2 h-7 mx-auto mt-10" />
                        }
                    >
                        <TitleWrapper params={params} />
                    </Suspense>
                    <div className="grid gap-3 w-full md:grid-cols-[1fr_2fr] p-5 grid-cols-1">
                        <Suspense
                            fallback={<Skeleton className="w-full h-80" />}
                        >
                            <ReservationMetaWrapper
                                params={params}
                                className="relative z-10"
                            />
                        </Suspense>
                        <Suspense
                            fallback={<Skeleton className="w-full h-80" />}
                        >
                            <DescriptionWrapper
                                params={params}
                                className="relative z-0"
                            />
                        </Suspense>
                        <Suspense>
                            <AdminInfo params={params} />
                        </Suspense>
                    </div>
                    {admin ? <AdminButtons reservationId={id} /> : undefined}
                </div>
            </Card>
        </div>
    );
};

export default Page;
