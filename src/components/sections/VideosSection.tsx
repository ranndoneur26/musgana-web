"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { GlassCard } from "@/components/ui/GlassCard";
import { useState } from "react";
import { motion } from "framer-motion";

export function VideosSection() {
    const { t } = useTranslation();
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);

    const videos = [
        {
            id: "llI0m0O0lAo",
            title: "La Musgaña - Video 1",
            thumbnail: "https://img.youtube.com/vi/llI0m0O0lAo/hqdefault.jpg"
        },
        {
            id: "Nb3BMq16Rd4",
            title: "La Musgaña - Video 2",
            thumbnail: "https://img.youtube.com/vi/Nb3BMq16Rd4/hqdefault.jpg"
        },
        {
            id: "pEW6yjkV9PE",
            title: "La Musgaña - Video 3",
            thumbnail: "https://img.youtube.com/vi/pEW6yjkV9PE/hqdefault.jpg"
        },
        {
            id: "-sdLOr_cuW0",
            title: "La Musgaña - Video 4",
            thumbnail: "https://img.youtube.com/vi/-sdLOr_cuW0/hqdefault.jpg"
        },
        {
            id: "oTqeuMzhUoU",
            title: "La Musgaña - Video 5",
            thumbnail: "https://img.youtube.com/vi/oTqeuMzhUoU/hqdefault.jpg"
        },
        {
            id: "spwvRzqFYd0",
            title: "La Musgaña - Video 6",
            thumbnail: "https://img.youtube.com/vi/spwvRzqFYd0/hqdefault.jpg"
        },
    ];

    return (
        <section className="container mx-auto px-4 py-20">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl md:text-4xl font-semibold mb-12 text-left text-gold font-[family-name:var(--font-playfair)]">
                    {t.nav.videos}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, scale: 0.7, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            className="w-[85%] mx-auto md:w-full"
                        >
                            <GlassCard
                                className="group relative aspect-video p-0 overflow-hidden"
                            >
                                {playingVideo === video.id && !video.id.startsWith('placeholder') ? (
                                    // Video player
                                    <div className="absolute inset-0">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&si=ohTBk-HL5PCFzFLs`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    // Thumbnail/Placeholder
                                    <>
                                        <div
                                            className="absolute inset-0 bg-zinc-800 flex items-center justify-center cursor-pointer transition-all duration-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                                            onClick={() => !video.id.startsWith('placeholder') && setPlayingVideo(video.id)}
                                            style={video.thumbnail ? {
                                                backgroundImage: `url(${video.thumbnail})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            } : {}}
                                        >
                                            {!video.thumbnail && (
                                                <PlayCircleIcon className="w-16 h-16 text-white/50 group-hover:text-gold group-hover:scale-110 transition-all duration-300" />
                                            )}
                                            {video.thumbnail && (
                                                <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <PlayCircleIcon className="w-20 h-20 text-white hover:text-gold hover:scale-110 transition-all duration-300 drop-shadow-lg" />
                                                </div>
                                            )}
                                        </div>

                                        {!video.id.startsWith('placeholder') && (
                                            <a
                                                href={`https://www.youtube.com/watch?v=${video.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute bottom-4 right-4 text-xs font-bold uppercase tracking-wider text-white/80 border border-white/20 px-2 py-1 rounded bg-black/40 backdrop-blur-sm hover:bg-gold/80 hover:border-gold hover:text-black transition-all z-10"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {t.videos.openYouTube}
                                            </a>
                                        )}

                                        {video.id.startsWith('placeholder') && (
                                            <span className="absolute bottom-4 right-4 text-xs font-bold uppercase tracking-wider text-white/80 border border-white/20 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
                                                {t.videos.watch}
                                            </span>
                                        )}
                                    </>
                                )}
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Link to search more videos */}
                <div className="mt-12 text-center">
                    <a
                        href="https://www.youtube.com/results?search_query=la+musga%C3%B1a+oficial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors text-lg font-semibold"
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(
                                'https://www.youtube.com/results?search_query=la+musga%C3%B1a+oficial',
                                'youtube_search',
                                'width=1200,height=800,scrollbars=yes,resizable=yes'
                            );
                        }}
                    >
                        {t.videos.searchVideos}
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

