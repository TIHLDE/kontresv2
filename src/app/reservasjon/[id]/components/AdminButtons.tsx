"use client"

import { Button } from "@/components/ui/button"
import { setReservationState } from "@/utils/apis/reservations"
import { useAtom, useSetAtom } from "jotai";
import { StateAtomType, stateAtom } from "./ReservationMeta";
import { ReservationState } from "@/utils/apis/types";
import { useRef, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import { useButtonPop } from "@/utils/animations/buttonPop";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface AdminButtonsProps {
    reservationId: string;
}

type Flags<T extends PropertyKey> = Record<T, StateAtomType>;

const mapObject: Flags<ReservationState> = {
    CONFIRMED: 'Bekreftet',
    PENDING: 'Avventer',
    CANCELLED: 'Avslått'
}

const AdminButtons = ({ reservationId }: AdminButtonsProps) => {
    const [rejectLoading, setRejectLoading] = useState(false);
    const [acceptLoading, setAcceptLoading] = useState(false);

    const acceptRef = useRef<HTMLButtonElement | null>(null);
    const rejectRef = useRef<HTMLButtonElement | null>(null);

    const buttonPop = useButtonPop();

    const [state, setState] = useAtom(stateAtom);

    const { toast } = useToast();


    const informSuccess = () => {
        toast({
            title: "Vellykket!",
            description: "Endringene er lagret.",
        })
    }

    const informFailure = () => {
        toast({
            title: "Noe gikk galt.",
            description: "Kunne ikke lagre endringene.",
            variant: "destructive"
        })
    }


    const onReject = () => {
        // Reject the reservation
        setRejectLoading(true);
        setReservationState(reservationId, 'CANCELLED').then((data) => {
            setRejectLoading(false);
            buttonPop.run({ ref: rejectRef })
            informSuccess();
            setState(mapObject[data.state])
        }).catch(err => {
            informFailure();
            setRejectLoading(false);
        });
    }

    const onAccept = () => {
        // Accept the reservation
        setAcceptLoading(true);
        setReservationState(reservationId, 'CONFIRMED').then((data) => {
            setAcceptLoading(false);
            buttonPop.run({ ref: acceptRef })
            informSuccess();
        }).catch(err => {
            informFailure();
            setAcceptLoading(false);
        });
    }

    return (
        <div className="w-full flex flex-col md:flex-row gap-3 p-5">
            <Button ref={acceptRef} className="w-full" onClick={onAccept} disabled={acceptLoading || rejectLoading}>{acceptLoading ? <LoadingSpinner /> : 'Godkjenn'}</Button>
            <Button ref={rejectRef} className="w-full" onClick={onReject} variant={"destructive"} disabled={acceptLoading || rejectLoading}>{rejectLoading ? <LoadingSpinner /> : 'Avslå'}</Button>
        </div>
    )
}

export default AdminButtons;