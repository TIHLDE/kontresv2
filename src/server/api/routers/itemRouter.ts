import {
    createTRPCRouter,
    groupLeaderProcedure,
    memberProcedure,
} from '../trpc';
import { z } from 'zod';

export const itemRouter = createTRPCRouter({
    getItem: memberProcedure
        .input(z.number())
        .query(({ input: itemId, ctx }) => {
            return ctx.db.bookableItem.findUnique({
                where: { itemId },
            });
        }),
    getItems: memberProcedure.query(({ ctx }) => {
        return ctx.db.bookableItem.findMany();
    }),

    getItemFromGroup: memberProcedure
        .input(
            z.object({
                groupId: z.string(),
                itemId: z.number(),
            }),
        )
        .query(({ input, ctx }) => {
            return ctx.db.bookableItem.findFirst({
                where: {
                    groupId: input.groupId,
                    itemId: input.itemId,
                },
            });
        }),

    createItem: groupLeaderProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                allowsAlcohol: z.boolean(),
                groupId: z.string(),
            }),
        )
        .mutation(({ ctx, input }) => {
            return ctx.db.bookableItem.create({
                data: {
                    name: input.name,
                    description: input.description,
                    allowsAlcohol: input.allowsAlcohol,
                    groupId: input.groupId,
                },
            });
        }),

    updateItem: groupLeaderProcedure
        .input(
            z.object({
                itemId: z.number(),
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
                where: { itemId: input.itemId },
                data: input.data,
            });
        }),

    deleteItem: groupLeaderProcedure
        .input(z.object({ itemId: z.number() }))
        .mutation(({ ctx, input: { itemId } }) => {
            return ctx.db.bookableItem.delete({
                where: { itemId },
            });
        }),
});
