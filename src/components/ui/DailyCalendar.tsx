"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, RefreshCw } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface DailyCalendarProps {
    className?: string;
}

export function DailyCalendar({ className = "" }: DailyCalendarProps) {
    const { lang } = useTranslation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [direction, setDirection] = useState(0);

    const changeDate = (days: number) => {
        setDirection(days);
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + days);
        setCurrentDate(newDate);
    };

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 50 : -50,
                opacity: 0,
                scale: 0.95,
            };
        },
        center: {
            z: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => {
            return {
                z: 0,
                x: direction < 0 ? 50 : -50,
                opacity: 0,
                scale: 0.95,
            };
        }
    };

    // Format helpers
    const formatterMonth = new Intl.DateTimeFormat(lang, { month: 'long' });
    const formatterYear = new Intl.DateTimeFormat(lang, { year: 'numeric' });
    const formatterDayName = new Intl.DateTimeFormat(lang, { weekday: 'long' });

    // Capitalize first letter
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const monthName = capitalize(formatterMonth.format(currentDate));
    const year = formatterYear.format(currentDate);
    const dayName = capitalize(formatterDayName.format(currentDate));
    const dayNumber = currentDate.getDate();

    return (
        <div className={`w-full max-w-4xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-8 ${className}`}>
            {/* The Tear-off Calendar */}
            <div className="relative z-10 w-full md:w-1/3 min-w-[280px] flex">
                <GlassCard className="overflow-hidden p-0 border border-white/10 shadow-2xl bg-black/60 backdrop-blur-xl w-full flex flex-col">

                    {/* Calendar Header (Month/Year & Controls) */}
                    <div className="bg-gradient-to-r from-red-900/40 via-red-800/40 to-red-900/40 border-b border-red-500/20 p-4 flex items-center justify-between">
                        <button
                            onClick={() => changeDate(-1)}
                            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                            aria-label="Día anterior"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white tracking-wider uppercase">
                                {monthName}
                            </h3>
                            <p className="text-sm text-gold/80 font-medium">
                                {year}
                            </p>
                        </div>

                        <button
                            onClick={() => changeDate(1)}
                            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                            aria-label="Día siguiente"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Calendar Body (The Day) */}
                    <div className="p-6 flex flex-col items-center justify-center min-h-[140px] flex-grow bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden">

                        {/* Static subtle background decoration */}
                        <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                            <CalendarIcon className="w-48 h-48" />
                        </div>

                        <AnimatePresence mode="popLayout" custom={direction}>
                            <motion.div
                                key={currentDate.getTime()}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="flex flex-col items-center justify-center w-full"
                            >
                                <span className="text-sm md:text-base text-zinc-400 font-medium mb-1 uppercase tracking-widest">
                                    {dayName}
                                </span>
                                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500 leading-none drop-shadow-lg [text-shadow:_0_4px_24px_rgba(255,255,255,0.2)]">
                                    {dayNumber}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </GlassCard>
            </div>

            {/* Event Divider/Connector */}
            <div className="hidden md:flex items-center justify-center relative z-0">
                <div className="w-8 h-1 bg-gradient-to-r from-white/20 to-gold/40 rounded-full"></div>
            </div>
            <div className="flex justify-center md:hidden relative z-0 my-[-8px]">
                <div className="w-1 h-8 bg-gradient-to-b from-white/20 to-gold/40 rounded-full"></div>
            </div>

            {/* Static Recurring Event Card */}
            <div className="relative z-10 w-full md:w-2/3 flex">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full flex"
                >
                    <div className="group w-full relative overflow-hidden rounded-2xl bg-zinc-900/80 border border-gold/30 p-6 hover:border-gold/60 transition-all duration-300 shadow-xl shadow-black/50 backdrop-blur-md flex flex-col justify-center">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Content */}
                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-start gap-4">
                                <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-gold transition-colors leading-tight">
                                    Próximo Concierto el 28-05-2026: <br className="hidden md:block lg:hidden" /> 40 Aniversario de La Musgaña
                                </h4>
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center border border-white/5">
                                    <CalendarIcon className="w-5 h-5 text-zinc-400" />
                                </div>
                            </div>

                            <div className="flex items-start gap-3 text-zinc-400">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-gold/70" />
                                <span className="text-base md:text-lg leading-relaxed">
                                    Gran Teatro Pavón. Madrid.
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
