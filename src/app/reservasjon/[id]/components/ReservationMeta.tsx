'use client';

import { User } from '@/types/User';

import { Card } from '@/components/ui/card';
import { GroupProfilePill, UserProfilePill } from '@/components/ui/profilepill';

import { BaseGroup, GroupType, ReservationState } from '@/utils/apis/types';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

interface ReservationMetaProps extends React.ComponentProps<typeof Card> {
    from: string;
    to: string;
    user: User;
    group: BaseGroup;
    soberWatch?: User;
    state: ReservationState;
    approvedBy?: User;
}

export const stateMap: { [key in ReservationState]: StateAtomType } = {
    CANCELLED: 'Avslått',
    CONFIRMED: 'Bekreftet',
    PENDING: 'Avventer',
};

export type StateAtomType = 'Bekreftet' | 'Avventer' | 'Avslått' | 'Laster';
export const stateAtom = atom<StateAtomType>('Laster');

const ReservationMeta = ({
    from,
    to,
    user,
    group,
    state,
    soberWatch,
    approvedBy,
    className,
    ...props
}: ReservationMetaProps) => {
    const [stateText, setStateText] = useAtom(stateAtom);

    useEffect(() => {
        setStateText(stateMap[state]);
    }, [state, setStateText]);

    return (
        <Card className={cn('bg-card/30 backdrop-blur-sm w-full', className)}>
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
                    <h2 className="font-semibold text-xl">Skrevet av</h2>
                    <UserProfilePill
                        email={user.email}
                        firstName={user.first_name}
                        gender={user.gender}
                        image={user.image}
                        lastName={user.last_name}
                        tool={user.tool}
                        userId={user.user_id}
                    />
                </div>

                {group && (
                    <div>
                        <h2 className="font-semibold text-xl text-nowrap">
                            På vegne av
                        </h2>
                        <GroupProfilePill className="w-full" group={group} />
                    </div>
                )}

                {approvedBy && (
                    <div>
                        <h2 className="font-semibold text-xl text-nowrap">
                            {state === 'CONFIRMED' ? 'Godkjent' : 'Avslått'} av
                        </h2>
                        <UserProfilePill
                            className="w-full"
                            firstName={approvedBy.first_name}
                            lastName={approvedBy.last_name}
                            image={approvedBy.image}
                            gender={approvedBy.gender}
                            email={approvedBy.email}
                            userId={approvedBy.email}
                            tool={approvedBy.tool}
                        />
                    </div>
                )}

                {soberWatch && (
                    <div>
                        <h2 className="font-semibold text-xl text-nowrap">
                            Edruvakt
                        </h2>
                        <UserProfilePill
                            className="w-full"
                            firstName={soberWatch.first_name}
                            lastName={soberWatch.last_name}
                            image={soberWatch.image}
                            gender={soberWatch.gender}
                            email={soberWatch.email}
                            userId={soberWatch.user_id}
                            tool={soberWatch.tool}
                        />
                    </div>
                )}
                <div>
                    <h2 className="font-semibold text-xl text-nowrap">
                        Status
                    </h2>
                    <span
                        className={`${stateText === 'Avventer' && 'text-yellow-500'} 
                                                ${stateText === 'Bekreftet' && 'text-green-500'} 
                                                ${stateText === 'Avslått' && 'text-red-500'}`}
                    >
                        {stateText}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default ReservationMeta;
