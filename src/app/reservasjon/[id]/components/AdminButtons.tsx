'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LoadingSpinner } from '@/components/ui/loadingspinner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';



import { usePop } from '@/utils/animations/buttonPop';
import { useShake } from '@/utils/animations/shake';
import { deleteReservation, invalidateReservations, setReservationState } from '@/utils/apis/reservations';
import { ReservationState } from '@/utils/apis/types';



import { StateAtomType, stateAtom } from './ReservationMeta';
import { useAtom } from 'jotai';
import { Delete, MoreVertical, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';


interface AdminButtonsProps {
    reservationId: string;
}

type Flags<T extends PropertyKey> = Record<T, StateAtomType>;

const mapObject: Flags<ReservationState> = {
    CONFIRMED: 'Bekreftet',
    PENDING: 'Avventer',
    CANCELLED: 'Avslått',
};

const AdminButtons = ({ reservationId }: AdminButtonsProps) => {
    const [rejectLoading, setRejectLoading] = useState(false);
    const [acceptLoading, setAcceptLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const acceptRef = useRef<HTMLButtonElement | null>(null);
    const rejectRef = useRef<HTMLButtonElement | null>(null);

    const router = useRouter();

    const pop = usePop();
    const shake = useShake();

    const [state, setState] = useAtom(stateAtom);

    const { toast } = useToast();

    /**
     * Function for informing the user about a success. Shows a toast with a message.
     */
    const informSuccess = () => {
        toast({
            title: 'Vellykket!',
            description: 'Endringene er lagret.',
        });
    };

    /**
     * Function for informing the user about a failure. Shows a toast with a message.
     */
    const informFailure = (
        detailedErrorMessage: string | undefined = undefined,
    ) => {
        toast({
            title: 'Noe gikk galt.',
            description: detailedErrorMessage || 'En uventet feil oppstod.',
            variant: 'destructive',
        });
    };

    /**
     * Function for rejecting a reservation
     */
    const onReject = () => {
        // Reject the reservation
        setRejectLoading(true);
        setReservationState(reservationId, 'CANCELLED')
            .then((data) => {
                setRejectLoading(false);
                invalidateReservations();
                informSuccess();
                pop.run({ ref: rejectRef });
                setState(mapObject[data.state]);
            })
            .catch((err) => {
                informFailure();
                setRejectLoading(false);
                shake.run({ ref: rejectRef });
            });
    };

    /**
     * Function for accepting a reservation
     */
    const onAccept = () => {
        // Accept the reservation
        setAcceptLoading(true);
        setReservationState(reservationId, 'CONFIRMED')
            .then((data) => {
                setAcceptLoading(false);
                invalidateReservations();
                pop.run({ ref: acceptRef });
                informSuccess();
                setState(mapObject[data.state]);
            })
            .catch((err) => {
                try {
                    const errorObj = JSON.parse(err.message);
                    const detailedErrorMessage =
                        errorObj.response?.non_field_errors[0] ||
                        'An unknown error occurred';
                    informFailure(detailedErrorMessage);
                } catch (parseError) {
                    console.error(
                        'Error parsing the error message:',
                        parseError,
                    );
                    informFailure();
                }
                setAcceptLoading(false);
                shake.run({ ref: acceptRef });
            });
    };

    /**
     * Function for deleting a reservation
     */
    const onDeleteReservation = () => {
        // Delete the reservation
        return deleteReservation(reservationId).catch((err) => {
            informFailure(err.message);
            throw new Error();
        });
    };

    return (
        <div className="w-full flex flex-col gap-3 p-5">
            <div className="w-full flex flex-col md:flex-row gap-3">
                <Button
                    ref={acceptRef}
                    className="w-full"
                    onClick={onAccept}
                    disabled={acceptLoading || rejectLoading}
                >
                    {acceptLoading ? <LoadingSpinner /> : 'Godkjenn'}
                </Button>
                <Button
                    ref={rejectRef}
                    className="w-full"
                    onClick={onReject}
                    variant={'destructive'}
                    disabled={acceptLoading || rejectLoading}
                >
                    {rejectLoading ? <LoadingSpinner /> : 'Avslå'}
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline" className="px-2 md:w-fit w-full">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Handlinger</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => setDeleteOpen(!deleteOpen)}
                        >
                            Slett
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialog
                    open={deleteOpen}
                    onOpenChange={(open) => setDeleteOpen(open)}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Denne handlingen kan ikke angres.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="">
                                Avbryt
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-destructive text-background"
                                onClick={() => {
                                    setDeleteLoading(true);
                                    onDeleteReservation()
                                        .then(() => {
                                            setDeleteOpen(false);
                                            router.back();
                                            invalidateReservations();
                                        })
                                        .finally(() => {
                                            setDeleteLoading(false);
                                        });
                                }}
                            >
                                {deleteLoading ? <LoadingSpinner /> : 'Slett'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default AdminButtons;