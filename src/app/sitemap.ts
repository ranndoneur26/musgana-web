import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://xn--lamusgaa-j3a.net";
    const contentPath = path.join(process.cwd(), 'src/data/content.json');
    let lastModified = new Date();

    try {
        const stats = fs.statSync(contentPath);
        lastModified = stats.mtime;
    } catch (error) {
        console.warn("Could not get content.json stats, defaulting to current date", error);
    }

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'yearly',
            priority: 1,
            alternates: {
                languages: {
                    es: `${baseUrl}/es`,
                    en: `${baseUrl}/en`,
                },
            },
        },
        {
            url: `${baseUrl}/es`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1,
            alternates: {
                languages: {
                    es: `${baseUrl}/es`,
                    en: `${baseUrl}/en`,
                },
            },
        },
        {
            url: `${baseUrl}/en`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: {
                    es: `${baseUrl}/es`,
                    en: `${baseUrl}/en`,
                },
            },
        },
        {
            url: `${baseUrl}/es/concerts`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: {
                    es: `${baseUrl}/es/concerts`,
                    en: `${baseUrl}/en/concerts`,
                },
            },
        },
        {
            url: `${baseUrl}/en/concerts`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: {
                    es: `${baseUrl}/es/concerts`,
                    en: `${baseUrl}/en/concerts`,
                },
            },
        },
        {
            url: `${baseUrl}/es/discography`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: {
                languages: {
                    es: `${baseUrl}/es/discography`,
                    en: `${baseUrl}/en/discography`,
                },
            },
        },
        {
            url: `${baseUrl}/en/discography`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: {
                languages: {
                    es: `${baseUrl}/es/discography`,
                    en: `${baseUrl}/en/discography`,
                },
            },
        },
        {
            url: `${baseUrl}/es/videos`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: {
                languages: {
                    es: `${baseUrl}/es/videos`,
                    en: `${baseUrl}/en/videos`,
                },
            },
        },
        {
            url: `${baseUrl}/en/videos`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: {
                languages: {
                    es: `${baseUrl}/es/videos`,
                    en: `${baseUrl}/en/videos`,
                },
            },
        },
    ]
}
