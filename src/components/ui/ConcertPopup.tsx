"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ConcertPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeen = sessionStorage.getItem("hasSeenConcertPopup");
        if (!hasSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem("hasSeenConcertPopup", "true");
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Popup Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    >
                        <div className="relative max-w-md w-full border border-gold/30 rounded-2xl bg-gradient-to-br from-[#0a0f0a] via-[#0d1a12] to-[#081008] shadow-[0_0_60px_rgba(212,175,55,0.12)] overflow-hidden">

                            {/* Decorative top line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-gold transition-colors z-10"
                                aria-label="Cerrar"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Content */}
                            <div className="px-8 py-10 text-center">
                                {/* Ornamental separator */}
                                <div className="flex items-center justify-center gap-3 mb-5">
                                    <span className="block w-8 h-px bg-gold/40" />
                                    <span className="text-gold/60 text-xs tracking-[0.3em] uppercase font-medium">En directo</span>
                                    <span className="block w-8 h-px bg-gold/40" />
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl sm:text-3xl font-bold text-gold font-[family-name:var(--font-playfair)] leading-tight mb-1">
                                    LA MUSGAÑA
                                </h2>

                                {/* Subtitle */}
                                <p className="text-gold/50 text-sm tracking-widest uppercase mb-6">
                                    Concierto
                                </p>

                                {/* Divider */}
                                <div className="w-12 h-px bg-gold/30 mx-auto mb-6" />

                                {/* Date & Time */}
                                <div className="mb-2">
                                    <p className="text-white text-lg sm:text-xl font-semibold font-[family-name:var(--font-playfair)]">
                                        19 de septiembre
                                    </p>
                                    <p className="text-zinc-300 text-base mt-1">
                                        20:30 h
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="w-8 h-px bg-gold/20 mx-auto my-5" />

                                {/* Location */}
                                <div className="mb-2">
                                    <p className="text-white text-lg font-semibold font-[family-name:var(--font-playfair)]">
                                        Leganés
                                    </p>
                                    <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                                        Festival de Folklore
                                    </p>
                                    <p className="text-gold/70 text-sm mt-1 italic">
                                        Día de Extremadura
                                    </p>
                                </div>

                                {/* Ornamental bottom separator */}
                                <div className="flex items-center justify-center gap-3 mt-8">
                                    <span className="block w-16 h-px bg-gold/20" />
                                    <span className="text-gold/40 text-lg">✦</span>
                                    <span className="block w-16 h-px bg-gold/20" />
                                </div>
                            </div>

                            {/* Decorative bottom line */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
