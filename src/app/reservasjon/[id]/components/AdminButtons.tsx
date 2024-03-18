"use client"

import { Button } from "@/components/ui/button"
import { invalidateReservations, setReservationState } from "@/utils/apis/reservations"
import { useAtom } from "jotai";
import { StateAtomType, stateAtom } from "./ReservationMeta";
import { ReservationState } from "@/utils/apis/types";
import { useRef, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import { usePop } from "@/utils/animations/buttonPop";
import { useToast } from "@/components/ui/use-toast";
import { useShake } from "@/utils/animations/shake";

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

    const pop = usePop();
    const shake = useShake();

    const [state, setState] = useAtom(stateAtom);

    const { toast } = useToast();


    const informSuccess = () => {
        toast({
            title: "Vellykket!",
            description: "Endringene er lagret.",
        })
    }

    const informFailure = (detailedErrorMessage: string | undefined = undefined) => {
        toast({
            title: "Noe gikk galt.",
            description: detailedErrorMessage || "En uventet feil oppstod.",
            variant: "destructive"
        });
    };


    const onReject = () => {
        // Reject the reservation
        setRejectLoading(true);
        setReservationState(reservationId, 'CANCELLED').then((data) => {
            setRejectLoading(false);
            invalidateReservations();
            informSuccess();
            pop.run({ ref: rejectRef })
            setState(mapObject[data.state])
        }).catch(err => {
            informFailure();
            setRejectLoading(false);
            shake.run({ ref: rejectRef })
        });
    }

    const onAccept = () => {
        // Accept the reservation
        setAcceptLoading(true);
        setReservationState(reservationId, 'CONFIRMED').then((data) => {
            setAcceptLoading(false);
            invalidateReservations();
            pop.run({ ref: acceptRef })
            informSuccess();
            setState(mapObject[data.state])
        }).catch(err => {
            try {
                const errorObj = JSON.parse(err.message);
                const detailedErrorMessage = errorObj.response?.non_field_errors[0] || 'An unknown error occurred';
                informFailure(detailedErrorMessage);
            } catch (parseError) {
                console.error("Error parsing the error message:", parseError);
                informFailure();
            }
            setAcceptLoading(false);
            shake.run({ ref: acceptRef });
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