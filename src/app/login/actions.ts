'use server';

import { signIn } from '@/auth';


export async function loginUser(
    username: string,
    password: string,
    redirectUrl = '/',
) {
    try {
        await signIn('tihlde', {
            redirectTo: redirectUrl,
            username,
            password,
        });
    } catch (error) {
        // TODO: Show error to user
        console.error(error);
    }
}