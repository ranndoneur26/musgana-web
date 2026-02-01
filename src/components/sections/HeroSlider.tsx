"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export function HeroSlider() {
    const { t } = useTranslation();
    const [current, setCurrent] = useState(0);

    // Nombres de archivos
    const slides = [
        "/images/hero1.png",
        "/images/hero2.png",
        "/images/hero3.png",
        "/images/hero4.png",
        "/images/hero5.png",
        "/images/hero6.png",
        "/images/hero7.png",
        "/images/hero8.png",
        "/images/hero9.png",
        "/images/hero10.png",
        "/images/hero12.png"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
            {slides.map((src, index) => (
                <motion.div
                    key={src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === current ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    className={cn(
                        "absolute inset-0",
                        index === current ? "pointer-events-auto" : "pointer-events-none"
                    )}
                >
                    {/* Real Image */}
                    <div className="relative w-full h-full">
                        <Image
                            src={src}
                            alt={`Hero Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            style={{
                                objectPosition: src.includes("hero9.png") ? "center 5%" : "center center"
                            }}
                            priority={index === 0}
                        />
                        {/* Fallback/Placeholder if image missing (for development) */}
                        <div className="absolute inset-0 bg-zinc-800 -z-10 flex items-center justify-center">
                            <span className="text-zinc-700">Add {src} to public folder</span>
                        </div>
                    </div>

                    {/* Overlay Text */}
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-end pb-32 text-center p-4 group cursor-default">
                        <h2 className="text-6xl md:text-9xl font-normal text-white mb-4 font-[family-name:var(--font-great-vibes)] group-hover:text-gold transition-colors duration-500">
                            La Musgaña
                        </h2>
                        <p className="text-xl md:text-2xl text-gold uppercase tracking-[0.5em] group-hover:text-white transition-colors duration-500">
                            {t.home.heroSubtitle}
                        </p>
                    </div>
                </motion.div>
            ))}

            {/* Controls */}
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20">
                <ChevronLeft size={48} />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20">
                <ChevronRight size={48} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-gold scale-125" : "bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
