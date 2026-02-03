"use client";

export const dynamic = "force-dynamic";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import content from "@/data/content.json";

export default function DiscographyPage() {
    const { t, lang } = useTranslation();

    return (
        <div className="container mx-auto px-4 py-10 md:py-20 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center text-white">
                {t.nav.discography}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.discography.map((album) => (
                    <GlassCard key={album.id} className="flex flex-col h-full hover:bg-white/10 transition-colors duration-300">
                        {/* Album Art */}
                        <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden shadow-2xl border border-white/5 bg-black/50">
                            {album.image ? (
                                <img
                                    src={album.image}
                                    alt={album.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-800 animate-pulse" />
                            )}
                        </div>

                        <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl font-bold text-white">{album.title}</h2>
                                <span className="text-gold font-mono text-sm border border-gold/30 px-2 py-1 rounded">
                                    {album.year}
                                </span>
                            </div>

                            <p className="text-zinc-300 text-sm mb-6 flex-1 italic leading-relaxed">
                                {album.description[lang as "es" | "en"]}
                            </p>

                            <div className="flex gap-2 mt-auto">
                                {(album.spotifyLink || (album as any).streamingLink) && (
                                    <a
                                        href={album.spotifyLink || (album as any).streamingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-3 px-4 border border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 rounded font-semibold text-sm uppercase tracking-wide text-center"
                                    >
                                        {album.spotifyLink ? "Spotify" : t.discography.listenOnline}
                                    </a>
                                )}
                                {album.buyLink && (
                                    <a
                                        href={album.buyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-3 px-4 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all duration-300 rounded font-semibold text-sm uppercase tracking-wide text-center"
                                    >
                                        {t.discography.buy}
                                    </a>
                                )}
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
