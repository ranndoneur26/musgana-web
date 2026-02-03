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

                <div className="text-center py-10">
                    <p className="text-zinc-400 mb-8">{t.videos.searchVideos}</p>
                    <a
                        href="https://www.youtube.com/results?search_query=la+musga%C3%B1a+oficial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors text-lg font-semibold border border-gold/30 px-6 py-3 rounded-full hover:bg-gold/10"
                    >
                        {t.videos.openYouTube}
                        <svg
                            className="w-5 h-5"
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
