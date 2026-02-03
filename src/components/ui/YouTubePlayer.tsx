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
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?si=GIrcvVg7Rm13nXS5`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{ border: 0 }}
                />
            </div>
        </div>
    );
}
