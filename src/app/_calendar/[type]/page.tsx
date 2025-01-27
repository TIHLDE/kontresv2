import { LoadingSpinner } from '@/components/ui/loadingspinner';

import CalendarWrapper from './CalendarWrapper';
import { Suspense } from 'react';

interface PageProps {
    params: {
        type: string;
    };
}
export default async function Page({ params: { type } }: PageProps) {
    return (
        <div className="">
            <Suspense fallback={<LoadingSpinner className="mx-auto" />}>
                <CalendarWrapper type={type} />
            </Suspense>
        </div>
    );
}
