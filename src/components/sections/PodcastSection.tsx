"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export function PodcastSection() {
    const { t } = useTranslation();

    return (
        <section className="container mx-auto px-4 py-8 md:py-16 relative z-30">
            <div className="max-w-5xl mx-auto flex flex-col items-start text-left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 w-full"
                >
                    <h2 className="text-xl md:text-3xl font-semibold mb-2 text-gold font-[family-name:var(--font-playfair)] tracking-wide">
                        {t.podcast.title}
                    </h2>
                    <p className="text-sm md:text-lg text-zinc-300 font-light italic">
                        {t.podcast.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full md:w-[60%]"
                >
                    <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/episode/2od5GbyOSppmTfCw9Dvoik?utm_source=generator&theme=0&t=3536"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Podcast: Inicios de La Musgaña"
                        className="w-full h-[232px] md:h-[352px]"
                    />
                    <div className="mt-2 text-left text-xs pl-1">
                        <style jsx>{`
                            @keyframes pulse-gold {
                                0%, 100% {
                                    opacity: 1;
                                    text-shadow: 0 0 8px rgba(212, 175, 55, 0.8);
                                }
                                50% {
                                    opacity: 0.7;
                                    text-shadow: 0 0 12px rgba(212, 175, 55, 1);
                                }
                            }
                            .pulse-warning {
                                animation: pulse-gold 2s ease-in-out infinite;
                                color: #d4af37;
                                font-weight: 500;
                            }
                        `}</style>
                        <span className="pulse-warning">
                            {t.podcast.helperText}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
