import "./globals.css";
import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display } from "next/font/google";

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

export const metadata: Metadata = {
    title: "La Musgaña",
    description: "Web oficial del grupo de folk La Musgaña",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${greatVibes.variable} ${playfairDisplay.variable}`}>
            <body className="antialiased bg-gradient-to-b from-black via-[#01140d] to-[#022114] min-h-screen text-white text-pretty">
                {children}
            </body>
        </html>
    );
}
