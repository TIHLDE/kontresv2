import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginToTIHLDE } from "./server/services/lepton/login";
import { getTIHLDEMemberships, type MembershipResponse } from "./server/services/lepton/get-memberships";
import { getTIHLDEUser, type TIHLDEUser } from "./server/services/lepton/get-user";

type UserRole = 'ADMIN' | 'MEMBER';
type UserData = {
    id: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    leaderOf: string[];
    TIHLDE_Token: string;
}

type UserDataNoToken = Omit<UserData, 'TIHLDE_Token'>;

declare module 'next-auth' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserData {}
    type AdapterUser = object

    interface Session {
        user: UserDataNoToken;
    }
}

// @ts-expect-error JWT module is not defined in next-auth for some reason
declare module 'next-auth/jwt' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface JWT extends UserData {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login',
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
                    console.error("No credentials sent in login request!");
                    return null;
                }
                if (typeof credentials.username != "string" || typeof credentials.password != "string") {
                    console.error("Missing username or password in login request!");
                    return null;
                }

                const token = await loginToTIHLDE(
                    credentials.username,
                    credentials.password,
                );

                if (!token) {
                    console.error("No token from TIHLDE auth response!");
                    return null;
                }

                const [memberships, user] = await Promise.all([
                    getTIHLDEMemberships(token),
                    getTIHLDEUser(token, credentials.username),
                ]);

                const TIHLDEInfo = getTIHLDEUserInfo(user, memberships);
                if (!TIHLDEInfo.isMember) {
                    console.error('Not a member of TIHLDE');
                    return null;
                }

                const userData = {
                    id: user.user_id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    role: TIHLDEInfo.isAdmin ? 'ADMIN' : 'MEMBER',
                    leaderOf: TIHLDEInfo.leaderOf,
                    TIHLDE_Token: token,
                }

                return userData as UserData;
            },
        })
    ],
    callbacks: {
        jwt({ user, token }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        
        // @ts-expect-error Session is not in the correct format
        session({ session, token }) {
            const sessionData: {
                user: UserDataNoToken;
            } = session as never;
            sessionData.user = token.user as UserDataNoToken;
            // @ts-expect-error TIHLDE_Token is not in UserDataNoToken
            delete sessionData.user.TIHLDE_Token

            return sessionData;
        }
    } 
})

export function getTIHLDEUserInfo(
    user: TIHLDEUser | null,
    memberships: MembershipResponse | null,
):
    | { isMember: false }
    | { isMember: true; leaderOf: string[]; isAdmin: boolean } {
    if (!user) return { isMember: false };
    if (!memberships) return { isMember: false };
    if (user.study.membership_type !== 'MEMBER') return { isMember: false };

    const leaderOf = memberships.results
        .filter((m) => m.membership_type === 'LEADER')
        .map((m) => m.group.slug);

    const adminGroups = ['index', 'hs'];

    return {
        isMember: true,
        leaderOf,
        isAdmin: memberships?.results.some((r) =>
            adminGroups.includes(r.group.slug),
        ),
    };
}