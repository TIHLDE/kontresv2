import { type ReservationWithAuthor } from '@/server/dtos/reservations';
import { User } from '@/server/dtos/user';

import {
    createTRPCRouter,
    groupLeaderProcedure,
    memberProcedure,
} from '../trpc';
import { ReservationState } from '@prisma/client';
import { z } from 'zod';

export const reservationRouter = createTRPCRouter({
    getReservation: memberProcedure
        .input(z.number())
        .query(({ input: reservationId, ctx }) => {
            return ctx.db.reservation.findUnique({
                where: { reservationId },
            });
        }),

    getReservations: memberProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).optional(),
                cursor: z.number().nullish(),
                direction: z.enum(['forward', 'backward']),
                state: z.nativeEnum(ReservationState).optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 20;
            const { cursor } = input;

            const reservations = (await ctx.db.reservation.findMany({
                take: limit + 1,
                cursor: cursor ? { reservationId: cursor } : undefined,
                where: {
                    status: input.state,
                },
                orderBy: {
                    reservationId: 'asc',
                },
            })) as ReservationWithAuthor[];

            let nextCursor: typeof cursor | undefined = undefined;
            if (reservations.length > limit) {
                const nextItem = reservations.pop();
                nextCursor = nextItem!.reservationId;
            }

            await Promise.all(
                reservations.map(async (reservation) => {
                    // Fetch the proper author object from Lepton for each author
                    try {
                        const user = (await ctx.Lepton.getUserById(
                            reservation.authorId,
                        ).then((user) => user.json())) as User;

                        console.log(user);

                        reservation.author = user;
                    } catch (error) {
                        console.error(
                            "Could not fetch user's data from Lepton",
                            error,
                        );
                    }
                }),
            );

            return {
                reservations,
                nextCursor,
            };
        }),

    getUserReservations: memberProcedure
        .input(z.object({ userId: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.db.reservation.findMany({
                where: { authorId: input.userId },
            });
        }),

    create: memberProcedure
        .input(
            z.object({
                servesAlcohol: z.boolean(),
                desciption: z.string(),
                soberWatch: z.string(),
                startTime: z.date(),
                endTime: z.date(),
                itemId: z.number(),
                groupId: z.string(),
            }),
        )
        .mutation(({ input, ctx }) => {
            return ctx.db.reservation.create({
                data: {
                    authorId: ctx.session.user.id,
                    groupId: input.groupId,
                    acceptedRules: false,
                    bookableItemId: input.itemId,
                    description: input.desciption,
                    endTime: input.endTime,
                    startTime: input.startTime,
                    soberWatch: input.soberWatch,
                    servesAlcohol: input.servesAlcohol,
                },
            });
        }),
    updateStatus: groupLeaderProcedure
        .input(
            z.object({
                reservationId: z.number(),
                status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
            }),
        )
        .mutation(({ ctx, input }) => {
            if (input.status === 'APPROVED') {
                return ctx.db.reservation.update({
                    where: {
                        reservationId: input.reservationId,
                    },
                    data: {
                        status: input.status,
                        approvedById: ctx.session.user.id,
                    },
                });
            }

            return ctx.db.reservation.update({
                where: {
                    reservationId: input.reservationId,
                },
                data: {
                    status: input.status,
                },
            });
        }),
    delete: groupLeaderProcedure
        .input(z.object({ reservationId: z.number() }))
        .mutation(({ input: { reservationId }, ctx }) => {
            return ctx.db.reservation.delete({
                where: { reservationId },
            });
        }),
});
