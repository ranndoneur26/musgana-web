"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function WelcomePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        setHasHydrated(true);
        // Mostrar el popup si no se ha visto en esta sesión
        const hasSeenPopup = sessionStorage.getItem("hasSeenWelcomePopup");

        if (!hasSeenPopup) {
            const showTimer = setTimeout(() => {
                setIsVisible(true);
                sessionStorage.setItem("hasSeenWelcomePopup", "true");
            }, 500);

            // Cerrar automáticamente después de 8 segundos de mostrarse
            const hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, 8500);

            return () => {
                clearTimeout(showTimer);
                clearTimeout(hideTimer);
            };
        }
    }, []);

    if (!hasHydrated || !isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative max-w-4xl w-full aspect-[3/2] bg-black/50 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors flex items-center justify-center border border-white/20"
                    aria-label="Cerrar"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                        src="/images/popup-2026.jpg"
                        alt="La Musgaña 2026"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
