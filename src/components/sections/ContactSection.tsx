"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export function ContactSection() {
    const { t } = useTranslation();
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
        <section id="contact" className="container mx-auto px-4 py-20 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <h2 className="text-xl md:text-4xl font-semibold mb-12 text-left text-gold font-[family-name:var(--font-playfair)]">
                    {t.contact.title}
                </h2>

                <div className="w-full max-w-5xl">
                    {/* Modern Minimalist Contact Form - Wide Layout */}
                    <form className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                            {/* Row 1 */}
                            <div className="space-y-1">
                                <label htmlFor="name" className="text-xs uppercase tracking-widest text-zinc-500 ml-1">
                                    {t.contact.name}*
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-gold transition-all"
                                    placeholder={t.contact.namePlaceholder}
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="email" className="text-xs uppercase tracking-widest text-zinc-500 ml-1">
                                    {t.contact.email}*
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-gold transition-all"
                                    placeholder="Email"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="phone" className="text-xs uppercase tracking-widest text-zinc-500 ml-1">
                                    {t.contact.phone}*
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    required
                                    className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-gold transition-all"
                                    placeholder="+34"
                                />
                            </div>

                            {/* Row 2 */}
                            <div className="space-y-1">
                                <label htmlFor="city" className="text-xs uppercase tracking-widest text-zinc-500 ml-1">
                                    {t.contact.city}*
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    required
                                    className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-gold transition-all"
                                    placeholder={t.contact.cityPlaceholder}
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="company" className="text-xs uppercase tracking-widest text-zinc-500 ml-1">
                                    {t.contact.company}*
                                </label>
                                <input
                                    id="company"
                                    type="text"
                                    required
                                    className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-gold transition-all"
                                    placeholder={t.contact.companyPlaceholder}
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="captcha" className="text-xs uppercase tracking-widest text-zinc-500 ml-1">
                                    {t.contact.validation}*
                                </label>
                                <input
                                    id="captcha"
                                    type="text"
                                    required
                                    className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-gold transition-all"
                                    placeholder={t.contact.captchaPlaceholder}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="message" className="text-xs uppercase tracking-widest text-zinc-500 ml-1">
                                {t.contact.message}*
                            </label>
                            <textarea
                                id="message"
                                rows={2}
                                required
                                className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-gold transition-all resize-none"
                                placeholder="Escribe tu mensaje..."
                            />
                        </div>

                        <div className="flex justify-start">
                            <button
                                type="submit"
                                className="bg-gold text-black px-16 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#1b4332] hover:text-white transition-all duration-300 rounded-sm"
                            >
                                {t.contact.send}
                            </button>
                        </div>
                    </form>

                    {/* Management Info below form */}
                    <div
                        className="mt-20 pt-8 border-t border-white/5 text-zinc-400"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div ref={logoRef}>
                            <motion.h2
                                style={{ x, y }}
                                onMouseEnter={() => setIsHovering(true)}
                                className="text-3xl font-normal text-white font-[family-name:var(--font-great-vibes)] mb-4 inline-block cursor-grab active:cursor-grabbing hover:text-gold transition-colors"
                            >
                                La Musgaña
                            </motion.h2>
                            <h3 className="text-white font-bold mb-1 opacity-50">Management & Booking</h3>
                            <p className="text-sm mb-4">Oficina La Musgaña</p>
                        </div>
                        <div className="space-y-1 text-sm">
                            <p className="hover:text-gold transition-colors cursor-pointer">info@lamusgana.com</p>
                            <p>+34 000 000 000</p>
                            <p>Madrid, España</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
