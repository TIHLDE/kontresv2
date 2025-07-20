import { createTRPCRouter, memberProcedure } from '../trpc';
import { env } from '@/env';
import { z } from 'zod';

interface UsersApiResponse {
    results: Array<{
        user_id: string;
        first_name: string;
        [key: string]: unknown;
    }>;
}

export const userRouter = createTRPCRouter({
    getUsers: memberProcedure
        .input(
            z.object({
                name: z.string(),
                page: z.number().default(1),
            }),
        )
        .query(async ({ input, ctx }) => {
            const { name, page } = input;

            const response = await fetch(
                `${env.LEPTON_API_URL}/users/?search=${name}&page=${page}`,
                {
                    headers: {
                        'X-CSRF-Token': ctx.session.user.TIHLDE_Token,
                    },
                },
            );

            const data = (await response.json()) as UsersApiResponse;

            const users = data.results.map((user) => ({
                id: user.user_id,
                name: user.first_name,
            }));

            return users;
        }),
});
