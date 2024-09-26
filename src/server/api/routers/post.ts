import { adminProcedure, createTRPCRouter, memberProcedure } from '@/server/api/trpc';

import { z } from 'zod';

export const postRouter = createTRPCRouter({
    hello: memberProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    create: memberProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ input }) => {
            return `Hello there, ${input.name}`;
        }),

    adminTest: adminProcedure.query(({ ctx }) => {
        return {
            message: `Hello, ${ctx.session.user.firstName}!`,
            userData: ctx.session.user,
            isAdmin: ctx.session.user.role === 'ADMIN',
        }
    }),

    memberTest: memberProcedure.query(({ ctx }) => {
        if (!ctx.session?.user) {
            return {
                message: 'Hello, stranger!',
                userData: null,
                isMember: false,
            }
        }
        return {
            message: `Hello, ${ctx.session.user.firstName}!`,
            userData: ctx.session.user,
        }
    })



    // getLatest: publicProcedure.query(async ({ ctx }) => {
    //     const post = await ctx.db.post.findFirst({
    //         orderBy: { createdAt: 'desc' },
    //     });

    //     return post ?? null;
    // }),
});
