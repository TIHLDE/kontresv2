// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    leaderOf: string[];
    TIHLDE_Token: string;
}

type UserDataNoToken = Omit<UserData, 'TIHLDE_Token'>;

declare module 'next-auth' {
    interface User {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
        leaderOf: string[];
        TIHLDE_Token: string;
    }

    interface Session {
        user: UserDataNoToken;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
        leaderOf: string[];
        TIHLDE_Token: string;
    }
}
