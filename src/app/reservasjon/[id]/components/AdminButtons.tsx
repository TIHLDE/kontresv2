"use client"

import { Button } from "@/components/ui/button"
import { setReservationState } from "@/utils/apis/reservations"

interface AdminButtonsProps {
    reservationId: string;
    start_time: string; // <= temporary until backend is fixed
    end_time: string; // <= temporary until backend is fixed
}

const AdminButtons = ({ reservationId, start_time, end_time }: AdminButtonsProps) => {

    const onReject = () => {
        // Reject the reservation
        setReservationState(reservationId, start_time, end_time, 'CANCELLED').then(() => {

        }).catch(err => alert(err));
    }

    const onAccept = () => {
        // Accept the reservation
        setReservationState(reservationId, start_time, end_time, 'CONFIRMED').then(() => {
            alert("Application accepted");
        }).catch(err => alert(err));
    }

    return (
        <div className="w-full flex gap-3 p-5">
            <Button className="w-full" onClick={onAccept}>Godkjenn</Button>
            <Button className="w-full" onClick={onReject} variant={"destructive"}>Avslå</Button>
        </div>
    )
}

export default AdminButtons;