"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CancelPage() {
    const { t, lang } = useTranslation();

    return (
        <div className="container mx-auto px-4 py-32 md:py-40 min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
            >
                <GlassCard className="p-8 md:p-12 text-center border-red-500/20">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                            <XCircle className="w-12 h-12 text-red-500" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                        Pago cancelado
                    </h1>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        El proceso de pago ha sido cancelado. No se ha realizado ningún cargo en tu tarjeta. Si has tenido algún problema, no dudes en contactar con nosotros.
                    </p>
                    <Link
                        href={`/${lang}/tienda`}
                        className="inline-block py-3 px-8 border border-white/20 hover:bg-white/10 text-white font-bold rounded-lg transition-all duration-300 uppercase tracking-wider text-sm"
                    >
                        Reintentar compra
                    </Link>
                </GlassCard>
            </motion.div>
        </div>
    );
}
