'use server';

// import { IFetch } from "./fetch";
import { type DetailedItem, validationTags } from './types';
import { revalidateTag } from 'next/cache';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

/* 
    !!!: The following two functions are very similar because there is no backend implementation for getting specific items. 
    Therefore, both functions do the same as of now.
*/

/**
 * Gets a specific item given an item UUID.
 *
 * @param uuid The UUID
 * @returns Item details
 */
export const getItem = (uuid: string) => {
    //   return IFetch<DetailedItem[]>({
    //     url: `${baseUrl}/kontres/bookable_items/${uuid}/`,
    //     config: {
    //       method: "GET"
    //     }
    //   });
};

/**
 * Gets all items in the database.
 *
 * @returns A list of all reservalble items
 */
export const getItems = () => {
    //   return IFetch<DetailedItem[]>({
    //     url: `${baseUrl}/kontres/bookable_items/`,
    //     config: {
    //       method: "GET",
    //       next: {
    //         tags: [validationTags.bookableItems]
    //       }
    //     }
    //   });
};

/**
 * Registers a new bookable item in backend
 */
export const createItem = (
    data: Omit<DetailedItem, 'id' | 'updated_at' | 'created_at'>,
) => {
    //   return IFetch<DetailedItem>({
    //     url: `${baseUrl}/kontres/bookable_items/`,
    //     config: {
    //       body: JSON.stringify(data),
    //       method: "POST",
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   });
};

export const updateItem = (
    uuid: string,
    data: Omit<DetailedItem, 'id' | 'updated_at' | 'created_at'>,
) => {
    //   return IFetch<DetailedItem>({
    //     url: `${baseUrl}/kontres/bookable_items/${uuid}/`,
    //     config: {
    //       body: JSON.stringify(data),
    //       method: "PATCH",
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   });
};

export const deleteItem = (uuid: string) => {
    //   return IFetch({
    //     url: `${baseUrl}/kontres/bookable_items/${uuid}/`,
    //     config: {
    //       method: "DELETE"
    //     }
    //   });
};

export const invalidateItems = () => {
    revalidateTag(validationTags.bookableItems);
};
