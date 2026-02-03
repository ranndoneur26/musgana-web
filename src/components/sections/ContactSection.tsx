"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactSection() {
    const { t } = useTranslation();
    const logoRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string[]>>({});

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

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus('loading');
        setErrors({});

        const formData = new FormData(event.currentTarget);
        const result = await submitContactForm(formData);

        if (result.error) {
            setErrors(result.error);
            setStatus('error');
        } else {
            setStatus('success');
            (event.target as HTMLFormElement).reset();
        }
    }

    return (
        <section id="contact" className="container mx-auto px-4 py-20 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <h2 className="text-xl md:text-4xl font-semibold mb-12 text-left text-gold font-[family-name:var(--font-playfair)]">
                    {t.contact.title}
                </h2>

                <div className="w-full max-w-5xl">
                    {status === 'success' ? (
                        <GlassCard className="p-12 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4 font-bold border border-green-500/20">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
                            <p className="text-zinc-400 mb-8 max-w-md mx-auto">Gracias por contactar con nosotros. Te responderemos lo antes posible.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="text-gold hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border border-gold/20 px-8 py-3 rounded-full hover:bg-gold/10"
                            >
                                Enviar otro mensaje
                            </button>
                        </GlassCard>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                                {/* Row 1 */}
                                <div className="space-y-1">
                                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-zinc-500 ml-1">
                                        {t.contact.name}*
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className={`w-full bg-white/[0.03] border-b ${errors.name ? 'border-red-500' : 'border-white/10'} px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-gold transition-all`}
                                        placeholder={t.contact.namePlaceholder}
                                    />
                                    {errors.name && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-tighter">{errors.name[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-zinc-500 ml-1">
                                        {t.contact.email}*
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className={`w-full bg-white/[0.03] border-b ${errors.email ? 'border-red-500' : 'border-white/10'} px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-gold transition-all`}
                                        placeholder="Email"
                                    />
                                    {errors.email && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-tighter">{errors.email[0]}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="phone" className="text-xs uppercase tracking-widest text-zinc-500 ml-1">
                                        {t.contact.phone}*
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
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
                                        name="city"
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
                                        name="company"
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
                                        name="captcha"
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
                                    name="message"
                                    rows={2}
                                    required
                                    className={`w-full bg-white/[0.03] border-b ${errors.message ? 'border-red-500' : 'border-white/10'} px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-gold transition-all resize-none`}
                                    placeholder="Escribe tu mensaje..."
                                />
                                {errors.message && <p className="text-red-500 text-[10px] mt-1 uppercase tracking-tighter">{errors.message[0]}</p>}
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="bg-gold text-black px-16 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#1b4332] hover:text-white transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        t.contact.send
                                    )}
                                </button>

                                {status === 'error' && !Object.keys(errors).length && (
                                    <div className="flex items-center gap-2 text-red-500 text-xs uppercase tracking-widest">
                                        <AlertCircle size={16} />
                                        <span>Error al enviar</span>
                                    </div>
                                )}
                            </div>
                        </form>
                    )}

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
                            <p className="hover:text-gold transition-colors cursor-pointer">lamusgana@gmail.com</p>
                            <p>+34 918 645 080</p>
                            <p>Madrid, España</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
