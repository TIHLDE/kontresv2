import { type ReservationWithAuthor } from '@/server/dtos/reservations';
import { User } from '@/server/dtos/user';

import {
    createTRPCRouter,
    groupLeaderProcedure,
    memberProcedure,
} from '../trpc';
import { TimeDirection } from '@/app/admin/utils/enums';
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
                cursor: z.number().nullish().optional(),
                direction: z
                    .enum(['forward', 'backward'])
                    .default('forward')
                    .optional(),
                filters: z.object({
                    state: z.nativeEnum(ReservationState).array().optional(),
                    query: z.string().optional(),
                    group: z.string().array().optional(),
                    fromDate: z.string().optional(),
                    toDate: z.string().optional(),
                    bookableItem: z.number().array().optional(),
                    timeDirection: z
                        .nativeEnum(TimeDirection)
                        .array()
                        .optional(),
                }),
            }),
        )
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 20;
            const { cursor } = input;

            try {
                if (input.filters.fromDate)
                    input.filters.fromDate = new Date(
                        input.filters.fromDate,
                    ).toISOString();

                if (input.filters.toDate)
                    input.filters.toDate = new Date(
                        input.filters.toDate,
                    ).toISOString();
            } catch (error) {
                console.error('Could not parse date', error);
                // Handle error?
                return {
                    reservations: [],
                    nextCursor: undefined,
                };
            }

            const reservations = (await ctx.db.reservation.findMany({
                take: limit + 1,
                cursor: cursor ? { reservationId: cursor } : undefined,
                where: {
                    status: {
                        in: input.filters.state,
                    },
                    groupId: {
                        in: input.filters.group,
                    },

                    ...(input.filters.fromDate ||
                    input.filters.toDate ||
                    (input.filters.timeDirection &&
                        input.filters.timeDirection?.length > 0)
                        ? {
                              OR: [
                                  {
                                      startTime: {
                                          gte:
                                              (input.filters.fromDate ??
                                              input.filters.timeDirection?.includes(
                                                  TimeDirection.FORWARD,
                                              ))
                                                  ? new Date()
                                                  : undefined,
                                      },
                                      endTime: {
                                          lte:
                                              (input.filters.toDate ??
                                              input.filters.timeDirection?.includes(
                                                  TimeDirection.BACKWARD,
                                              ))
                                                  ? new Date()
                                                  : undefined,
                                      },
                                  },
                              ],
                          }
                        : {}),

                    bookableItem: {
                        itemId: {
                            in: input.filters.bookableItem,
                        },
                    },
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
                include: {
                    bookableItem: true,
                },
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
