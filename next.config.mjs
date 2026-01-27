/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ensure we trace the data folder for Vercel
    experimental: {
        outputFileTracingIncludes: {
            '/*': ['./data/**/*'],
        },
    },
};

export default nextConfig;
