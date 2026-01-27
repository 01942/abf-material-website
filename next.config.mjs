/** @type {import('next').NextConfig} */
const nextConfig = {
    // Fix: Move outputFileTracingIncludes to root level (Next.js 16+)
    outputFileTracingIncludes: {
        '/*': ['./data/**/*'],
    },
};

export default nextConfig;
