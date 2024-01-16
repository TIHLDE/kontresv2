"use client"

import { useSearchParams } from "next/navigation";
import { DetailedItem } from "@/utils/apis/types";
import { EventFormFields, EventFormValueTypes } from "@/app/booking/components/EventFormFields";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AutoAlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";



type EventFormType = {
    items: DetailedItem[];
}



const EventForm = ({ items }: EventFormType) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const formValues = useRef<EventFormValueTypes>();

    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const itemUUID = searchParams.get("itemUUID")

    const defaultItem = items.filter(a => a.id == itemUUID).length > 0 ? itemUUID : items[0].id

    const onSubmit = async (values: EventFormValueTypes) => {
        formValues.current = values;
        setAlertOpen(true);
    }

    const createReservation = () => {
        // Use the values stored in the state hook
        console.log(formValues.current)
    }


    return (
        <>
            <AutoAlertDialog open={alertOpen} title={"Er du sikker på at du vil legge inn reservasjonen?"} footerButtons={
                <>
                    <AlertDialogCancel onClick={() => setAlertOpen(false)}>Avbryt</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        setAlertOpen(false);
                        createReservation()
                    }}>Send inn</AlertDialogAction>
                </>
            } description="Når søknaden er sendt inn, kan den ikke fjernes. Vennligst kontroller at alle feltene oppgir riktig informasjon."
            />
            <EventFormFields initialItem={defaultItem ?? ""} items={items} onSubmit={onSubmit} />
        </>
    )
}

export default EventForm;