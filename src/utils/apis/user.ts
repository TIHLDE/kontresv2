'use server';

import { IFetch } from './fetch';
import { Memberships, User } from './types';
import { cookies } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

export const getUser = (user_id: string, password: string) => {
    return IFetch<string>({
        url: `${baseUrl}/auth/login`,
        config: {
            method: 'POST',
            body: JSON.stringify({ user_id, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });
};

/**
 * Gets user data from backend, including image link, gender, and more.
 */
export const getUserData = (user_id: User['user_id']) => {
    return IFetch<User>({
        url: `${baseUrl}/users/${user_id}`,
        config: {
            method: 'GET',
            next: {
                revalidate: 0,
            },
        },
    });
};

export const getUserMemberships = () => {
    return IFetch<Memberships>({
        url: `${baseUrl}/users/me/memberships`,
        config: {
            method: 'GET',
            next: {
                revalidate: 0,
            },
        },
    });
};

export const isAdmin = async () => {
    const memberships = (await getUserMemberships()).results.map(
        (membership) => membership.group.slug,
    );

    return memberships.includes('hs') || memberships.includes('index');
};

/**
 * Automatically finds the user id cookie, and gets the associated user data.
 */
export const getCurrentUserData = async () => {
    const id = await cookies().get('user_id');
    return getUserData(id?.value ?? '');
};

/**
 * Removes token and user_id cookies, which effectively logs the user out.
 * The client must also perform a reload for the middleware to redirect to
 * the login page.
 */
export const signOutUser = () => {
    // Delete cookies
    cookies().delete('user_id');
    cookies().delete('token');
};
