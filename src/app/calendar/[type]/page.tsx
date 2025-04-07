import { LoadingSpinner } from '@/components/ui/loadingspinner';

import { Suspense } from 'react';

interface PageProps {
    params: {
        type: string;
    };
}
export default async function Page({ params: { type } }: PageProps) {
    return (
        <div>
            <Suspense
                fallback={<LoadingSpinner className="mx-auto" />}
            ></Suspense>
        </div>
    );
}
