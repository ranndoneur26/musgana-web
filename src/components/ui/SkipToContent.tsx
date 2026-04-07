"use client";

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export const SkipToContent = () => {
    const { lang } = useTranslation();
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gold text-black px-6 py-3 z-[100] font-bold uppercase tracking-widest text-sm rounded-sm shadow-2xl border border-white/20 transition-all"
        >
            {lang === 'en' ? 'Skip to main content' : 'Saltar al contenido principal'}
        </a>
    );
};
