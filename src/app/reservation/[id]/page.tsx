import Header from '@/components/layout/header/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { api } from '@/trpc/server';
import { ReservationState } from '@prisma/client';

type ReservationPageParams = {
    params: { id: string };
};

const stateMap: Record<ReservationState, string> = {
    REJECTED: 'Avslått',
    APPROVED: 'Bekreftet',
    PENDING: 'Avventer',
};

export default async function Page({ params: { id } }: ReservationPageParams) {
    const data = await api.reservation.getReservation(+id);
    const itemData = data?.bookableItemId
        ? await api.bookableItem.getById({ itemId: +data.bookableItemId })
        : null;

    return (
        <div className="md:max-w-2xl max-w-page mx-auto min-h-screen w-full p-4">
            <Card className="w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Reservation Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 p-6">
                    <div className="break-words">
                        <strong>Beskrivelse:</strong> {data?.description}
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <strong>Starttid:</strong>{' '}
                            {data?.startTime?.toLocaleString()}
                        </div>
                        <div>
                            <strong>Sluttid:</strong>{' '}
                            {data?.endTime?.toLocaleString()}
                        </div>
                    </div>
                    <div>
                        <strong>Gjenstand:</strong> {itemData?.name}
                    </div>
                    <div>
                        <strong>Status:</strong>{' '}
                        {data ? stateMap[data.status] : 'Unknown'}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
