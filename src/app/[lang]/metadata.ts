import type { Metadata } from "next";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    if (lang === "en") {
        return {
            title: "La Musgaña - Spanish Folk Band | Contemporary Iberian Folk Music",
            description:
                "Official website of La Musgaña, a Spanish folk band from Castile and León. Over 35 years performing Iberian traditional music with hurdy-gurdy, Spanish bagpipes, and flute & tabor. Discography, live concerts & booking.",
            keywords: [
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
                "traditional flute and tabor Spain",
                "Spanish world music band",
                "Iberian world music",
                "European world music Spain",
            ],
            openGraph: {
                title: "La Musgaña - Spanish Folk Band | Iberian Folk Music",
                description:
                    "Over 35 years of contemporary Iberian folk. Traditional music from Castile and León with hurdy-gurdy, Spanish bagpipes, flute & tabor. Discography, concerts & booking.",
                locale: "en_US",
                alternateLocale: "es_ES",
            },
            alternates: {
                canonical: "https://musgana-web-9onp.vercel.app/en",
                languages: {
                    es: "https://musgana-web-9onp.vercel.app/es",
                    en: "https://musgana-web-9onp.vercel.app/en",
                },
            },
        };
    }

    // Spanish (default)
    return {
        title: "La Musgaña - Grupo de Música Folk Española | Folk Ibérico Contemporáneo",
        description:
            "Web oficial de La Musgaña, grupo de música folk española y folk castellano y leonés. Más de 35 años interpretando música tradicional de Castilla y León con gaita sanabresa, zanfona, flauta de tres agujeros y tamboril. Discografía, conciertos y contratación.",
        keywords: [
            "La Musgaña",
            "La Musgaña conciertos",
            "La Musgaña discografía",
            "grupo de música folk española",
            "folk castellano",
            "folk castellano y leonés",
            "música tradicional de Castilla y León",
            "folk ibérico",
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
            title: "La Musgaña - Grupo de Música Folk Española | Folk Ibérico",
            description:
                "Más de 35 años de folk ibérico contemporáneo. Música tradicional castellana y leonesa con gaita sanabresa, zanfona y flauta de tres agujeros.",
            locale: "es_ES",
            alternateLocale: "en_US",
        },
        alternates: {
            canonical: "https://musgana-web-9onp.vercel.app/es",
            languages: {
                es: "https://musgana-web-9onp.vercel.app/es",
                en: "https://musgana-web-9onp.vercel.app/en",
            },
        },
    };
}
