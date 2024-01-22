"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { DetailedItem } from "@/utils/apis/types";
import { EventFormFields, EventFormValueTypes } from "@/app/booking/components/ReservationFormFields";
import { AlertDialogAction, AlertDialogCancel, AutoAlertDialog } from "@/components/ui/alert-dialog";
import { useRef, useState } from "react";
import { createReservation } from "@/utils/apis/reservations";
import { ErrorType } from "@/utils/apis/fetch";



type EventFormType = {
    items: DetailedItem[];
}


/**
 * Parent wrapper for the entire reservation form
 */
const EventForm = ({ items }: EventFormType) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [errorAlertMessage, setErrorAlertMessage] = useState<string>();
    const [successOpen, setSuccessOpen] = useState(false);

    const formValues = useRef<EventFormValueTypes>();

    const router = useRouter();

    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const itemUUID = searchParams.get("itemUUID")

    const defaultItem = items.filter(a => a.id == itemUUID).length > 0 ? itemUUID : items[0].id

    const onSubmit = async (values: EventFormValueTypes) => {
        formValues.current = values;
        setAlertOpen(true);
    }

    // Shows an error dialog if the form submit process went wrong
    const showError = (message: string) => {
        setErrorAlertMessage(message);
        setErrorAlertOpen(true)
    }

    const showSuccess = () => {
        setSuccessOpen(true);
    }

    const redirect = () => {
        router.push('/')
    }

    const submitReservation = () => {
        const values = formValues.current;
        // Use the values stored in the state hook
        createReservation({
            bookable_item: values?.item as string,
            description: values?.description as string,
            start_time: values?.from.toISOString() as string,
            end_time: values?.to.toISOString() as string,
        }).then(res => {
            console.log(res);
            showSuccess();
        }).catch(err => {
            const error = err as Error
            const response = JSON.parse(error.message) as ErrorType;
            if (!response.response) throw new Error("Could not parse a proper form error");
            const body = response.response[Object.keys(response.response)[0]] as string;
            showError(body);
        });
    }

    return (
        <>
            <AutoAlertDialog open={successOpen} title="Gratulerer!" description="Reservasjonen er blitt lagt inn 🥳" footerButtons={
                <>
                    <AlertDialogAction onClick={redirect}>Supert!</AlertDialogAction>
                </>
            } />

            <AutoAlertDialog open={alertOpen} title={"Er du sikker på at du vil legge inn reservasjonen?"} footerButtons={
                <>
                    <AlertDialogCancel onClick={() => setAlertOpen(false)}>Avbryt</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        setAlertOpen(false);
                        submitReservation()
                    }}>Send inn</AlertDialogAction>
                </>
            } description="Når søknaden er sendt inn, kan den ikke fjernes. Vennligst kontroller at alle feltene oppgir riktig informasjon."
            />
            <AutoAlertDialog open={errorAlertOpen} title={"Kunne ikke legge inn reservasjonen."} description={errorAlertMessage} footerButtons={
                <>
                    <AlertDialogAction onClick={() => {
                        setErrorAlertOpen(false);
                    }}>Prøv på nytt</AlertDialogAction>
                </>
            } />
            <EventFormFields initialItem={defaultItem ?? ""} items={items} onSubmit={onSubmit} />
        </>
    )
}

export default EventForm;