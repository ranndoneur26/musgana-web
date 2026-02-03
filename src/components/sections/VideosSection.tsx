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
            thumbnail: "https://img.youtube.com/vi/llI0m0O0lAo/maxresdefault.jpg"
        },
        {
            id: "Nb3BMq16Rd4",
            title: "La Musgaña - Video 2",
            thumbnail: "https://img.youtube.com/vi/Nb3BMq16Rd4/maxresdefault.jpg"
        },
        {
            id: "pEW6yjkV9PE",
            title: "La Musgaña - Video 3",
            thumbnail: "https://img.youtube.com/vi/pEW6yjkV9PE/maxresdefault.jpg"
        },
        {
            id: "-sdLOr_cuW0",
            title: "La Musgaña - Video 4",
            thumbnail: "https://img.youtube.com/vi/-sdLOr_cuW0/maxresdefault.jpg"
        },
        {
            id: "oTqeuMzhUoU",
            title: "La Musgaña - Video 5",
            thumbnail: "https://img.youtube.com/vi/oTqeuMzhUoU/maxresdefault.jpg"
        },
        {
            id: "spwvRzqFYd0",
            title: "La Musgaña - Video 6",
            thumbnail: "https://img.youtube.com/vi/spwvRzqFYd0/maxresdefault.jpg"
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
                            <GlassCard className="group relative aspect-video p-0 overflow-hidden hover:ring-2 hover:ring-gold/50 transition-all duration-300">
                                {playingVideo === video.id ? (
                                    <div className="w-full h-full bg-black relative z-20">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute inset-0"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="block w-full h-full relative cursor-pointer" onClick={() => setPlayingVideo(video.id)}>
                                        <div className="absolute inset-0 bg-black flex items-center justify-center">
                                            {video.thumbnail && (
                                                <img
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-300 opacity-50 group-hover:opacity-100 group-hover:scale-105 z-0"
                                                    width="640"
                                                    height="360"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        if (target.src.includes('maxresdefault')) {
                                                            target.src = target.src.replace('maxresdefault', 'hqdefault');
                                                        }
                                                    }}
                                                />
                                            )}

                                            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 pointer-events-none">
                                                <div className="bg-black/40 rounded-full p-3 backdrop-blur-md border border-white/10 group-hover:bg-black/60 transition-colors">
                                                    <PlayCircleIcon className="w-16 h-16 text-gold drop-shadow-lg" />
                                                </div>
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex justify-end">
                                                <a
                                                    href={`https://www.youtube.com/watch?v=${video.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-white hover:text-gold transition-colors bg-black/60 hover:bg-black/80 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10 flex items-center gap-2 shadow-lg"
                                                >
                                                    {t.videos.openYouTube ? t.videos.openYouTube.toUpperCase() : "ABRIR EN YOUTUBE"}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
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
