"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export function ContactSection() {
    const { lang } = useTranslation();
    const logoRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Motion values for cursor following effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring animation for smooth following (3 second duration feel)
    const springConfig = { damping: 15, stiffness: 50, mass: 1 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!logoRef.current || !isHovering) return;
        const rect = logoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Limit movement to ~30px in any direction
        const offsetX = Math.max(-30, Math.min(30, (e.clientX - centerX) * 0.3));
        const offsetY = Math.max(-30, Math.min(30, (e.clientY - centerY) * 0.3));
        mouseX.set(offsetX);
        mouseY.set(offsetY);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section id="contact" className="container mx-auto px-4 py-6 md:py-10 flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-full max-w-5xl flex flex-col items-center text-center">

                {lang === "en" ? (
                    <div className="mb-8 space-y-3 text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl">
                        <h2 className="text-xl md:text-3xl font-semibold text-gold font-[family-name:var(--font-playfair)] mb-4">Contact &amp; Booking</h2>
                        <p>For management, booking or press enquiries about La Musgaña, please contact the official office in Madrid. The band is available for folk festivals, theatres, cultural events, educational concerts and collaborations focused on Spanish and Iberian traditional music.</p>
                    </div>
                ) : (
                    <h2 className="text-xl md:text-3xl font-semibold text-gold font-[family-name:var(--font-playfair)] mb-6">Contacto</h2>
                )}

                {/* Management Info */}
                <div
                    className="text-zinc-400 flex flex-col items-center"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div ref={logoRef} className="flex flex-col items-center">
                        <motion.h2
                            style={{ x, y }}
                            onMouseEnter={() => setIsHovering(true)}
                            className="text-3xl md:text-5xl font-normal text-white font-[family-name:var(--font-great-vibes)] mb-3 inline-block cursor-grab active:cursor-grabbing hover:text-gold transition-colors"
                        >
                            La Musgaña
                        </motion.h2>
                        <h3 className="text-white font-bold mb-2 opacity-50 text-sm tracking-widest uppercase">Management & Booking</h3>
                        <p className="text-sm mb-4 uppercase tracking-widest text-gold/80">Oficina La Musgaña</p>
                    </div>
                    <div className="space-y-0.5 text-sm">
                        <a href="mailto:lamusgana@gmail.com" className="block hover:text-gold transition-colors cursor-pointer text-sm">lamusgana@gmail.com</a>
                        <p className="text-sm">+34 918 645 080</p>
                        <p className="uppercase tracking-widest text-xs opacity-60">Madrid, España</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
