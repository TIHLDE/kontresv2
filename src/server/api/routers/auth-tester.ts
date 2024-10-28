import {
    adminProcedure,
    createTRPCRouter,
    groupLeaderProcedure,
    memberProcedure,
} from '@/server/api/trpc';

export const authTesterRouter = createTRPCRouter({
    adminTest: adminProcedure.query(({ ctx }) => {
        return {
            message: `Hello, ${ctx.session.user.firstName}!`,
            userData: ctx.session.user,
            isAdmin: ctx.session.user.role === 'ADMIN',
        };
    }),

    memberTest: memberProcedure.query(({ ctx }) => {
        if (!ctx.session?.user) {
            return {
                message: 'Hello, stranger!',
                userData: null,
                isMember: false,
            };
        }
        return {
            message: `Hello, ${ctx.session.user.firstName}!`,
            userData: ctx.session.user,
        };
    }),

    groupLeaderTest: groupLeaderProcedure.query(({ ctx }) => {
        return {
            message: `Hello, ${ctx.session.user.firstName}!`,
            userData: ctx.session.user,
        };
    }),
});
