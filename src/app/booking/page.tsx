import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loadingspinner';

import { Suspense } from 'react';

export default async function Page() {
    return (
        <div className="max-w-page mx-auto min-h-screen flex md:flex-row flex-col gap-5 justify-center">
            <Card className="p-4 h-fit w-full max-w-2xl">
                <Suspense fallback={<LoadingSpinner className="mx-auto" />}>
                    {/* <ReservationFormWrapper /> */}
                </Suspense>
            </Card>
        </div>
    );
}
