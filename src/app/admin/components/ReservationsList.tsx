"use client"

import { DetailedReservation } from "@/utils/apis/types";
import { reservationColumns } from "./reservationColumns"
import { DataTable } from "./data-table"
import { useRouter } from "next/navigation";

export interface ReservationsListProps {
    reservations: DetailedReservation[];
}

const ReservationsList = ({ reservations }: ReservationsListProps) => {
    const router = useRouter();

    const rowClickCallback = (data: DetailedReservation) => {
        router.push(`/reservasjon/${data.id}/`)
    }

    return (
        <DataTable searchPlaceholder={"Søk etter brukere..."} search={true} columns={reservationColumns} data={reservations} rowClickCallback={rowClickCallback} />
    )
}

export default ReservationsList;