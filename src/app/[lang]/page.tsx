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

import { Slider } from "@/components/ui/Slider";


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
            <section id="concerts" className="pt-0 pb-0">
                {lang === "en" && (
                    <div className="container mx-auto px-4 pt-6 pb-0">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-xl md:text-4xl font-semibold mb-4 text-left text-gold font-[family-name:var(--font-playfair)]">
                                Upcoming Concerts
                            </h2>
                            <div className="mb-4 space-y-3 text-zinc-300 text-sm md:text-base leading-relaxed max-w-3xl">
                                <p>La Musgaña continues to tour regularly, bringing Spanish folk music to festivals, theatres and cultural venues across Spain and abroad. Explore the upcoming concert dates to experience contemporary Iberian folk live on stage.</p>
                                <p>The 40th anniversary tour features a special selection of pieces from the band&apos;s entire career, revisiting classic tunes and introducing new arrangements inspired by traditional Castilian and northwestern Iberian melodies.</p>
                            </div>
                        </div>
                    </div>
                )}
                <ConcertsSection />
            </section>

            {/* HISTORY */}
            <section id="history" className="container mx-auto px-4 pb-4 relative z-30">
                <div className="max-w-5xl mx-auto relative">

                    <div className="pt-4 md:pt-6">
                        <h2 className="text-xl md:text-4xl font-semibold mb-4 text-left tracking-wide text-gold font-[family-name:var(--font-playfair)]">
                            {t.home.historyTitle}
                        </h2>
                        {lang === "en" ? (
                            <div className="mb-6 space-y-3 text-zinc-300 text-sm md:text-base leading-relaxed max-w-3xl">
                                <p>La Musgaña is one of the most influential Spanish folk bands to emerge from Madrid&apos;s vibrant traditional music scene. Since 1986, the group has explored the roots of Castilian and Iberian folk, bringing ancient tunes to international stages across Europe and North America.</p>
                                <p>Over four decades, La Musgaña has become a reference for contemporary Iberian folk, combining bagpipes, flutes, hurdy-gurdy and percussion with modern arrangements that keep traditional Spanish music alive and relevant.</p>
                            </div>
                        ) : null}
                    </div>
                    <GlassCard>
                        <Accordion items={historyItems} />
                    </GlassCard>
                </div>
            </section>



            {/* DISCOGRAPHY */}
            <section id="discography" className="w-full py-4 md:py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-xl md:text-4xl font-semibold mb-4 text-left text-gold font-[family-name:var(--font-playfair)]">
                            {t.sections.discography}
                        </h2>
                        {lang === "en" ? (
                            <div className="mb-6 space-y-3 text-zinc-300 text-sm md:text-base leading-relaxed max-w-3xl">
                                <p>La Musgaña&apos;s discography spans more than a dozen albums that trace the evolution of contemporary Iberian folk music. From their acclaimed debut &ldquo;El Diablo Cojuelo&rdquo; to the anniversary release &ldquo;La Musgaña 2026&rdquo;, each record offers a unique journey through Castilian dances, northern Iberian melodies and innovative folk arrangements.</p>
                                <p>Their albums have been released on iconic folk labels in Spain, Europe and North America, helping to position La Musgaña as a key Spanish folk band for listeners discovering traditional music from the Iberian Peninsula.</p>
                            </div>
                        ) : null}
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

