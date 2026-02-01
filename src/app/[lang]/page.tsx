"use client";

export const dynamic = "force-dynamic";

import { useTranslation } from "@/hooks/useTranslation";
import { Accordion } from "@/components/ui/Accordion";
import { GlassCard } from "@/components/ui/GlassCard";
import content from "@/data/content.json";

// Sections
import { HeroSlider } from "@/components/sections/HeroSlider";
import { VideosSection } from "@/components/sections/VideosSection";
import { ConcertsSection } from "@/components/sections/ConcertsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Slider } from "@/components/ui/Slider";
import Image from "next/image";

export default function HomePage() {
    const { t, lang } = useTranslation();

    const historyItems = content.history.map((item) => ({
        id: item.id,
        title: `${item.period} - ${item.title[lang as "es" | "en"]}`,
        content: item.content[lang as "es" | "en"],
    }));

    return (
        <div className="min-h-screen pb-20">

            <HeroSlider />



            {/* HISTORY */}
            <section id="history" className="container mx-auto px-4 pb-20 relative z-30">
                <div className="max-w-5xl mx-auto relative">
                    {/* 40th ANNIVERSARY LOGO - Absolute position nicely overlapping */}
                    <div className="absolute -top-36 left-0 -translate-y-1/2 w-[29rem] h-[29rem] md:w-[36rem] md:h-[36rem] transition-transform duration-500 hover:scale-105 z-40">
                        <Image
                            src="/images/40-anniversari.svg"
                            alt="La Musgaña 40 Aniversario (1986-2026)"
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                            priority
                        />
                    </div>

                    <div className="pt-20 md:pt-24">
                        <h2 className="text-xl md:text-4xl font-semibold mb-8 text-left tracking-wide text-gold font-[family-name:var(--font-playfair)]">
                            {t.home.historyTitle}
                        </h2>
                    </div>
                    <GlassCard>
                        <Accordion items={historyItems} />
                    </GlassCard>
                </div>
            </section>

            {/* DISCOGRAPHY */}
            <section id="discography" className="w-full py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-xl md:text-4xl font-semibold mb-8 text-left text-gold font-[family-name:var(--font-playfair)]">
                            {t.sections.discography}
                        </h2>
                        <Slider />
                    </div>
                </div>
            </section>

            {/* VIDEOS */}
            <div id="videos">
                <VideosSection />
            </div>

            {/* CONCERTS */}
            <div id="concerts">
                <ConcertsSection />
            </div>

            {/* CONTACT */}
            <div id="contact">
                <ContactSection />
            </div>

        </div>
    );
}

