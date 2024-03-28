import { User } from '@/types/User';

import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loadingspinner';

import { getGroupMemberships } from '@/utils/apis/groups';
import { getItems } from '@/utils/apis/items';
import { DetailedItem } from '@/utils/apis/types';
import { getCurrentUserData } from '@/utils/apis/user';

import ReservationForm from './components/ReservationForm';
import ReservationFormWrapper from './components/ReservationFormWrapper';
import { Suspense } from 'react';

export default async function Page() {
    return (
        <div className="max-w-page mx-auto min-h-screen">
            <Card className="p-4 w-fit mx-auto">
                <Suspense fallback={<LoadingSpinner />}>
                    <ReservationFormWrapper />
                </Suspense>
            </Card>
        </div>
    );
}
