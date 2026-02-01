"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import content from "@/data/content.json";

export default function DiscographyPage() {
    const { t, lang } = useTranslation();

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
                {t.nav.discography}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.discography.map((album) => (
                    <GlassCard key={album.id} className="flex flex-col h-full hover:bg-white/10 transition-colors duration-300">
                        {/* Album Art Placeholder */}
                        <div className="w-full aspect-square bg-zinc-800 rounded-lg mb-6 shadow-2xl border border-white/5 animate-pulse" />

                        <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl font-bold text-white">{album.title}</h2>
                                <span className="text-gold font-mono text-sm border border-gold/30 px-2 py-1 rounded">
                                    {album.year}
                                </span>
                            </div>

                            {album.collab && (
                                <p className="text-sm text-zinc-400 mb-4">
                                    <span className="text-zinc-500 font-semibold">{t.discography.collab}:</span> {album.collab}
                                </p>
                            )}

                            <p className="text-zinc-300 text-sm mb-6 flex-1 italic leading-relaxed">
                                {album.desc[lang as "es" | "en"]}
                            </p>

                            <button className="w-full py-3 px-4 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all duration-300 rounded font-semibold text-sm uppercase tracking-wide">
                                {t.discography.buy}
                            </button>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
