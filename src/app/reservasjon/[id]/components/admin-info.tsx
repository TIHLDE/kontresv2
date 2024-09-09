import { Card } from '@/components/ui/card';

import { getReservation } from '@/utils/apis/reservations';

import { cn } from '@/lib/utils';

interface AdminInfoProps extends React.ComponentProps<typeof Card> {
    params: { id: string };
}

const mockData = {
    reason: `
                Husk at reservasjonen din er på en ukedag, og i henhold til
                retningslinjene for bruk av kontoret, må det rengjøres før xx:xx
                i morgen.
            `,
};

const AdminInfo = async ({ params, className, ...props }: AdminInfoProps) => {
    const reservation = await getReservation(params.id);
    // Check if the reservation has a reason
    if (!('reason' in reservation)) {
        return undefined;
    }

    return (
        <Card className={cn('w-full p-3 md:col-span-2', className)} {...props}>
            <h2 className="font-semibold text-xl">Tillegsinformasjon</h2>
            <p>{reservation.reason ?? mockData.reason}</p>
        </Card>
    );
};

export default AdminInfo;
