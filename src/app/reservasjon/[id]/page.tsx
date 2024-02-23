import { Card } from '@/components/ui/card';

import { getReservation } from '@/utils/apis/reservations';

import Image from 'next/image';
import AdminButtons from './components/AdminButtons';
import ReservationMeta from './components/ReservationMeta';
import { BaseGroup } from '@/utils/apis/types';
import { getCurrentUserData } from '@/utils/apis/user';

const Page = async ({ params }: { params: { id: string } }) => {
    // Get the booking data
    const id = params.id;
    const reservation = await getReservation(id);
    const from = new Date(reservation.start_time);
    const to = new Date(reservation.end_time);

    // Fetch the current user data too see if they are an admin
    const currentUser = await getCurrentUserData();


    return (
        <div className="max-w-page mx-auto min-h-screen md:w-2/5">
            <Card className="overflow-hidden">
                <div>
                    <div className="h-48 md:h-72 overflow-hidden flex items-center relative">
                        <Image
                            src={
                                'https://www.southernliving.com/thmb/Rz-dYEhwq_82C5_Y9GLH2ZlEoYw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-837898820-1-4deae142d4d0403dbb6cb542bfc56934.jpg'
                            }
                            layout="fill"
                            alt="Dog."
                            className="w-full h-full relative object-cover"
                        />
                        <div className="w-full h-full absolute bottom-0 left-0 bg-gradient-to-t from-background to-transparent" />
                    </div>
                </div>
                <h1 className="font-semibold my-3 text-3xl w-fit mx-auto mt-10 text-center">
                    Reservasjon av{' '}
                    <span className="lowercase">
                        {reservation.bookable_item_detail.name}
                    </span>
                </h1>
                <div className="flex gap-3 w-full p-5 flex-col md:flex-row">
                    <ReservationMeta from={from.toISOString()} to={to.toISOString()} group={reservation.group_detail as BaseGroup} state={reservation.state} user={reservation.author_detail} />
                    <Card className="w-full p-3">
                        <h2 className="font-semibold text-xl">
                            Beskrivelse
                        </h2>
                        <p>{reservation.description}</p>
                    </Card>
                </div>
                <AdminButtons />
            </Card>
        </div>
    );
};

export default Page;
