'use server';

import { type ReservationState } from './types';

/**
 * Updates the state of a reservation to the given state.
 */
export const setReservationState = (uuid: string, state: ReservationState) => {
    // return IFetch<DetailedReservation>({
    //     url: `${baseUrl}/kontres/reservations/${uuid}/`,
    //     config: {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             state,
    //         }),
    //     },
    // });
};