// Main file for interacting with lepton services
import { URLS } from './api/urls';
import { env } from '@/env';

const getHeaders = (headers?: HeadersInit) => {
    return {
        'x-csrf-token': env.LEPTON_API_KEY ?? '',
        ...headers,
    };
};

const getUserById = async (userId: string) => {
    console.log(`${env.LEPTON_API_URL}/${URLS.USERS}/${userId}/`);
    return fetch(`${env.LEPTON_API_URL}/${URLS.USERS}/${userId}/`, {
        headers: {
            ...getHeaders(),
        },
    });
};

const Lepton = {
    getUserById,
};

export default Lepton;
