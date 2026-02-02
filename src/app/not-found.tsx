"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
    const pathname = usePathname();
    const lang = pathname?.startsWith("/en") ? "en" : "es";

    const content = {
        es: {
            title: "404",
            subtitle: "Página no encontrada",
            description: "Lo sentimos, la página que buscas no existe o ha sido movida.",
            button: "Volver al inicio",
        },
        en: {
            title: "404",
            subtitle: "Page not found",
            description: "Sorry, the page you're looking for doesn't exist or has been moved.",
            button: "Back to home",
        },
    };

    const t = content[lang as keyof typeof content];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#01140d] to-[#022114] text-white p-4">
            <div className="text-center max-w-md">
                {/* 404 Number */}
                <h1 className="text-[12rem] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/20 font-[family-name:var(--font-playfair)]">
                    {t.title}
                </h1>

                {/* Subtitle */}
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 -mt-8">
                    {t.subtitle}
                </h2>

                {/* Description */}
                <p className="text-zinc-400 mb-8 text-lg">
                    {t.description}
                </p>

                {/* Back Button */}
                <Link
                    href={`/${lang}`}
                    className="inline-block bg-gold text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#1b4332] hover:text-white transition-all duration-300 rounded-sm focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
                >
                    {t.button}
                </Link>
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-8 text-center">
                <p className="text-zinc-600 text-sm font-[family-name:var(--font-great-vibes)] text-2xl">
                    La Musgaña
                </p>
            </div>
        </div>
    );
}
