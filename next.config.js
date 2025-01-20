/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
                // Allow all https domains
                protocol: 'https',
                hostname: '*',
            },
            {
                // Allow all http domains
                protocol: 'http',
                hostname: '*',
            },
        ],
    },
};

export default config;
