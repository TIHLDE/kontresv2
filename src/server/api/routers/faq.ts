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
    getAll: publicProcedure.query(async () => {
        const faqs = await prisma.fAQ.findMany({
            include: {
                bookableItems: true
            }
        });
        return faqs
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