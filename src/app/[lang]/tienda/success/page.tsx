"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage() {
    const { t, lang } = useTranslation();

    return (
        <div className="container mx-auto px-4 py-32 md:py-40 min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
            >
                <GlassCard className="p-8 md:p-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-gold" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                        ¡Gracias por tu compra!
                    </h1>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        Hemos recibido tu pedido correctamente. En breve recibirás un correo electrónico con los detalles de la compra y la información de seguimiento.
                    </p>
                    <Link
                        href={`/${lang}/tienda`}
                        className="inline-block py-3 px-8 bg-gold hover:bg-gold-light text-black font-bold rounded-lg transition-all duration-300 uppercase tracking-wider text-sm"
                    >
                        Volver a la tienda
                    </Link>
                </GlassCard>
            </motion.div>
        </div>
    );
}
