import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Hide admin from search engines
        },
        sitemap: 'https://yipengchunhui.vercel.app/sitemap.xml', // Your Vercel domain
    };
}
