import { Button } from '../../../components/ui/button';
import { Separator } from '../../../components/ui/separator';
import {
    getBookableItem,
    getReservation,
} from '../../../utils/apis/reservations';
import { getUserMemberships, isAdmin } from '../../../utils/apis/user';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { cookies } from 'next/headers';

interface PageProps {
    params: {
        uuid: string;
    };
}
export default async function Page({ params: { uuid } }: PageProps) {
    const reservationDetails = await getReservation(uuid);
    const userId = cookies().get('user_id');
    if (!userId?.value) return;
    const userData = await getUserMemberships();
    console.log('userData', userData.results);
    let item = await getBookableItem(reservationDetails.bookable_item);

    return (
        <div className="md:pt-20 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <h1 className="md:text-6xl text-3xl font-semibold mb-2 mt-32">
                    Reservasjon av {item.name}
                </h1>
                <h2 className="text-xl mb-4 text-muted-foreground">
                    Reservert av{' '}
                    <span className="text-foreground font-semibold">
                        {reservationDetails.author}
                    </span>
                </h2>
                <Separator />
                <div className="mt-4">
                    <span className="text-muted-foreground">Fra: </span>
                    {format(
                        new Date(reservationDetails.start_time),
                        "PPPP 'kl.' HH:mm",
                        { locale: nb },
                    )}
                </div>
                <div className="mt-2 mb-4">
                    <span className="text-muted-foreground">Til: </span>
                    {format(
                        new Date(reservationDetails.end_time),
                        "PPPP 'kl.' HH:mm",
                        { locale: nb },
                    )}
                </div>
                <Separator />
                <div className="mt-4">{reservationDetails.description}</div>
                <div className="mt-8 flex flex-col gap-2 md:flex-row">
                    {(await isAdmin()) && (
                        <>
                            <Button className="bg-green-600 flex gap-1 items-center ">
                                Godkjenn <ThumbsUpIcon />
                            </Button>
                            <Button className="bg-destructive flex gap-1 items-center">
                                Avslå <ThumbsDownIcon />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
