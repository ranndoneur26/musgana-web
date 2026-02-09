"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import { ConcertCard } from "@/components/ui/ConcertCard";
import { motion } from "framer-motion";

import Image from "next/image";

interface ConcertEvent {
    title: string;
    date: string;
    location: string;
    description: string;
}

export function ConcertsSection() {
    const { t } = useTranslation();
    const [events, setEvents] = useState<ConcertEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch('/api/calendar');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();

                if (data.events && Array.isArray(data.events) && data.events.length > 0) {
                    setEvents(data.events);
                } else {
                    // No events found, trigger fallback
                    setError(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    const showFallback = error || (!loading && events.length === 0);

    return (
        <section className="container mx-auto px-4 py-4 md:py-8 flex flex-col items-center">
            <div className="w-full max-w-5xl flex flex-row items-center justify-start -mt-12 mb-0 z-50 relative">
                <div className="relative w-[331px] h-[184px] sm:w-[368px] sm:h-[221px] md:w-[690px] md:h-[380px] -mt-2 md:-mt-12 pointer-events-none">
                    <Image
                        src="/images/40-anniversari.svg"
                        alt="40 Aniversario"
                        fill
                        className="object-contain object-left box-content"
                    />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-5xl -mt-12 z-10 relative"
            >
                {loading ? (
                    <div className="w-full h-[400px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                    </div>
                ) : showFallback ? (
                    <GlassCard className="w-full h-[600px] p-2 md:p-4 overflow-hidden">
                        <iframe
                            src="https://calendar.google.com/calendar/embed?src=musgana.live%40gmail.com&ctz=Europe%2FMadrid&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=AGENDA&bgcolor=%23000000"
                            style={{ border: 0 }}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            className="rounded-lg bg-zinc-900 invert-[0.9] hue-rotate-180 contrast-125 saturate-50"
                        // Note: Invert/filter hack specifically for iframe dark mode is tricky, usually better to just let it be light or use custom styling if possible (GCal doesn't support dark mode well in embed).
                        // Removing filters for better readability if the user didn't ask for dark mode specifically on the iframe itself, but fitting the theme.
                        // Actually, let's keep it simple as a fallback.
                        />
                    </GlassCard>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ConcertCard
                                    date={event.date}
                                    title={event.title}
                                    location={event.location}
                                    description={event.description}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
}
