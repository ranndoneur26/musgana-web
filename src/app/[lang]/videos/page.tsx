"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { GlassCard } from "@/components/ui/GlassCard";

export default function VideosPage() {
    const { t } = useTranslation();

    // Simulated video data
    const videos = Array.from({ length: 9 }, (_, i) => ({ id: i }));

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
                {t.nav.videos}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => (
                    <GlassCard
                        key={video.id}
                        className="group relative aspect-video p-0 overflow-hidden cursor-pointer hover:border-gold/50 transition-all duration-300"
                    >
                        {/* Thumbnail Placeholder */}
                        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                            <PlayCircleIcon className="w-16 h-16 text-white/50 group-hover:text-gold group-hover:scale-110 transition-all duration-300" />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                        <span className="absolute bottom-4 right-4 text-xs font-bold uppercase tracking-wider text-white/80 border border-white/20 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
                            {t.videos.watch}
                        </span>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
