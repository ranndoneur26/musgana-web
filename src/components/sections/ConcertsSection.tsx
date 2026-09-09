"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { DailyCalendar } from "@/components/ui/DailyCalendar";

import Image from "next/image";

export function ConcertsSection() {
    const { t } = useTranslation();

    return (
        <section className="container mx-auto px-4 py-4 md:py-8 flex flex-col items-center justify-start relative">
            {/* Header graphic for 40th anniversary */}
            <div className="w-full max-w-5xl flex flex-row items-center justify-start -mt-12 mb-0 z-50 relative pointer-events-none">
                <div className="relative w-[331px] h-[184px] sm:w-[368px] sm:h-[221px] md:w-[690px] md:h-[380px] -mt-2 md:-mt-12 scale-[1.2]">
                    <Image
                        src="/images/40-anniversari.svg"
                        alt="40 Aniversario"
                        fill
                        className="object-contain object-left box-content drop-shadow-2xl"
                        priority
                    />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-5xl -mt-12 md:-mt-24 z-10 relative flex justify-center"
            >
                {/* Daily Calendar Replaces Previous Grid / Google Calendar */}
                <DailyCalendar className="w-full mx-auto md:mb-8 mb-12" />
            </motion.div>
        </section>
    );
}
