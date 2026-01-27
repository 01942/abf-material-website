import { MetadataRoute } from 'next';
import { getLocalData } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const data = await getLocalData();
    const baseUrl = 'https://yipengchunhui.vercel.app'; // Your Vercel domain

    // Static pages
    const routes = [
        '',
        '/technology',
        '/about',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Product pages
    const products = data.products.map((product: any) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // Dynamic News pages
    const articles = data.articles.map((article: any) => ({
        url: `${baseUrl}/news/${article.id}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...products, ...articles];
}
