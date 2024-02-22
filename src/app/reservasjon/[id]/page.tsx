import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

import { getReservation } from '@/utils/apis/reservations';
import { getUser, getUserData } from '@/utils/apis/user';

import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { UserRound } from 'lucide-react';
import Image from 'next/image';

const Page = async ({ params }: { params: { id: string } }) => {
    // Get the booking data
    const id = params.id;
    const reservation = await getReservation(id);
    const user = await getUserData(reservation.author);
    const from = new Date(reservation.start_time);
    const to = new Date(reservation.end_time);

    return (
        <div className="max-w-page mx-auto h-screen mt-16 md:w-2/5">
            <Card className="overflow-hidden">
                <div>
                    <div className="h-48 md:h-96 overflow-hidden flex items-center relative">
                        <Image
                            src={
                                'https://www.southernliving.com/thmb/Rz-dYEhwq_82C5_Y9GLH2ZlEoYw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-837898820-1-4deae142d4d0403dbb6cb542bfc56934.jpg'
                            }
                            layout="fill"
                            alt="Dog."
                            className="w-full h-full relative object-cover"
                        />
                        <div className="w-full h-2/3 absolute bottom-0 left-0 bg-gradient-to-t from-background to-transparent" />
                    </div>
                </div>
                <h1 className="font-semibold my-3 text-3xl w-fit mx-auto mt-10 text-center">
                    Reservasjon av{' '}
                    <span className="lowercase">
                        {reservation.bookable_item.name}
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
                                <Card className="flex p-1 items-center gap-3">
                                    <Avatar className="rounded-lg">
                                        <AvatarImage
                                            src={user.image}
                                            alt="profilbilde"
                                        />
                                        <AvatarFallback>
                                            <UserRound className="text-foreground" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{user.first_name}</span>
                                </Card>
                            </div>
                            <div>
                                <h2 className="font-semibold text-xl text-nowrap">
                                    På vegne av
                                </h2>
                                <Card className="flex p-1 items-center gap-3">
                                    <Avatar className="rounded-lg">
                                        <AvatarImage
                                            src={reservation.group}
                                            alt="profilbilde"
                                        />
                                        <AvatarFallback>
                                            <UserRound className="text-foreground" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{reservation.group}</span>
                                </Card>
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
            </Card>
        </div>
    );
};

export default Page;
