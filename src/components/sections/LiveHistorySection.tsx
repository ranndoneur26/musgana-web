import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Accordion } from "@/components/ui/Accordion";
import { GlassCard } from "@/components/ui/GlassCard";
import concertsData from "@/data/concertsList.json";

export function LiveHistorySection() {
    const { t, lang } = useTranslation();
    const [isHovered, setIsHovered] = React.useState(false);
    const [hasInteraction, setHasInteraction] = React.useState(false);

    const tableContent = (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-zinc-300">
                <thead className="text-xs text-gold uppercase bg-white/5 border-b border-gold/20">
                    <tr>
                        <th className="px-4 py-3 min-w-[120px]">{t.liveHistory.columns.date}</th>
                        <th className="px-4 py-3 min-w-[150px]">{t.liveHistory.columns.location}</th>
                        <th className="px-4 py-3 min-w-[150px]">{t.liveHistory.columns.venue}</th>
                        <th className="px-4 py-3 min-w-[200px]">{t.liveHistory.columns.notes}</th>
                    </tr>
                </thead>
                <tbody>
                    {concertsData.map((concert, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{concert.date}</td>
                            <td className="px-4 py-3">{concert.location[lang as "es" | "en"]}</td>
                            <td className="px-4 py-3">{concert.venue[lang as "es" | "en"]}</td>
                            <td className="px-4 py-3">{concert.notes[lang as "es" | "en"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-6 text-sm text-center italic text-gold">
                {t.liveHistory.footerNote}
            </p>
        </div>
    );

    const items = [{
        id: "live-history-list",
        title: t.liveHistory.accordionTitle,
        content: tableContent
    }];

    return (
        <section id="live-history" className="container mx-auto px-4 pb-8 relative z-30">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xl md:text-3xl font-semibold mb-8 text-left text-gold font-[family-name:var(--font-playfair)] animate-text-glow">
                    {t.liveHistory.title}
                </h2>

                <div
                    className="relative"
                    onMouseEnter={() => !hasInteraction && setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                        setIsHovered(false);
                        setHasInteraction(true);
                    }}
                >
                    <AnimatePresence>
                        {isHovered && !hasInteraction && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 0.5, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden rounded-xl"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/images/musganaentrada.png"
                                        alt="Entrada Concierto"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <GlassCard className="p-2 md:p-6 transition-transform duration-300">
                        <Accordion items={items} />
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
