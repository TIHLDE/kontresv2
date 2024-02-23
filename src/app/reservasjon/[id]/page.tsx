import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import ProfilePill from '@/components/ui/profilepill';

import { getReservation } from '@/utils/apis/reservations';
import { getUser, getUserData } from '@/utils/apis/user';

import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { UserRound } from 'lucide-react';
import Image from 'next/image';
import AdminButtons from './components/AdminButtons';

const Page = async ({ params }: { params: { id: string } }) => {
    // Get the booking data
    const id = params.id;
    const reservation = await getReservation(id);
    const user = reservation.author_detail;
    const from = new Date(reservation.start_time);
    const to = new Date(reservation.end_time);

    let state;
    if (reservation.state === 'CONFIRMED') {
        state = 'Bekreftet';
    } else if (reservation.state === 'PENDING') {
        state = 'Avventer';
    } else if (reservation.state === 'CANCELLED') {
        state = 'Avslått';
    }

    return (
        <div className="max-w-page mx-auto h-screen mt-16 md:w-2/5">
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
                    <Card>
                        <div className="flex flex-col gap-3 p-3">
                            <div>
                                <h2 className="font-semibold text-xl">Fra</h2>
                                <p className="text-nowrap">
                                    {format(from, 'd. LLLL HH:mm', {
                                        locale: nb,
                                    })}
                                </p>
                            </div>
                            <div>
                                <h2 className="font-semibold text-xl">Til</h2>
                                <p className="text-nowrap">
                                    {' '}
                                    {format(to, 'd. LLLL HH:mm', {
                                        locale: nb,
                                    })}
                                </p>
                            </div>
                            <div>
                                <h2 className="font-semibold text-xl">
                                    Skrevet av
                                </h2>
                                <ProfilePill label={user.first_name} image={user.image} />

                            </div>
                            <div>
                                <h2 className="font-semibold text-xl text-nowrap">
                                    På vegne av
                                </h2>
                                <ProfilePill className="w-full" label={reservation.group_detail?.name} image={reservation.group_detail?.image ?? ''} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-xl text-nowrap">
                                    Status
                                </h2>
                                <span className={`${reservation.state === 'PENDING' && 'text-yellow-500'} 
                                                ${reservation.state === 'CONFIRMED' && 'text-green-500'} 
                                                ${reservation.state === 'CANCELLED' && 'text-red-500'}`}>{state}</span>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full p-3">
                        <h2 className="font-semibold my-3 text-xl">
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
