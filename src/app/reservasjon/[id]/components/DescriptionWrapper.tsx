import { Card } from '@/components/ui/card';

import { getReservation } from '@/utils/apis/reservations';

import { cn } from '@/lib/utils';

interface DescriptionWrapperProps extends React.ComponentProps<typeof Card> {
    params: { id: string };
}
const DescriptionWrapper = async ({
    params,
    className,
    ...props
}: DescriptionWrapperProps) => {
    const reservation = await getReservation(params.id);

    return (
        <Card
            className={cn('w-full p-3 bg-card/30 backdrop-blur-sm', className)}
            {...props}
        >
            <h2 className="font-semibold text-xl">Beskrivelse</h2>
            <p>{reservation.description}</p>
        </Card>
    );
};

export default DescriptionWrapper;
