"use client";

import { useSessionTimeout } from "@/hooks/useSessionTimeout";

export const SessionTracker = () => {
    useSessionTimeout();
    return null; // This component doesn't render anything, just runs the hook
};
