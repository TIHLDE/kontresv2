import { createTRPCRouter, memberProcedure } from '@/server/api/trpc';

import { z } from 'zod';

export const groupRouter = createTRPCRouter({
    getAll: memberProcedure.query(async ({ ctx }) => {
        return await ctx.db.group.findMany();
    }),

    getById: memberProcedure
        .input(z.object({ groupId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.group.findUnique({
                where: input,
            });
        }),
});
