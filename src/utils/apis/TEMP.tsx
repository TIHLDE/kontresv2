"use server"

import { IFetch } from "./fetch";
import { User } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * Gets user data from backend, including image link, gender, and more.
 */
export const getUserData = (user_id: User['user_id']) => {
    return IFetch<User>({
        url: `${baseUrl}/users/${user_id}`,
        config: { method: 'GET' }
    })
}