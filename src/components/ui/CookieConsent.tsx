"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { X } from "lucide-react";

export function CookieConsent() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        technical: true,
        analytics: true,
        marketing: false
    });

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else {
            const savedPrefs = localStorage.getItem("cookie-preferences");
            if (savedPrefs) setPreferences(JSON.parse(savedPrefs));
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "true");
        localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
        setIsVisible(false);
    };

    const togglePreference = (key: keyof typeof preferences) => {
        if (key === 'technical') return;
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-[100]"
                >
                    <div className="bg-black/90 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            {!showSettings ? (
                                <>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-gold font-bold text-sm uppercase tracking-widest">
                                            {t.cookies?.title || "Privacidad"}
                                        </h3>
                                        <button
                                            onClick={() => setIsVisible(false)}
                                            className="text-zinc-500 hover:text-white transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <p className="text-xs leading-relaxed text-zinc-300 mb-6">
                                        {t.cookies?.description || "Utilizamos cookies para mejorar tu experiencia. Al aceptar, consientes el uso de todas las tecnologías mencionadas."}
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={acceptCookies}
                                            className="w-full bg-gold text-black text-[11px] font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-white transition-all duration-500 hover:scale-[1.02] shadow-xl shadow-gold/10"
                                        >
                                            {t.cookies?.accept || "Aceptar todo"}
                                        </button>
                                        <button
                                            onClick={() => setShowSettings(true)}
                                            className="w-full bg-white/5 text-zinc-400 text-[11px] font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-white/10 transition-all border border-white/5"
                                        >
                                            {t.cookies?.decline || "Configurar preferencias"}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-gold font-bold text-sm uppercase tracking-widest">
                                            {t.cookies?.settingsTitle || "Preferencias"}
                                        </h3>
                                        <button
                                            onClick={() => setShowSettings(false)}
                                            className="text-zinc-500 hover:text-white transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                                            <div>
                                                <p className="text-[11px] font-bold text-white mb-0.5">Técnicas</p>
                                                <p className="text-[9px] text-zinc-500">Esenciales para la web</p>
                                            </div>
                                            <div className="w-8 h-4 bg-gold/50 rounded-full relative opacity-50 cursor-not-allowed">
                                                <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                                            onClick={() => togglePreference('analytics')}
                                        >
                                            <div>
                                                <p className="text-[11px] font-bold text-white mb-0.5">Analíticas</p>
                                                <p className="text-[9px] text-zinc-500">Para medir el tráfico</p>
                                            </div>
                                            <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${preferences.analytics ? 'bg-gold' : 'bg-zinc-700'}`}>
                                                <motion.div
                                                    animate={{ x: preferences.analytics ? 18 : 4 }}
                                                    className="absolute top-1 w-2 h-2 bg-white rounded-full"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                                            onClick={() => togglePreference('marketing')}
                                        >
                                            <div>
                                                <p className="text-[11px] font-bold text-white mb-0.5">Marketing</p>
                                                <p className="text-[9px] text-zinc-500">Publicidad relevante</p>
                                            </div>
                                            <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${preferences.marketing ? 'bg-gold' : 'bg-zinc-700'}`}>
                                                <motion.div
                                                    animate={{ x: preferences.marketing ? 18 : 4 }}
                                                    className="absolute top-1 w-2 h-2 bg-white rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={acceptCookies}
                                        className="w-full bg-gold text-black text-[11px] font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-white transition-all shadow-xl shadow-gold/10"
                                    >
                                        Guardar preferencias
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
