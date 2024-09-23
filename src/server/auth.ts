import { db } from '@/server/db';

import {
    type MembershipResponse,
    getTIHLDEMemberships,
} from './services/lepton/get-memberships';
import { getTIHLDEUser } from './services/lepton/get-user';
import { loginToTIHLDE } from './services/lepton/login';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type DefaultUser, type NextAuthOptions, getServerSession } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import type { DefaultJWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';


import type {} from "next-auth/adapters"

type UserData = {
    id: string;
    role: UserRole;
    leaderOf: string[];
    firstName: string;
    lastName: string;
    TIHLDE_Token: string;
}
type UserDataNoToken = Omit<UserData, 'TIHLDE_Token'>;

// Session type declaration (what the backend can access on the user object)
declare module 'next-auth' {
    interface User {
        lol: string
    }
    interface Session {
        user: UserDataNoToken;
    }
}

declare module 'next-auth/adapters' {
    interface AdapterUser {}
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: UserData,
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        // Login with TIHLDE username and password
        Credentials({
            id: 'tihlde',
            name: 'TIHLDE',
            credentials: {
                username: { label: 'Brukernavn', type: 'text' },
                password: { label: 'Passord', type: 'password' },
            },
            async authorize(credentials, _req) {
                if (!credentials) {
                    console.error('No credentials sent in login request!');
                    return null;
                }

                const token = await loginToTIHLDE(
                    credentials?.username,
                    credentials?.password,
                );
                
                if (!token) {
                    console.error('No token from TIHLDE auth response!');
                    return null;
                }

                const [memberships, user] = await Promise.all([
                    getTIHLDEMemberships(token),
                    getTIHLDEUser(token, credentials.username),
                ]);

                const userId = user.user_id;
                const role = getUserRole(memberships);
                
                // TODO: test if this works
                if (!role) {
                    console.error("User is not a TIHLDE member");
                    return null;
                }
                const leaderOf = getUserLeaderGroups(memberships);

                const jwtData = {
                    id: userId,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    role,
                    leaderOf,
                    TIHLDE_Token: token,
                }

                console.log("[AUTH] User object", jwtData);

                return { lol: "hello "};
            },
        }),
        // Users can log in anonymously, using only a nickname,
        // we create a random user id (instead of tihlde username),
        // to make a database record for them (for joining teams etc ...)
    ],
    callbacks: {
        jwt: async ({ user }) => {
            
            return { user };
        },
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    id: token.user.id,
                    role: token.user.role,
                },
            };
        },
    },
};

/**
 * The role of a Blitzed user
 *
 * - ADMIN: Can create and edit games, and have admin control
 * - USER: Regular user logged in with TIHLDE
 * - ANONYMOUS: Anonymous user who has not logged in with TIHLDE, and uses a custom name
 *
 *  Anonymous users have more limited access
 */
export type UserRole = 'MEMBER' | 'ADMIN';

/**
 * Get the role of a user, given their memberships (or lack thereof)
 * @param memberships Memberships, if any (null if anonymous user)
 * @returns The role that the user has in Blitzed, aka. what they can access
 */
function getUserRole(memberships: MembershipResponse | null): UserRole | null {
    if (!memberships) return null;

    const adminGroups = ['index', 'hs'];
    if (memberships?.results.some((r) => adminGroups.includes(r.group.slug))) {
        return 'ADMIN';
    }

    return 'MEMBER';
}

/**
 * Returns whether the user has a role of TIHLDE or higher
 *
 * Is used for validation
 */
export const isUserRoleTihldeOrHigher = (role: UserRole): boolean => {
    console.log("[TODO] Implement role restrictions for non-offical THILDE members", role);
    return role === "ADMIN" || role === "USER";
};


export const getUserLeaderGroups = (memberships: MembershipResponse | null): string[] => {
    if (!memberships) {
        return [];
    }

    return memberships.results.filter((m) => m.membership_type === 'LEADER').map((m) => m.group.slug);

}

export const getServerAuthSession = () => getServerSession(authOptions);
