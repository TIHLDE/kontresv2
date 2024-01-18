"use server"

import { IFetch } from "./fetch";
import { DetailedItem } from "./types";

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
    return IFetch<DetailedItem[]>({
      url: `${baseUrl}/kontres/bookable_items/${uuid}/`,
      config: {
          method: "GET"
      }
    });
  };
  
  /**
   * Gets all items in the database.
   *
   * @returns A list of all reservalble items
   */
  export const getItems = () => {
    return IFetch<DetailedItem[]>({
      url: `${baseUrl}/kontres/bookable_items/`,
      config: {
          method: "GET"
      }
    });
  };