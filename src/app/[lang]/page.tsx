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
import { LiveHistorySection } from "@/components/sections/LiveHistorySection";
import { PodcastSection } from "@/components/sections/PodcastSection";
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
        <div className="min-h-screen pb-8">


            <HeroSlider />

            {/* CONCERTS */}
            <div id="concerts" className="pt-0 pb-0">
                <ConcertsSection />
            </div>

            {/* HISTORY */}
            <section id="history" className="container mx-auto px-4 pb-4 relative z-30">
                <div className="max-w-5xl mx-auto relative">

                    <div className="pt-4 md:pt-6">
                        <h2 className="text-xl md:text-4xl font-semibold mb-8 text-left tracking-wide text-gold font-[family-name:var(--font-playfair)]">
                            {t.home.historyTitle}
                        </h2>
                    </div>
                    <GlassCard>
                        <Accordion items={historyItems} />
                    </GlassCard>
                </div>
            </section>

            {/* PODCAST SECTION */}
            <div id="podcast">
                <PodcastSection />
            </div>

            {/* DISCOGRAPHY */}
            <section id="discography" className="w-full py-4 md:py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-xl md:text-4xl font-semibold mb-8 text-left text-gold font-[family-name:var(--font-playfair)]">
                            {t.sections.discography}
                        </h2>
                        <Slider />
                    </div>
                </div>
            </section>

            {/* LIVE CONCERTS HISTORY */}
            <LiveHistorySection />

            {/* VIDEOS */}
            <div id="videos">
                <VideosSection />
            </div>


            {/* CONTACT */}
            <div id="contact">
                <ContactSection />
            </div>

        </div>
    );
}

