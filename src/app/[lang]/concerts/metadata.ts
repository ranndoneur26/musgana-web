import type { Metadata } from "next";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    if (lang === "en") {
        return {
            title: "La Musgaña Live Concerts | Upcoming Tour Dates & Booking",
            description:
                "See La Musgaña live — upcoming concerts, tour dates, and festival appearances. Book La Musgaña for your event. Spanish folk band performing Iberian traditional music across Europe and worldwide.",
            keywords: [
                "La Musgaña live",
                "La Musgaña concerts",
                "La Musgaña tour dates",
                "La Musgaña booking",
                "Spanish folk band live",
                "Iberian folk concerts",
                "Spanish world music band live",
                "folk music from Castile and León live",
            ],
            openGraph: {
                title: "La Musgaña Live Concerts & Tour Dates",
                description:
                    "Upcoming concerts and festival appearances. Book La Musgaña — Spanish folk band with hurdy-gurdy, bagpipes, and flute & tabor.",
                locale: "en_US",
                alternateLocale: "es_ES",
            },
            alternates: {
                canonical: "https://musgana-web-9onp.vercel.app/en/concerts",
                languages: {
                    es: "https://musgana-web-9onp.vercel.app/es/concerts",
                    en: "https://musgana-web-9onp.vercel.app/en/concerts",
                },
            },
        };
    }

    return {
        title: "La Musgaña Conciertos | Próximas Fechas y Contratación",
        description:
            "Próximos conciertos de La Musgaña, grupo de música folk española. Calendario de actuaciones, festivales y giras. Contratar La Musgaña para tu evento. Folk castellano y leonés en directo.",
        keywords: [
            "La Musgaña conciertos",
            "contratar La Musgaña",
            "La Musgaña booking",
            "La Musgaña caché",
            "La Musgaña en directo",
            "conciertos folk castellano",
            "folk ibérico en vivo",
            "música tradicional de Castilla y León en directo",
            "grupo de música folk española conciertos",
        ],
        openGraph: {
            title: "La Musgaña Conciertos | Próximas Fechas",
            description:
                "Calendario de conciertos y festivales de La Musgaña. Contratar grupo de folk castellano y leonés.",
            locale: "es_ES",
            alternateLocale: "en_US",
        },
        alternates: {
            canonical: "https://musgana-web-9onp.vercel.app/es/concerts",
            languages: {
                es: "https://musgana-web-9onp.vercel.app/es/concerts",
                en: "https://musgana-web-9onp.vercel.app/en/concerts",
            },
        },
    };
}
