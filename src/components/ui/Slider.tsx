"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AlbumModal } from "./AlbumModal";
import { useTranslation } from "@/hooks/useTranslation";
import content from "@/data/content.json";

export function Slider() {
    const { lang } = useTranslation();
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [selectedAlbum, setSelectedAlbum] = React.useState<any>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isHovering, setIsHovering] = React.useState(false);
    const [userInteracted, setUserInteracted] = React.useState(false);

    const albums = content.discography || [];

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 258; // card width (234) + gap (24)
            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
            setUserInteracted(true); // Mark that user manually scrolled
        }
    };

    // Auto-scroll functionality
    React.useEffect(() => {
        if (isHovering || userInteracted || !scrollRef.current) return;

        const intervalId = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                // Check if we're at the end, if so, scroll back to start
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    // Scroll to next item
                    scroll("right");
                }
            }
        }, 3000); // 3 seconds

        return () => clearInterval(intervalId);
    }, [isHovering, userInteracted]);

    // Reset user interaction flag after 10 seconds of no activity
    React.useEffect(() => {
        if (!userInteracted) return;

        const timeoutId = setTimeout(() => {
            setUserInteracted(false);
        }, 5000); // Resume auto-scroll after 5 seconds

        return () => clearTimeout(timeoutId);
    }, [userInteracted]);

    const handleAlbumClick = (album: any) => {
        setSelectedAlbum(album);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="relative w-full py-10 group">
                {/* Buttons */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-white hover:bg-gold hover:text-black transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-white hover:bg-gold hover:text-black transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Scroll right"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="flex space-x-6 overflow-x-auto scrollbar-hide px-4 md:px-10 snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {albums.map((album: any, i: number) => (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, scale: 0.7, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                            onClick={() => handleAlbumClick(album)}
                            className="w-[220px] h-[220px] md:w-auto md:h-auto min-w-[180px] md:min-w-[234px] max-w-[360px] aspect-square bg-zinc-800 rounded-lg flex-shrink-0 border border-white/5 snap-center relative overflow-hidden group/card cursor-pointer"
                        >
                            {/* Album Image */}
                            {album.image && (
                                <img
                                    src={album.image}
                                    alt={album.title}
                                    className="w-full h-full object-cover transition-all duration-500 grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-110"
                                />
                            )}

                            {/* Hover Overlay with Info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-white font-bold text-xl mb-2">{album.title}</h3>
                                <p className="text-gold font-mono text-sm">{album.year}</p>
                                {album.description && (
                                    <p className="text-zinc-300 text-sm mt-2 line-clamp-2">
                                        {album.description[lang as "es" | "en"]}
                                    </p>
                                )}
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gold/0 group-hover/card:bg-gold/5 transition-colors duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AlbumModal
                album={selectedAlbum}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
