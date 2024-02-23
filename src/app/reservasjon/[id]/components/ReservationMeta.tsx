import { Card } from "@/components/ui/card"
import ProfilePill from "@/components/ui/profilepill"
import { User } from "@/types/User";
import { BaseGroup, ReservationState } from "@/utils/apis/types";
import { format } from "date-fns"
import { nb } from "date-fns/locale/nb";

interface ReservationMetaProps {
    from: string;
    to: string;
    user: User;
    group: BaseGroup;
    state: ReservationState;
}

const ReservationMeta = ({ from, to, user, group, state }: ReservationMetaProps) => {
    let stateText;
    if (state === 'CONFIRMED') {
        stateText = 'Bekreftet';
    } else if (state === 'PENDING') {
        stateText = 'Avventer';
    } else if (state === 'CANCELLED') {
        stateText = 'Avslått';
    }

    return (
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
                {
                    group &&
                    (
                        <div>
                            <h2 className="font-semibold text-xl text-nowrap">
                                På vegne av
                            </h2>
                            <ProfilePill className="w-full" label={group.name} image={group.image ?? ''} />
                        </div>
                    )
                }
                <div>
                    <h2 className="font-semibold text-xl text-nowrap">
                        Status
                    </h2>
                    <span className={`${state === 'PENDING' && 'text-yellow-500'} 
                                                ${state === 'CONFIRMED' && 'text-green-500'} 
                                                ${state === 'CANCELLED' && 'text-red-500'}`}>{stateText}</span>
                </div>
            </div>
        </Card>
    )
}

export default ReservationMeta;