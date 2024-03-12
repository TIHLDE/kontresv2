import { Card } from '@/components/ui/card';

import { getReservation } from '@/utils/apis/reservations';

const DescriptionWrapper = async ({ params }: { params: { id: string } }) => {
    const reservation = await getReservation(params.id);

    return (
        <Card className="w-full p-3">
            <h2 className="font-semibold text-xl">Beskrivelse</h2>
            <p>{reservation.description}</p>
        </Card>
    );
};

export default DescriptionWrapper;
