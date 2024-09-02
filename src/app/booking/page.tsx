import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loadingspinner';

import ApplicantCard from './components/ApplicantCard';
import ReservationFormWrapper from './components/ReservationFormWrapper';
import { Suspense } from 'react';

export default async function Page() {
    return (
        <div className="max-w-page mx-auto min-h-screen flex md:flex-row flex-col gap-5 justify-center">
            <Card className="p-4 w-full h-fit md:w-fit">
                <Suspense fallback={<LoadingSpinner />}>
                    <ReservationFormWrapper />
                </Suspense>
            </Card>
        </div>
    );
}
