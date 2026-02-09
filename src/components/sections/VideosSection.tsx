"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";

// Dynamically import ReactPlayer to avoid hydration mismatch
const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });

const VIDEO_LIST = [
    { id: "RV8l4BWSDrk", key: "v1" },
    { id: "5Ath7RHXgh4", key: "v2" },
    { id: "mOSdUJjwrGQ", key: "v3" },
];

export function VideosSection() {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

    const handleVideoEnd = () => {
        if (currentIndex < VIDEO_LIST.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsPlaying(true);
        } else {
            // Optional: Loop back to start or stop
            setCurrentIndex(0);
            setIsPlaying(false);
        }
    };

    return (
        <section className="container mx-auto px-4 py-4 md:py-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xl md:text-3xl font-semibold mb-8 text-left text-gold font-[family-name:var(--font-playfair)]">
                    {t.nav.videos}
                </h2>

                <div className="flex flex-col gap-8">
                    {/* Main Player Area - Full Width */}
                    <div className="w-full">
                        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 relative">
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${VIDEO_LIST[currentIndex].id}`}
                                playing={isPlaying}
                                controls
                                width="100%"
                                height="100%"
                                onEnded={handleVideoEnd}
                                onPlay={() => setIsPlaying(true)}
                            />
                        </div>
                    </div>

                    {/* Collapsible Playlist Section */}
                    <div className="w-full">
                        <button
                            onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                            className="flex items-center gap-4 w-full text-left group focus:outline-none"
                        >
                            <h2 className="text-xl md:text-3xl font-semibold text-gold font-[family-name:var(--font-playfair)] animate-text-glow transition-colors group-hover:text-white">
                                {t.videos.playlistTitle}
                            </h2>
                            <div className={`transform transition-transform duration-300 ${isPlaylistOpen ? "rotate-180" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gold group-hover:text-white transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </button>

                        <div className={`grid transition-all duration-500 ease-in-out ${isPlaylistOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                            <div className="overflow-hidden">
                                <GlassCard className="p-4 !bg-black/40">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {VIDEO_LIST.map((video, index) => (
                                            <button
                                                key={video.id}
                                                onClick={() => {
                                                    setCurrentIndex(index);
                                                    setIsPlaying(true);
                                                    // Optional: Close playlist on selection? keeping open seems better for browsing
                                                }}
                                                className={`group flex items-center gap-3 w-full p-2 rounded-lg transition-all duration-300 ${index === currentIndex
                                                    ? "bg-gold/20 border border-gold/30"
                                                    : "hover:bg-white/5 border border-transparent"
                                                    }`}
                                            >
                                                {/* Thumbnail Preview */}
                                                <div className="relative w-24 aspect-video bg-black rounded overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                                                        alt="Thumbnail"
                                                        className={`w-full h-full object-cover transition-opacity ${index === currentIndex ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                                                            }`}
                                                    />
                                                    {index === currentIndex && isPlaying && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                            <div className="w-2 h-2 bg-gold rounded-full animate-ping" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Video Title */}
                                                <div className="flex-1 text-left">
                                                    <span className={`text-sm font-medium line-clamp-2 ${index === currentIndex ? "text-gold" : "text-zinc-400 group-hover:text-zinc-200"
                                                        }`}>
                                                        {t.videos.items[video.key as "v1" | "v2" | "v3"]}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </GlassCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
