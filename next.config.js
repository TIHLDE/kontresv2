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
                protocol: 'https',
                hostname: 'leptonstoragedev.blob.core.windows.net',
                pathname: '/**', // Restrict to the path `/imagejpeg/*`
            },
            {
                protocol: 'https',
                hostname: 'leptonstoragepro.blob.core.windows.net',
                pathname: '/**', // Restrict to the path `/imagejpeg/*`
            },
        ],
    },
};

export default config;
