import BlurBackground from '@/components/layout/blur-background';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { PermissionApp } from '@/utils/apis/types';
import { checkUserPermissions } from '@/utils/apis/user';

import AdminButtons from './components/AdminButtons';
import DescriptionWrapper from './components/DescriptionWrapper';
import ImageSection from './components/ImageSection';
import ReservationMetaWrapper from './components/ReservationMetaWrapper';
import TitleWrapper from './components/TitleWrapper';
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
        <BlurBackground>
            <div className="md:max-w-2xl max-w-page mx-auto min-h-screen w-full">
                <Card className="overflow-hidden">
                    <ImageSection className="z-0" />
                    <div className="relative -mt-40">
                        <Suspense
                            fallback={
                                <Skeleton className="w-1/2 h-7 mx-auto mt-10" />
                            }
                        >
                            <TitleWrapper params={params} />
                        </Suspense>
                        <div className="flex gap-3 w-full p-5 flex-col md:flex-row">
                            <Suspense
                                fallback={<Skeleton className="w-52 h-80" />}
                            >
                                <ReservationMetaWrapper params={params} />
                            </Suspense>
                            <Suspense
                                fallback={<Skeleton className="w-full h-80" />}
                            >
                                <DescriptionWrapper params={params} />
                            </Suspense>
                        </div>
                        {admin ? (
                            <AdminButtons reservationId={id} />
                        ) : undefined}
                    </div>
                </Card>
            </div>
        </BlurBackground>
    );
};

export default Page;
