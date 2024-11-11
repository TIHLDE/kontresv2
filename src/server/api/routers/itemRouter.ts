import { BookableItemModel, GroupModel } from '@/server/db/zod';

import {
    createTRPCRouter,
    groupLeaderProcedure,
    memberProcedure,
} from '../trpc';
import { z } from 'zod';

export const itemRouter = createTRPCRouter({
    getItem: memberProcedure
        .input(z.string())
        .output(BookableItemModel.nullable())
        .query(async ({ input: itemSlug, ctx }) => {
            return await ctx.db.bookableItem.findUnique({
                where: { itemSlug },
            });
        }),

    getItems: memberProcedure.query(({ ctx }) => {
        return ctx.db.bookableItem.findMany({});
    }),

    getItemsFromGroup: memberProcedure
        .input(z.string())
        .output(
            z.array(
                BookableItemModel.extend({ group: GroupModel }).omit({
                    groupSlug: true,
                }),
            ),
        )
        .query(({ ctx, input: groupSlug }) => {
            return ctx.db.bookableItem.findMany({
                where: { groupSlug },
                include: { group: true },
            });
        }),
    getItemFromGroup: memberProcedure
        .input(
            z.object({
                groupId: z.string(),
                itemSlug: z.string(),
            }),
        )
        .output(
            BookableItemModel.extend({
                group: GroupModel,
            })
                .omit({ groupSlug: true })
                .nullable(),
        )
        .query(({ input, ctx }) => {
            return ctx.db.bookableItem.findFirst({
                where: {
                    groupSlug: input.groupId,
                    itemSlug: input.itemSlug,
                },
                include: {
                    group: true,
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
                groupSlug: z.string(),
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
