"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function VideosSection() {
    const { t } = useTranslation();

    return (
        <section className="container mx-auto px-4 py-20">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl md:text-4xl font-semibold mb-12 text-left text-gold font-[family-name:var(--font-playfair)]">
                    {t.nav.videos}
                </h2>

                <div className="flex flex-col items-center">
                    {/* Direct Iframe Embed - Bulletproof Implementation */}
                    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-black border border-white/10 mb-12">
                        <div className="relative w-full pb-[56.25%]">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/5Ath7RHXgh4?playlist=5Ath7RHXgh4,RV8l4BWSDrk,mOSdUJjwrGQ"
                                title="La Musgaña Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{ border: 0 }}
                            ></iframe>
                        </div>
                    </div>

                    {/* External Link */}
                    <p className="text-zinc-400 mb-6 text-sm md:text-base">{t.videos.searchVideos}</p>
                    <a
                        href="https://www.youtube.com/watch?v=5Ath7RHXgh4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-sm font-semibold border border-gold/30 px-6 py-2 rounded-full hover:bg-gold/10 uppercase tracking-widest"
                    >
                        {t.videos.openYouTube}
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
