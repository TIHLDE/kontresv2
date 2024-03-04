"use client";

import { Card } from "@/components/ui/card"
import { GroupProfilePill, UserProfilePill } from "@/components/ui/profilepill";
import { User } from "@/types/User";
import { BaseGroup, ReservationState } from "@/utils/apis/types";
import { format } from "date-fns"
import { nb } from "date-fns/locale/nb";
import { atom, useAtom } from 'jotai';
import { useEffect } from "react";

interface ReservationMetaProps {
    from: string;
    to: string;
    user: User;
    group: BaseGroup;
    state: ReservationState;
}

export const stateMap: { [key in ReservationState]: StateAtomType } = {
    CANCELLED: "Avslått",
    CONFIRMED: "Bekreftet",
    PENDING: "Avventer"
}

export type StateAtomType = 'Bekreftet' | 'Avventer' | 'Avslått' | 'Laster';
export const stateAtom = atom<StateAtomType>('Laster');

const ReservationMeta = ({ from, to, user, group, state }: ReservationMetaProps) => {
    const [stateText, setStateText] = useAtom(stateAtom);

    useEffect(() => {
        setStateText(stateMap[state])
    }, [state, setStateText])


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
                    <UserProfilePill user={user} />

                </div>
                {
                    group &&
                    (
                        <div>
                            <h2 className="font-semibold text-xl text-nowrap">
                                På vegne av
                            </h2>
                            <GroupProfilePill className="w-full" group={group} />
                        </div>
                    )
                }
                <div>
                    <h2 className="font-semibold text-xl text-nowrap">
                        Status
                    </h2>
                    <span className={`${stateText === "Avventer" && 'text-yellow-500'} 
                                                ${stateText === "Bekreftet" && 'text-green-500'} 
                                                ${stateText === "Avslått" && 'text-red-500'}`}>{stateText}</span>
                </div>
            </div>
        </Card>
    )
}

export default ReservationMeta;