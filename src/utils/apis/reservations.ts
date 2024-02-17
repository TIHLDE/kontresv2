'use server';

import { IFetch } from './fetch';
import { DetailedItem, DetailedReservation, Reservations } from './types';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * Gets a specific reservation given a reservation UUID.
 *
 * TODO - Perform proper sanitization for the uuid when it
 * is placed in the query url.
 * @param uuid The UUID
 * @returns Reservation details
 */
export const getReservation = (uuid: string) => {
    return IFetch<DetailedReservation>({
        url: `${baseUrl}/kontres/reservations/${uuid}/`,
        config: {
            method: 'GET',
        },
    });
};

//gets all reservations
//in progress
export const getReservations = () => {
    return IFetch<Reservations>({
        url: `${baseUrl}/kontres/reservations`,
        config: {
            method: 'GET',
        },
    });
};

export const getBookableItem = (id: string) => {
    return IFetch<DetailedItem>({
        url: `${baseUrl}/kontres/bookable_items/` + id,
        config: {
            method: 'GET',
        },
    });
};

/**
 * Registers a reservation with the backend.
 *
 * @returns Reservation details
 */
export const createReservation = ({
    ...rest
}: Omit<DetailedReservation, 'state' | 'created_at' | 'author' | 'id'>) => {
    const body = {
        ...rest,
        author: 'index',
    };
    return IFetch<DetailedReservation>({
        url: `${baseUrl}/kontres/reservations/`,
        config: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    });
};
