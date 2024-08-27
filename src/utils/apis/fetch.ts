'use server';

import { ACCESS_TOKEN, TOKEN_HEADER_NAME } from '../../../constants';
import { cookies } from 'next/headers';

interface IFetchProps {
    url: string;
    config?: RequestInit;
}

export interface ErrorType {
    status?: number;
    statusText?: string;
    response?: Record<string, unknown>;
}

export const IFetch = <T extends unknown>({ url, config }: IFetchProps) => {
    let headers: HeadersInit = {};
    headers[TOKEN_HEADER_NAME] = cookies().get(ACCESS_TOKEN)?.value as string;
    headers = {
        ...headers,
        ...config?.headers,
    };

    return fetch(url, {
        ...config,
        headers,
    })
        .then(async (res) => {
            if (!res.ok) {
                if (res.status === 500) {
                    throw new Error('Internal server error');
                }

                const message = await res.json();
                const errorObject: ErrorType = {
                    status: res.status,
                    statusText: res.statusText,
                    response: message,
                };
                throw new Error(JSON.stringify(errorObject));
            }

            return res.json();
        })
        .catch((err) => {
            throw new Error(err);
        }) as Promise<T>;
};
