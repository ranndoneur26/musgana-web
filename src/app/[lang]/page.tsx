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

            {/* INTERVIEW ORM */}
            <section id="interview" className="w-full py-6 md:py-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-xl md:text-3xl font-semibold mb-6 text-left tracking-wide text-gold font-[family-name:var(--font-playfair)]">
                            {lang === "en" ? "Interview - Onda Regional de Murcia" : "Entrevista - Onda Regional de Murcia"}
                        </h2>
                        <GlassCard className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-zinc-800/80">
                            <div className="flex-1 space-y-4">
                                <h3 className="text-xl md:text-2xl font-medium text-zinc-100 font-[family-name:var(--font-playfair)]">
                                    La Musgaña. Cuatro décadas de vanguardia y tradición en el folk castellano
                                </h3>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                    {lang === "en" ?
                                        "Jaime Muñoz, founding member of La Musgaña, reviews the 40-year career of the Madrid band and discusses their dedication to the research and dissemination of popular culture." :
                                        "Jaime Muñoz, miembro fundador de La Musgaña, repasa los 40 años de trayectoria de la formación madrileña y su dedicación a la investigación y difusión de la cultura popular."}
                                </p>
                            </div>
                            <a
                                href="https://www.orm.es/programas/el-rompeolas/la-musgana-cuatro-decadas-de-vanguardia-y-tradicion-en-el-folk-castellano/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group shrink-0 inline-flex items-center justify-center gap-3 bg-gold text-zinc-900 px-8 py-4 rounded-full font-semibold hover:bg-gold/90 transition-all duration-300 shadow-lg shadow-gold/20"
                            >
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                {lang === "en" ? "Listen on ORM" : "Escuchar en ORM"}
                            </a>
                        </GlassCard>
                    </div>
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

