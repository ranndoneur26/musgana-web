import type { Metadata } from "next";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    if (lang === "en") {
        return {
            title: "La Musgaña Videos | Live Performances & Music Videos",
            description:
                "Watch La Musgaña live performances, music videos, and festival recordings. Spanish folk band playing Iberian traditional music with hurdy-gurdy, Spanish bagpipes, and flute & tabor.",
            keywords: [
                "La Musgaña live",
                "La Musgaña videos",
                "La Musgaña concert video",
                "Spanish folk band live performance",
                "Iberian folk music video",
                "hurdy-gurdy performance",
                "Spanish bagpipes folk video",
                "Castilian traditional music live",
            ],
            openGraph: {
                title: "La Musgaña Videos | Live Performances",
                description:
                    "Watch La Musgaña perform live. Spanish folk and Iberian traditional music with hurdy-gurdy, bagpipes, and tabor.",
                locale: "en_US",
                alternateLocale: "es_ES",
            },
            alternates: {
                canonical: "https://musgana-web-9onp.vercel.app/en/videos",
                languages: {
                    es: "https://musgana-web-9onp.vercel.app/es/videos",
                    en: "https://musgana-web-9onp.vercel.app/en/videos",
                },
            },
        };
    }

    return {
        title: "La Musgaña Vídeos | Actuaciones en Directo y Videoclips",
        description:
            "Vídeos de La Musgaña en directo, actuaciones en festivales y videoclips. Grupo de música folk española interpretando música tradicional de Castilla y León con gaita sanabresa, zanfona y flauta de tres agujeros.",
        keywords: [
            "La Musgaña vídeos",
            "La Musgaña en directo",
            "La Musgaña En Concierto",
            "vídeos folk castellano",
            "folk ibérico en vivo",
            "gaita sanabresa vídeo",
            "zanfona en directo",
            "música tradicional de Castilla y León vídeos",
        ],
        openGraph: {
            title: "La Musgaña Vídeos | Actuaciones en Directo",
            description:
                "Vídeos de La Musgaña en directo. Folk ibérico y música tradicional castellana con gaita sanabresa y zanfona.",
            locale: "es_ES",
            alternateLocale: "en_US",
        },
        alternates: {
            canonical: "https://musgana-web-9onp.vercel.app/es/videos",
            languages: {
                es: "https://musgana-web-9onp.vercel.app/es/videos",
                en: "https://musgana-web-9onp.vercel.app/en/videos",
            },
        },
    };
}
