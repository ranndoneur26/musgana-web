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
                        Inicios de La Musgaña
                    </h2>
                    <p className="text-sm md:text-lg text-zinc-300 font-light italic">
                        Contado por Rafa Martín, en el podcast &quot;Van Por el Aire&quot; de Diariofolk
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
                        src="https://open.spotify.com/embed/episode/2od5GbyOSppmTfCw9Dvoik?utm_source=generator"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Podcast: Inicios de La Musgaña"
                        className="w-full h-[232px] md:h-[352px]"
                    />
                    <div className="mt-2 text-left text-xs text-white/50 pl-1">
                        * Fragmento del podcast: 58:56 - 1:14:40. Acepte cookies si aparece el banner.
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
