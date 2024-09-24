import { createTRPCRouter, memberProcedure } from '@/server/api/trpc';

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

    // getLatest: publicProcedure.query(async ({ ctx }) => {
    //     const post = await ctx.db.post.findFirst({
    //         orderBy: { createdAt: 'desc' },
    //     });

    //     return post ?? null;
    // }),
});
