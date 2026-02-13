import type { Metadata } from "next";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    if (lang === "en") {
        return {
            title: "La Musgaña Discography | Albums, Recordings & Music",
            description:
                "Explore the complete discography of La Musgaña — Spanish folk band. Albums including Raitán, Temas Profanos, En Concierto, and more. Listen on Spotify, buy records. Iberian traditional music with hurdy-gurdy and Spanish bagpipes.",
            keywords: [
                "La Musgaña discography",
                "La Musgaña album",
                "La Musgaña Raitán",
                "La Musgaña Temas Profanos",
                "La Musgaña En Concierto",
                "Spanish folk music albums",
                "Iberian folk records",
                "hurdy-gurdy Spanish folk album",
                "Castilian traditional music recordings",
            ],
            openGraph: {
                title: "La Musgaña Discography | Albums & Recordings",
                description:
                    "Complete discography of La Musgaña. Raitán, Temas Profanos, En Concierto and more. Iberian folk and Castilian traditional music.",
                locale: "en_US",
                alternateLocale: "es_ES",
            },
            alternates: {
                canonical: "https://musgana-web-9onp.vercel.app/en/discography",
                languages: {
                    es: "https://musgana-web-9onp.vercel.app/es/discography",
                    en: "https://musgana-web-9onp.vercel.app/en/discography",
                },
            },
        };
    }

    return {
        title: "Discografía de La Musgaña | Álbumes, Raitán, Temas Profanos",
        description:
            "Discografía completa de La Musgaña, grupo de música folk española. Álbumes: Raitán, Temas Profanos, En Concierto y más. Escuchar en Spotify, comprar discos. Folk castellano y leonés con gaita sanabresa y zanfona.",
        keywords: [
            "La Musgaña discografía",
            "La Musgaña Raitán",
            "La Musgaña Temas Profanos",
            "La Musgaña En Concierto",
            "discografía folk española",
            "álbumes folk ibérico",
            "música tradicional de Castilla y León discos",
            "gaita sanabresa grabaciones",
            "zanfona folk castellano",
        ],
        openGraph: {
            title: "Discografía de La Musgaña | Álbumes y Grabaciones",
            description:
                "Discografía completa de La Musgaña. Raitán, Temas Profanos, En Concierto y más. Folk ibérico y música tradicional castellana.",
            locale: "es_ES",
            alternateLocale: "en_US",
        },
        alternates: {
            canonical: "https://musgana-web-9onp.vercel.app/es/discography",
            languages: {
                es: "https://musgana-web-9onp.vercel.app/es/discography",
                en: "https://musgana-web-9onp.vercel.app/en/discography",
            },
        },
    };
}
