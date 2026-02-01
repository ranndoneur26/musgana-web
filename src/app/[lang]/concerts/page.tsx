"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";

export default function ConcertsPage() {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
                {t.nav.concerts}
            </h1>

            <GlassCard className="w-full max-w-5xl h-[600px] p-1 md:p-4 flex flex-col">
                <div className="bg-zinc-900 w-full h-full rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden">

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
        </div>
    );
}
