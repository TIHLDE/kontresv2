import { env } from '../../../env';

/**
 * Get a TIHLDE user's group memberships information
 * @param token TIHLDE token
 * @returns The user's membership info
 */
export const getTIHLDEMemberships = async (
    token: string,
): Promise<MembershipResponse> => {
    const response = await fetch(
        `${env.LEPTON_API_URL}/users/me/memberships/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': token,
            },
        },
    );

    if (!response.ok) {
        console.error(
            response.status,
            response.statusText,
            await response.json(),
        );
        throw new Error('Failed to fetch memberships');
    }

    return (await response.json()) as MembershipResponse;
};

export interface MembershipResponse {
    count: number;
    next: null;
    previous: null;
    results: Result[];
}

export interface Result {
    group: Group;
    membership_type: string;
    created_at: string;
    expiration_date: null;
}

export interface Group {
    name: string;
    slug: string;
    type: string;
    viewer_is_member: boolean;
    image: null | string;
    image_alt: null;
}
