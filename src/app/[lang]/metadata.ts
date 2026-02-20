import type { Metadata } from "next";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    if (lang === "en") {
        return {
            title: "La Musgaña | 40 Years of Iberian Folk & Traditional Spanish Music",
            description:
                "La Musgaña: 40 years of Iberian folk and traditional Spanish music. Explore their full discography, upcoming concerts and the band's history since 1986.",
            keywords: [
                "La Musgaña",
                "La Musgaña band",
                "La Musgaña live",
                "La Musgaña discography",
                "Spanish folk band",
                "Iberian folk music",
                "Castilian traditional music",
                "traditional music from Spain",
                "folk music from Castile and León",
                "hurdy-gurdy Spanish folk",
                "Spanish bagpipes folk",
                "sanabresa bagpipe",
                "traditional flute and tabor Spain",
                "Spanish world music band",
                "Iberian world music",
                "European folk music Spain",
                "book La Musgaña",
                "La Musgaña booking",
            ],
            openGraph: {
                type: "website",
                url: "https://www.lamusgaña.net/en",
                title: "La Musgaña | 40 Years of Iberian Folk & Traditional Spanish Music",
                description:
                    "Pioneers of Iberian folk since 1986, La Musgaña celebrates 40 years blending traditional music from Castile and León with hurdy-gurdy, Spanish bagpipes and flute & tabor. Discography, concerts & booking.",
                locale: "en_US",
                alternateLocale: "es_ES",
            },
            twitter: {
                card: "summary_large_image",
                title: "La Musgaña | 40 Years of Iberian Folk & Traditional Spanish Music",
                description:
                    "Pioneers of Iberian folk since 1986. Hurdy-gurdy, Spanish bagpipes and flute & tabor. Discography, concerts & booking.",
            },
            alternates: {
                canonical: "https://www.lamusgaña.net/en",
                languages: {
                    es: "https://www.lamusgaña.net/es",
                    en: "https://www.lamusgaña.net/en",
                },
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                },
            },
        };
    }

    // Spanish (default)
    return {
        title: "La Musgaña | 40 Años de Folk Ibérico y Música Tradicional Española",
        description:
            "La Musgaña: 40 años de folk ibérico y música tradicional española. Explora su discografía completa, próximos conciertos y toda la historia del grupo desde 1986.",
        keywords: [
            "La Musgaña",
            "La Musgaña conciertos",
            "La Musgaña discografía",
            "grupo de música folk española",
            "folk español",
            "folk castellano",
            "folk castellano y leonés",
            "música tradicional de Castilla y León",
            "folk ibérico",
            "música tradicional peninsular",
            "gaita sanabresa",
            "zanfona",
            "flauta de tres agujeros y tamboril",
            "contratar La Musgaña",
            "La Musgaña booking",
            "música folk española",
            "música tradicional española",
            "world music española",
        ],
        openGraph: {
            type: "website",
            url: "https://www.lamusgaña.net/es",
            title: "La Musgaña | 40 Años de Folk Ibérico y Música Tradicional Española",
            description:
                "Referentes del folk ibérico desde 1986, La Musgaña celebra 40 años fusionando música tradicional castellana y leonesa con gaita sanabresa, zanfona y flauta de tres agujeros. Discografía, conciertos y mucho más.",
            locale: "es_ES",
            alternateLocale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: "La Musgaña | 40 Años de Folk Ibérico y Música Tradicional Española",
            description:
                "Referentes del folk ibérico desde 1986. Gaita sanabresa, zanfona y flauta de tres agujeros. Discografía, conciertos y contratación.",
        },
        alternates: {
            canonical: "https://www.lamusgaña.net/es",
            languages: {
                es: "https://www.lamusgaña.net/es",
                en: "https://www.lamusgaña.net/en",
            },
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
    };
}
