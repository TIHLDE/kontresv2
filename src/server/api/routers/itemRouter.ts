import {
    createTRPCRouter,
    groupLeaderProcedure,
    memberProcedure,
} from '../trpc';
import { z } from 'zod';

export const itemRouter = createTRPCRouter({
    getItem: memberProcedure
        .input(z.string())
        .query(({ input: itemSlug, ctx }) => {
            return ctx.db.bookableItem.findUnique({
                where: { itemSlug },
            });
        }),
    getItems: memberProcedure.query(({ ctx }) => {
        return ctx.db.bookableItem.findMany();
    }),

    getItemFromGroup: memberProcedure
        .input(
            z.object({
                groupId: z.string(),
                itemSlug: z.string(),
            }),
        )
        .query(({ input, ctx }) => {
            return ctx.db.bookableItem.findFirst({
                where: {
                    groupId: input.groupId,
                    itemSlug: input.itemSlug,
                },
            });
        }),

    createItem: groupLeaderProcedure
        .input(
            z.object({
                itemSlug: z.string(),
                name: z.string(),
                description: z.string(),
                allowsAlcohol: z.boolean(),
                groupId: z.string(),
            }),
        )
        .mutation(({ ctx, input: data }) => {
            return ctx.db.bookableItem.create({ data });
        }),

    updateItem: groupLeaderProcedure
        .input(
            z.object({
                itemSlug: z.string(),
                data: z.object({
                    name: z.string().optional(),
                    description: z.string().optional(),
                    allows_alcohol: z.boolean().optional(),
                    image: z.string().optional(),
                }),
            }),
        )
        .mutation(({ ctx, input }) => {
            return ctx.db.bookableItem.update({
                where: { itemSlug: input.itemSlug },
                data: input.data,
            });
        }),

    deleteItem: groupLeaderProcedure
        .input(z.object({ itemSlug: z.string() }))
        .mutation(({ ctx, input: { itemSlug } }) => {
            return ctx.db.bookableItem.delete({
                where: { itemSlug },
            });
        }),
});
