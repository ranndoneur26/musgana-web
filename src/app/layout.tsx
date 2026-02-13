import "./globals.css";
import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Montserrat } from "next/font/google";

const greatVibes = Great_Vibes({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-great-vibes",
});

const playfairDisplay = Playfair_Display({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-playfair",
});

const montserrat = Montserrat({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "La Musgaña - Grupo de Música Folk Española | Folk Ibérico Contemporáneo",
    description:
        "Web oficial de La Musgaña, grupo de música folk española y folk castellano y leonés. Más de 35 años interpretando música tradicional de Castilla y León con gaita sanabresa, zanfona, flauta de tres agujeros y tamboril. Discografía: Raitán, Temas Profanos, En Concierto. Contratar La Musgaña para festivales y eventos.",
    keywords: [
        // Marca ES
        "La Musgaña",
        "La Musgaña conciertos",
        "La Musgaña discografía",
        "La Musgaña Raitán",
        "La Musgaña Temas Profanos",
        "La Musgaña En Concierto",
        // Género ES
        "grupo de música folk española",
        "folk castellano",
        "folk castellano y leonés",
        "música tradicional de Castilla y León",
        "folk ibérico",
        "músicas de la península ibérica",
        // Instrumentos ES
        "gaita sanabresa",
        "zanfona",
        "flauta de tres agujeros y tamboril",
        "bouzouki en folk",
        "accordion folk",
        // Contratación ES
        "contratar La Musgaña",
        "La Musgaña booking",
        "La Musgaña caché",
        // LatAm / ES genérico
        "música folk española",
        "música tradicional española",
        "folk de Castilla y León",
        "música tradicional ibérica",
        "world music española",
        "músicas del mundo España",
        "folk europeo España",
        // Marca EN
        "La Musgaña band",
        "La Musgaña album",
        "La Musgaña live",
        "La Musgaña discography",
        // Género EN
        "Spanish folk band",
        "Iberian folk music",
        "Castilian traditional music",
        "traditional music from Spain",
        "folk music from Castile and León",
        // World music EN
        "Spanish world music band",
        "Iberian world music",
        "European world music Spain",
        // Instrumentos EN
        "hurdy-gurdy Spanish folk",
        "Spanish bagpipes folk",
        "traditional flute and tabor Spain",
    ],
    authors: [{ name: "La Musgaña" }],
    openGraph: {
        title: "La Musgaña - Grupo de Música Folk Española | Folk Ibérico",
        description:
            "Más de 35 años de folk ibérico contemporáneo. Música tradicional castellana y leonesa con gaita sanabresa, zanfona y flauta de tres agujeros. Discografía, conciertos y contratación.",
        type: "website",
        locale: "es_ES",
        alternateLocale: "en_US",
        siteName: "La Musgaña",
        url: "https://musgana-web-9onp.vercel.app",
    },
    twitter: {
        card: "summary_large_image",
        title: "La Musgaña - Spanish Folk Band | Iberian Folk Music",
        description:
            "Official site of La Musgaña. Traditional music from Castile and León with hurdy-gurdy, Spanish bagpipes, and flute & tabor. Discography, live concerts & booking.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://musgana-web-9onp.vercel.app",
        languages: {
            "es": "https://musgana-web-9onp.vercel.app/es",
            "en": "https://musgana-web-9onp.vercel.app/en",
        },
    },
};

import { SkipToContent } from "@/components/ui/SkipToContent";
import { SessionTracker } from "@/components/ui/SessionTracker";
import { CookieConsent } from "@/components/ui/CookieConsent";

import { JsonLd } from "@/components/seo/JsonLd";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${greatVibes.variable} ${playfairDisplay.variable} ${montserrat.variable}`} suppressHydrationWarning={true}>
            <body className="antialiased bg-gradient-to-b from-black via-[#01140d] to-[#022114] min-h-screen text-white text-pretty font-[family-name:var(--font-montserrat)]">
                <SkipToContent />
                <SessionTracker />
                <CookieConsent />
                <JsonLd />
                <main id="main-content">
                    {children}
                </main>
            </body>
        </html>
    );
}
