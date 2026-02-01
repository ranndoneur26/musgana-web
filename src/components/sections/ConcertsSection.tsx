"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export function ConcertsSection() {
    const { t } = useTranslation();

    return (
        <section className="container mx-auto px-4 py-20 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <h2 className="text-xl md:text-4xl font-semibold mb-12 text-left text-gold font-[family-name:var(--font-playfair)]">
                    {t.nav.concerts}
                </h2>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-5xl"
            >
                <GlassCard className="w-full h-[500px] p-1 md:p-4 flex flex-col group">
                    <div className="bg-zinc-900 w-full h-full rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden opacity-60 group-hover:opacity-100 transition-all duration-500">
                        {/* Simulated Calendar Header */}
                        <div className="absolute top-0 left-0 right-0 h-16 bg-zinc-800 border-b border-white/5 flex items-center justify-between px-6">
                            <div className="h-4 w-32 bg-zinc-700 rounded animate-pulse" />
                            <div className="flex gap-2">
                                <div className="h-8 w-8 bg-zinc-700 rounded-full" />
                                <div className="h-8 w-8 bg-zinc-700 rounded-full" />
                            </div>
                        </div>

                        {/* Simulated Grid */}
                        <div className="w-full h-full pt-16 grid grid-cols-7 grid-rows-5 gap-px bg-zinc-800/50">
                            {Array.from({ length: 35 }).map((_, i) => (
                                <div key={i} className="bg-zinc-900 hover:bg-zinc-800/80 transition-colors" />
                            ))}
                        </div>

                        {/* Center Message */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-light text-zinc-500 tracking-widest mb-2">GOOGLE CALENDAR</span>
                            <p className="text-sm text-gold animate-pulse">{t.concerts.loading}</p>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </section>
    );
}
