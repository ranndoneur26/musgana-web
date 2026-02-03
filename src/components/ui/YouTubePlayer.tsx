"use client";

import { cn } from "@/lib/utils";

interface YouTubePlayerProps {
    videoId: string;
    className?: string;
}

export function YouTubePlayer({ videoId, className }: YouTubePlayerProps) {
    return (
        <div className={cn("relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-black border border-white/10", className)}>
            <div className="relative w-full pb-[56.25%]">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&playsinline=1`}
                    title="La Musgaña Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        </div>
    );
}
