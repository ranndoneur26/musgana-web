"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Header() {
    const { t, lang } = useTranslation();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const switchLanguage = (newLang: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = newLang; // /es/... -> /en/...
        return segments.join("/");
    };

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/80 border-b border-white/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href={`/${lang}`} className="text-4xl font-normal hover:text-gold transition-colors font-[family-name:var(--font-great-vibes)]">
                    La Musgaña
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href={`/${lang}#history`} className="text-xs uppercase tracking-wide hover:text-gold transition-colors">
                        {t.nav.history}
                    </Link>
                    <Link href={`/${lang}#discography`} className="text-xs uppercase tracking-wide hover:text-gold transition-colors">
                        {t.nav.discography}
                    </Link>
                    <Link href={`/${lang}#videos`} className="text-xs uppercase tracking-wide hover:text-gold transition-colors">
                        {t.nav.videos}
                    </Link>
                    <Link href={`/${lang}#concerts`} className="text-xs uppercase tracking-wide hover:text-gold transition-colors">
                        {t.nav.concerts}
                    </Link>
                    <Link href={`/${lang}#contact`} className="text-xs uppercase tracking-wide hover:text-gold transition-colors">
                        {t.nav.contact}
                    </Link>
                    <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                        <Link
                            href={switchLanguage("es")}
                            className={`text-xs font-bold ${lang === "es" ? "text-gold" : "text-zinc-500 hover:text-white"}`}
                        >
                            ES
                        </Link>
                        <span className="text-zinc-700">|</span>
                        <Link
                            href={switchLanguage("en")}
                            className={`text-xs font-bold ${lang === "en" ? "text-gold" : "text-zinc-500 hover:text-white"}`}
                        >
                            EN
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                            <Link
                                href={`/${lang}#history`}
                                onClick={closeMenu}
                                className="text-xs uppercase tracking-wide hover:text-gold transition-colors py-2"
                            >
                                {t.nav.history}
                            </Link>
                            <Link
                                href={`/${lang}#discography`}
                                onClick={closeMenu}
                                className="text-xs uppercase tracking-wide hover:text-gold transition-colors py-2"
                            >
                                {t.nav.discography}
                            </Link>
                            <Link
                                href={`/${lang}#videos`}
                                onClick={closeMenu}
                                className="text-xs uppercase tracking-wide hover:text-gold transition-colors py-2"
                            >
                                {t.nav.videos}
                            </Link>
                            <Link
                                href={`/${lang}#concerts`}
                                onClick={closeMenu}
                                className="text-xs uppercase tracking-wide hover:text-gold transition-colors py-2"
                            >
                                {t.nav.concerts}
                            </Link>
                            <Link
                                href={`/${lang}#contact`}
                                onClick={closeMenu}
                                className="text-xs uppercase tracking-wide hover:text-gold transition-colors py-2"
                            >
                                {t.nav.contact}
                            </Link>
                            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-white/10">
                                <Link
                                    href={switchLanguage("es")}
                                    onClick={closeMenu}
                                    className={`px-4 py-2 rounded-lg font-bold text-sm ${lang === "es" ? "bg-gold text-black" : "bg-white/5 text-zinc-400 hover:bg-white/10"}`}
                                >
                                    Español
                                </Link>
                                <Link
                                    href={switchLanguage("en")}
                                    onClick={closeMenu}
                                    className={`px-4 py-2 rounded-lg font-bold text-sm ${lang === "en" ? "bg-gold text-black" : "bg-white/5 text-zinc-400 hover:bg-white/10"}`}
                                >
                                    English
                                </Link>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
