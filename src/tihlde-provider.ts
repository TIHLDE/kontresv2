import type { OAuthConfig, OAuthUserConfig } from '@auth/core/providers';
import { User } from 'next-auth';
import 'next-auth/providers/github';

type TIHLDEConfig = {
    baseUrl: string;
    apiBaseUrl: string;
};
type TIHLDEUser = {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    image?: string;
};

export default function TIHLDE(
    config: TIHLDEConfig,
): (options: OAuthUserConfig<TIHLDEUser>) => OAuthConfig<TIHLDEUser> {
    console.log('TIHLDE Config', config);

    return (options: OAuthUserConfig<TIHLDEUser>): OAuthConfig<TIHLDEUser> => {
        return {
            id: 'tihlde',
            name: 'TIHLDE',
            type: 'oauth',

            authorization: {
                url: `${config.baseUrl}/auth/oauth`,
                params: {
                    client_id: options.clientId,
                },
            },

            client: {
                token_endpoint_auth_method: 'client_secret_post',
                // client_id: options.clientId,
                // client_secret: options.clie
            },

            token: `${config.apiBaseUrl}/auth/oauth/access_token`,

            userinfo: {
                url: `${config.apiBaseUrl}/users/me`,
                // @ts-expect-error Something is wrong with the types here
                async request({ tokens, provider }) {
                    const profile: TIHLDEUser = await fetch(
                        // eslint-disable-next-line
                        provider.userinfo?.url as URL,
                        {
                            headers: {
                                // eslint-disable-next-line
                                'X-CSRF-Token': tokens?.access_token,
                                'User-Agent': 'authjs',
                            },
                        },
                    ).then(async (res) => (await res.json()) as TIHLDEUser);
                    console.log('TIHLDE Profile', profile);
                    console.log('TIHLDE Tokens', tokens);
                    return profile;
                },
            },
            async profile(profile) {
                return {
                    id: profile.user_id.toString(),
                    name: profile.first_name + ' ' + profile.last_name,
                    email: profile.email,
                    image: profile.image,
                    profile,
                };
            },
        };
    };
}
