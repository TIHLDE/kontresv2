import BookableItems from '@/components/ui/bookable-items';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { PrismaClient } from '@prisma/client';
import { group } from 'console';
import { get } from 'http';
import { z } from 'zod';
import { BookableItem } from '@prisma/client';

const prisma = new PrismaClient();

export const faqRouter = createTRPCRouter({

    //get all FAQs
    getAll: publicProcedure
    .input(z.object({
        limit: z.number().min(1).max(100).optional(),
        cursor: z.number().nullish(),
        direction: z.enum(['forward', 'backward']),
        filter: z.string().optional(),
    }))
    .query(async ({ctx,input}) => {
        const limit = input.limit ?? 50;
        const {cursor} = input;


        const faqs = await ctx.db.fAQ.findMany({
            take: limit + 1,
            cursor: cursor ? {questionId: cursor} : undefined,
            where: {
                question: {
                    contains: input.filter
                }
            },
            orderBy: {
                questionId: "asc"
            },
            include: {
                bookableItems: true,
            } 
        });

        let nextCursor: typeof cursor | undefined = undefined;
        if (faqs.length > limit) {
            const nextItem = faqs.pop();
            nextCursor = nextItem!.questionId;
        }

        return {
            faqs,
            nextCursor,
        }
    }),

    //get FAQ by id
    getById: publicProcedure
    .input(z.object({
        questionId: z.number(),
    }))
    .query(async ({input}) => {
        const faq = await prisma.fAQ.findUnique({
            where: {
                questionId: input.questionId,
            },
            include: {
                bookableItems: true,
            }
        });

        if (!faq) {
            throw new Error("Question could not be found!")
        }

        return faq;
    }),

    //create new question
    create: publicProcedure.input(z.object({
        question: z.string(),
        answer: z.string(),
        group: z.string(),
        author: z.string(),
        bookableItemIds: z.array(z.number()),
    })).mutation(async ({input}) => {
            const newFAQ = await prisma.fAQ.create({
                data: {
                    question: input.question,
                    answer: input.answer,
                    group: input.group,
                    bookableItems: {
                        connect: input.bookableItemIds.map(id => ({
                            itemId: id,
                        }))
                    },
                    author: input.author
                },
            });
            return newFAQ;
    }),
});