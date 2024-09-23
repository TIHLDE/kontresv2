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

// Session type declaration (what the backend can access on the user object)
declare module 'next-auth' {
    // A Blitzed user
    // We don't want add sensitive info here, since this is sent to
    // the client
    interface User extends DefaultUser {
        id: string;
        nickname: string;
        role: UserRole;
    }

    // The session object only contains the user info
    interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    // This info is added to JWT tokens (used for signing in)
    // this info will be used in the session, so the server (and the client)
    // can know who the user is when they make a request
    interface JWT extends DefaultJWT {
        user: {
            nickname: string;
            role: UserRole;
            id: string;
        };
    }
}

export const authOptions: NextAuthOptions = {
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    id: token.user.id,
                    nickname: token.user.nickname,
                    role: token.user.role,
                },
            };
        },
        jwt: async ({ user, token }) => {
            // Initial sign in
            if (user) {
                return {
                    user: {
                        nickname: user.nickname,
                        role: user.role,
                        id: user.id,
                    },
                };
            }

            // Just return the token back, no need to refresh it :)
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    adapter: PrismaAdapter(db) as Adapter,
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

                // User is authenticated
                // Check memberships and get user
                const [memberships, user] = await Promise.all([
                    getTIHLDEMemberships(token),
                    getTIHLDEUser(token, credentials.username),
                ]);

                const nickname = user.first_name;
                const userId = user.user_id;

                // Check if user is already in db
                console.log(
                    '[TODO] implement db check for existing user',
                    userId,
                );
                const existingUser = null;
                // const existingUser = await db.user.findUnique({
                //   where: {
                //     id: userId,
                //   },
                // });

                const role = getRoleForUser(memberships);

                // If not, create them
                if (!existingUser) {
                    console.log('[TODO] implement db create for new user', {
                        userId,
                        nickname,
                        role,
                    });
                    //   await db.user.create({
                    //     data: {
                    //       id: userId,
                    //       nickname,
                    //       role: role,
                    //     },
                    //   });
                }

                const session = {
                    id: userId,
                    nickname,
                    role: getRoleForUser(memberships),
                };
                return session;
            },
        }),
        // Users can log in anonymously, using only a nickname,
        // we create a random user id (instead of tihlde username),
        // to make a database record for them (for joining teams etc ...)
    ],
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
export type UserRole = 'ADMIN' | 'USER';

/**
 * Get the role of a user, given their memberships (or lack thereof)
 * @param memberships Memberships, if any (null if anonymous user)
 * @returns The role that the user has in Blitzed, aka. what they can access
 */
function getRoleForUser(memberships: MembershipResponse | null): UserRole {

    console.log('[TODO] Implement role check', memberships);

    return "USER";

    if (!memberships) {
        // return "ANONYMOUS";
        console.log('[TODO] Handle null member?', memberships);
        return 'USER';
    }

    // Allow if user is in allowed group slugs

    // console.log('[TODO] Implement group slug check', memberships.results);
    //   if (
    //     memberships.results.some((r) =>
    //       env.ALLOWED_GROUP_SLUGS.includes(r.group.slug),
    //     )
    //   ) {
    //     return "ADMIN";
    //   }

    // Also allow if user is leader in a subgroup (undergruppeleder)
    // if (
    //     memberships.results.some(
    //         (r) =>
    //             r.group.type === 'SUBGROUP' && r.membership_type === 'LEADER',
    //     )
    // ) {
    //     return 'ADMIN';
    // }

    // User for the rest of TIHLDE members
    return 'USER';
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

export const getServerAuthSession = () => getServerSession(authOptions);
