import { type UserRole } from '@/server/auth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import NextAuth from 'next-auth';

interface UserData {
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

    interface Session {
        user: UserDataNoToken;
    }
}

declare module 'next-auth/jwt' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface JWT extends UserData {}
}
