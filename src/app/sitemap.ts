import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://musgana-web-9onp.vercel.app'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
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
            lastModified: new Date(),
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
            lastModified: new Date(),
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
            lastModified: new Date(),
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
            lastModified: new Date(),
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
            lastModified: new Date(),
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
            lastModified: new Date(),
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
            lastModified: new Date(),
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
            lastModified: new Date(),
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
