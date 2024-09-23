import {
    type MembershipResponse,
    getTIHLDEMemberships,
} from './services/lepton/get-memberships';
import { getTIHLDEUser } from './services/lepton/get-user';
import { loginToTIHLDE } from './services/lepton/login';
import { type NextAuthOptions, getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            id: 'tihlde',
            name: 'TIHLDE',
            credentials: {
                username: { label: 'username', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials, _req) {
                if (!credentials) {
                    console.error('No credentials sent in login request!');
                    return null;
                }

                const token = await loginToTIHLDE(
                    credentials.username,
                    credentials.password,
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

                if (!role) {
                    console.error('User is not a TIHLDE member');
                    return null;
                }

                const leaderOf = getUserLeaderGroups(memberships);

                const userData = {
                    id: userId,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    role,
                    leaderOf,
                    TIHLDE_Token: token,
                };

                return userData;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.role = user.role;
                token.leaderOf = user.leaderOf;
                token.TIHLDE_Token = user.TIHLDE_Token;
            }

            return token;
        },
        session: async ({ session, token }) => {
            session.user = {
                id: token.id,
                firstName: token.firstName,
                lastName: token.lastName,
                role: token.role,
                leaderOf: token.leaderOf,
            };
            return session;
        },
    },
};

export const getServerAuthSession = () => getServerSession(authOptions);

export const getUserLeaderGroups = (
    memberships: MembershipResponse | null,
): string[] => {
    if (!memberships) {
        return [];
    }

    return memberships.results
        .filter((m) => m.membership_type === 'LEADER')
        .map((m) => m.group.slug);
};

export type UserRole = 'MEMBER' | 'ADMIN';

function getUserRole(memberships: MembershipResponse | null): UserRole | null {
    if (!memberships) return null;

    const adminGroups = ['index', 'hs'];
    if (memberships?.results.some((r) => adminGroups.includes(r.group.slug))) {
        return 'ADMIN';
    }

    return 'MEMBER';
}
