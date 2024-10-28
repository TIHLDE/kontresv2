import { createTRPCRouter, memberProcedure } from '@/server/api/trpc';

import BookableItems from '@/components/ui/bookable-items';

import { PrismaClient } from '@prisma/client';
import { group } from 'console';
import { get } from 'http';
import { z } from 'zod';

const prisma = new PrismaClient();

export const faqRouter = createTRPCRouter({
    //get all FAQs
    getAll: memberProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).optional(),
                cursor: z.number().nullish(),
                direction: z.enum(['forward', 'backward']),
                filter: z.string().optional(),
            }),
        )
        .query(async (options) => {
            const { input } = options;
            const limit = input.limit ?? 50;
            const { cursor } = input;

            const faqs = await prisma.fAQ.findMany({
                take: limit + 1,
                cursor: cursor ? { questionId: cursor } : undefined,
                where: {
                    question: {
                        contains: input.filter,
                    },
                },
                orderBy: {
                    questionId: 'asc',
                },
                include: {
                    bookableItems: true,
                },
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (faqs.length > limit) {
                const nextItem = faqs.pop();
                nextCursor = nextItem!.questionId;
            }

            return {
                faqs,
                nextCursor,
            };
        }),

    //get FAQ by id
    getById: memberProcedure
        .input(
            z.object({
                questionId: z.number(),
            }),
        )
        .query(async ({ input }) => {
            const faq = await prisma.fAQ.findUnique({
                where: {
                    questionId: input.questionId,
                },
                include: {
                    bookableItems: true,
                },
            });

            if (!faq) {
                throw new Error('Question could not be found!');
            }

            return faq;
        }),

    //create new question
    create: memberProcedure
        .input(
            z.object({
                question: z.string(),
                answer: z.string(),
                group: z.string(),
                author: z.string(),
                bookableItemId: z.number(),
            }),
        )
        .mutation(async ({ input }) => {
            const newFAQ = await prisma.fAQ.create({
                data: {
                    question: input.question,
                    answer: input.answer,
                    group: input.group,

                    author: input.author,
                },
            });
            return newFAQ;
        }),
});
