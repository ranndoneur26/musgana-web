"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });

export function HeroSlider() {
    const { t } = useTranslation();
    const [current, setCurrent] = useState(0);

    // Nombres de archivos y video de YouTube al final
    const slides = [
        "/images/La_musgaña_inicios.jpg",
        "/images/La_musgaña_en_concierto.jpg",
        "/images/La_musgaña_en_directo.jpg",
        "/images/La_musgaña_Quique_almendros.jpg",
        "/images/La_musgaña_carlos_beceiro.jpg",
        "/images/La_musgaña_Antonio_Pedraza.jpg",
        "/images/La_musgaña_Jaime_Muñoz.jpg",
        "/images/La_musgaña_live.jpg",
        "/images/La_musgaña_trio.jpg",
        "/images/La_musgaña_anniversary.jpg",
        "/images/La_musgaña_ifolk_music.jpg",
        "https://youtu.be/J_Yu2vQtxnM?si=z2MohYtYpv--SJ3d" // Video añadido al final
    ];

    const isVideo = slides[current].includes("youtu");

    useEffect(() => {
        // No auto-avanzar si es el video, ya que el video controlará el avance al finalizar
        if (isVideo) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length, isVideo, current]);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    // Helper to generate SEO-friendly alt text
    const getAltText = (path: string) => {
        if (path.includes("youtu")) return "La Musgaña Video";
        // Extract filename without path and extension
        const filename = path.split('/').pop()?.split('.')[0] || "";
        // Replace ñ with n for English compatibility in alt text
        return filename.replace(/ñ/g, "n");
    };

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
                    {src.includes("youtu") ? (
                        <div className="w-full h-full bg-black flex items-center justify-center">
                            {/* Renderizar ReactPlayer solo en el slide actual para evitar sobrecarga y asegurar reproducción correcta */}
                            {index === current && (
                                <ReactPlayer
                                    url={src}
                                    playing={true} // Autoplay on active
                                    muted={true} // Autoplay normally needs to be muted to work without user interaction
                                    controls={true} // Mostrar controles por si quieren activar el sonido
                                    width="100%"
                                    height="100%"
                                    onEnded={next} // Al finalizar, ir al slide 1
                                    className="object-cover pointer-events-auto"
                                    config={{
                                        youtube: {
                                            playerVars: { autoplay: 1, rel: 0, showinfo: 0 }
                                        }
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="relative w-full h-full">
                            <Image
                                src={src}
                                alt={getAltText(src)}
                                fill
                                className="object-cover"
                                style={{
                                    objectPosition: src.includes("La_musgaña_trio.jpg") ? "center 5%" : "center center"
                                }}
                                priority={index === 0}
                            />
                            {/* Fallback/Placeholder if image missing (for development) */}
                            <div className="absolute inset-0 bg-zinc-800 -z-10 flex items-center justify-center">
                                <span className="text-zinc-700">Add {src} to public folder</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}

            {/* Overlay Text - Moved outside loop to fix H2 duplication */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-16 md:pb-20 text-center p-4 z-10">
                <div className="group cursor-default pointer-events-auto">
                    <h1 className="flex flex-col items-center">
                        <span className="text-6xl md:text-9xl font-normal text-white mb-4 font-[family-name:var(--font-great-vibes)] group-hover:text-gold transition-colors duration-500">
                            La Musgaña
                        </span>
                        <span className="text-lg md:text-2xl text-gold uppercase tracking-[0.2em] md:tracking-[0.5em] group-hover:text-white transition-colors duration-500 font-[family-name:var(--font-playfair)] max-w-4xl leading-tight">
                            {t.home.heroTitleSEO.replace("La Musgaña: ", "")}
                        </span>
                    </h1>
                </div>
            </div>

            {/* Controls */}


            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20" role="tablist" aria-label="Indicadores de slide">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        role="tab"
                        aria-selected={i === current}
                        aria-label={`Ir a slide ${i + 1} de ${slides.length}`}
                        className={`w-2 h-2 rounded-full transition-all focus:ring-2 focus:ring-gold focus:ring-offset-1 focus:ring-offset-black ${i === current ? "bg-gold scale-125" : "bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
