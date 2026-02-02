"use client";

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

export function useSessionTimeout() {
    const router = useRouter();

    const handleLogout = useCallback(() => {
        // En una app con auth real, aquí limpiaríamos cookies/tokens
        console.log("[AUDIT] Session timed out due to inactivity.");
        // For now, just redirect to home or show a message
        // router.push('/');
    }, [router]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const resetTimer = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(handleLogout, INACTIVITY_LIMIT);
        };

        const events = [
            'mousedown', 'mousemove', 'keypress',
            'scroll', 'touchstart', 'click'
        ];

        events.forEach(event => {
            document.addEventListener(event, resetTimer);
        });

        resetTimer();

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, resetTimer);
            });
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [handleLogout]);
}
