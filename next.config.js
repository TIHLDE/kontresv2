/* const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    },
    compress: false,
} */

const nextConfig = async (phase, { defaultConfig }) => {

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        ...defaultConfig,
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: '**',
                }
            ]
        },
        webpack(webpackConfig) {
            return {
                ...webpackConfig,
                optimization: {
                    minimize: false
                }
            }
        }
    }

    return nextConfig;
}

module.exports = nextConfig;
