"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";

export default function ContactPage() {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Contact Form Section */}
                <GlassCard className="p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                        {t.contact.title}
                    </h1>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                                {t.contact.name}
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                                placeholder="..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                                {t.contact.email}
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                                placeholder="example@email.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-zinc-300">
                                {t.contact.message}
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all resize-none"
                                placeholder="..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gold text-black font-bold uppercase tracking-wide py-4 rounded-lg hover:bg-yellow-600 transition-colors"
                        >
                            {t.contact.send}
                        </button>
                    </form>
                </GlassCard>

                {/* Info & Sidebar Section */}
                <div className="space-y-8 flex flex-col">
                    <GlassCard className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-black/40">
                        <div className="w-full h-64 bg-zinc-800 rounded-lg mb-8 shadow-inner border border-white/5 animate-pulse" />

                        <h3 className="text-xl font-bold text-white mb-2">Management & Booking</h3>
                        <p className="text-zinc-400 mb-6">Oficina La Musgaña</p>

                        <div className="space-y-2 text-zinc-300">
                            <p>info@lamusgana.com</p>
                            <p>+34 000 000 000</p>
                            <p>Madrid, España</p>
                        </div>
                    </GlassCard>
                </div>

            </div>
        </div>
    );
}
