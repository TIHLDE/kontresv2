import { Card } from '@/components/ui/card';



import { PermissionApp } from '@/utils/apis/types';
import { checkUserPermissions } from '@/utils/apis/user';

import AdminButtons from './components/AdminButtons';
import DescriptionWrapper from './components/DescriptionWrapper';
import ReservationMetaWrapper from './components/ReservationMetaWrapper';
import TitleWrapper from './components/TitleWrapper';
import Image from 'next/image';
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
        <div className="max-w-page mx-auto min-h-screen md:w-2/5">
            <Card className="overflow-hidden">
                <div>
                    <div className="h-48 md:h-72 overflow-hidden flex items-center relative">
                        <Image
                            src={
                                'https://www.southernliving.com/thmb/Rz-dYEhwq_82C5_Y9GLH2ZlEoYw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-837898820-1-4deae142d4d0403dbb6cb542bfc56934.jpg'
                            }
                            layout="fill"
                            alt="Dog."
                            className="w-full h-full relative object-cover"
                        />
                        <div className="w-full h-full absolute bottom-0 left-0 bg-gradient-to-t from-background to-transparent" />
                    </div>
                </div>
                <Suspense fallback="Loading">
                    <TitleWrapper params={params} />
                </Suspense>
                <div className="flex gap-3 w-full p-5 flex-col md:flex-row">
                    <Suspense fallback="Loading">
                        <ReservationMetaWrapper params={params} />
                    </Suspense>
                    <Suspense fallback="Loading">
                        <DescriptionWrapper params={params} />
                    </Suspense>
                </div>
                {admin ? <AdminButtons reservationId={id} /> : undefined}
            </Card>
        </div>
    );
};

export default Page;