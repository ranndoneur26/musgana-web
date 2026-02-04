"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export function ContactSection() {
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
        <section className="container mx-auto px-4 py-10 md:py-20 flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-full max-w-5xl flex flex-col items-center text-center">

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
                            className="text-5xl md:text-7xl font-normal text-white font-[family-name:var(--font-great-vibes)] mb-6 inline-block cursor-grab active:cursor-grabbing hover:text-gold transition-colors"
                        >
                            La Musgaña
                        </motion.h2>
                        <h3 className="text-white font-bold mb-2 opacity-50 text-xl tracking-widest uppercase">Management & Booking</h3>
                        <p className="text-lg mb-8 uppercase tracking-widest text-gold/80">Oficina La Musgaña</p>
                    </div>
                    <div className="space-y-4 text-lg">
                        <a href="mailto:lamusgana@gmail.com" className="block hover:text-gold transition-colors cursor-pointer text-xl">lamusgana@gmail.com</a>
                        <p className="text-xl">+34 918 645 080</p>
                        <p className="uppercase tracking-widest text-sm opacity-60">Madrid, España</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
