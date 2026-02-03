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
    title: "La Musgaña - Folk Ibérico Contemporáneo | 40 Aniversario",
    description: "Web oficial del grupo de folk La Musgaña. 40 años de música tradicional castellana y leonesa. Descubre nuestra discografía, historia y próximos conciertos.",
    keywords: ["La Musgaña", "folk español", "música tradicional", "Castilla y León", "folk ibérico", "gaita", "zanfona"],
    authors: [{ name: "La Musgaña" }],
    openGraph: {
        title: "La Musgaña - 40 Aniversario",
        description: "40 años de folk ibérico contemporáneo. Música tradicional castellana y leonesa.",
        type: "website",
        locale: "es_ES",
        alternateLocale: "en_US",
        siteName: "La Musgaña",
    },
    twitter: {
        card: "summary_large_image",
        title: "La Musgaña - Folk Ibérico Contemporáneo",
        description: "40 años de música tradicional castellana y leonesa",
    },
    robots: {
        index: true,
        follow: true,
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
