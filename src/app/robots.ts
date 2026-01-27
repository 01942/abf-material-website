import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Hide admin from search engines
        },
        sitemap: 'https://www.mat-tech.com/sitemap.xml', // Replace with actual domain
    };
}
