import {
    createTRPCRouter,
    groupLeaderProcedure,
    memberProcedure,
} from '@/server/api/trpc';

import BookableItems from '@/components/ui/bookable-items';

import { PrismaClient } from '@prisma/client';
import { group } from 'console';
import { get } from 'http';
import { z } from 'zod';

const prisma = new PrismaClient();

export const bookableItemRouter = createTRPCRouter({
    //get all bookable items
    getAll: memberProcedure.query(async () => {
        const bookableItems = await prisma.bookableItem.findMany({
            include: {
                //reservations: true
                //FAQs: true
            },
        });
        return bookableItems;
    }),

    //get bookable item by id
    getById: memberProcedure
        .input(
            z.object({
                itemId: z.number(),
            }),
        )
        .query(async ({ input }) => {
            const bookableItem = await prisma.bookableItem.findUnique({
                where: {
                    itemId: input.itemId,
                },
                include: {
                    //reservations: true,
                    //FAQs: true
                },
            });

            if (!bookableItem) {
                throw new Error('The item could not be found!');
            }

            return bookableItem;
        }),

    //create new bookable item
    create: groupLeaderProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                groupId: z.string(),
                allwosAlcohol: z.boolean(),
            }),
        )
        .mutation(async ({ input }) => {
            const newBookableItem = await prisma.bookableItem.create({
                data: {
                    name: input.name,
                    description: input.description,
                    groupId: input.groupId,
                    allowsAlcohol: input.allwosAlcohol,
                },
            });
            return newBookableItem;
        }),
});
