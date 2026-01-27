import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Hide admin from search engines
        },
        sitemap: 'https://abf-material-website.vercel.app/sitemap.xml', // Your Vercel domain
    };
}
