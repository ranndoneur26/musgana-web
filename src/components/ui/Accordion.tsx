"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (isOpen && buttonRef.current) {
            // Pequeño delay para permitir que la animación comience
            setTimeout(() => {
                buttonRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }, 100);
        }
    }, [isOpen]);

    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                ref={buttonRef}
                onClick={onToggle}
                className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-gold"
            >
                <span className="flex-1 pr-4 text-left">
                    {(() => {
                        // Check if title has pattern: "YYYY-YYYY - Title. Rest of text"
                        const match = title.match(/^(\d{4}-\d{4})\s*-\s*([^.]+\.)\s*(.*)$/);
                        if (match) {
                            const [, period, subtitle, rest] = match;
                            return (
                                <>
                                    <span className="font-bold text-[1.15rem]">{period}</span>
                                    {" - "}
                                    <span className="font-bold text-[1.15rem]">{subtitle}</span>
                                    {rest && <> {rest}</>}
                                </>
                            );
                        }
                        return title;
                    })()}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDownIcon className="h-5 w-5" />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto", marginBottom: 16 },
                            collapsed: { opacity: 0, height: 0, marginBottom: 0 },
                        }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        {typeof children === 'string' ? (
                            <div
                                className="text-left text-zinc-400 max-w-none [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [& strong]:text-gold"
                                dangerouslySetInnerHTML={{ __html: children }}
                            />
                        ) : (
                            <div className="text-left text-zinc-400 max-w-none">
                                {children}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface AccordionProps {
    items: { id: string; title: string; content: string | React.ReactNode }[];
    className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
    const [openId, setOpenId] = React.useState<string | null>(null);

    // Configurar event listeners para los acordeones anidados dentro del HTML inyectado
    React.useEffect(() => {
        const handleInnerToggle = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Buscar el botón toggle más cercano (por si se hace clic en el icono o span)
            const toggleBtn = target.closest('.accordion__toggle');

            if (toggleBtn) {
                const content = toggleBtn.nextElementSibling as HTMLElement;
                if (content && content.classList.contains('accordion__content')) {
                    // Alternar clase 'hidden' para mostrar/ocultar
                    content.classList.toggle('hidden');

                    // Actualizar aria-expanded
                    const expanded = content.classList.contains('hidden') ? 'false' : 'true';
                    toggleBtn.setAttribute('aria-expanded', expanded);

                    // Rotar icono si existe
                    const icon = toggleBtn.querySelector('.accordion__icon');
                    if (icon) {
                        icon.setAttribute('style', expanded === 'true' ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)');
                    }
                }
            }
        };

        // Delegación de eventos en el documento (o podríamos limitarlo a un ref del contenedor)
        document.addEventListener('click', handleInnerToggle);
        return () => document.removeEventListener('click', handleInnerToggle);
    }, []);

    const handleToggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className={cn("w-full", className)}>
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                >
                    <AccordionItem
                        title={item.title}
                        isOpen={openId === item.id}
                        onToggle={() => handleToggle(item.id)}
                    >
                        {item.content}
                    </AccordionItem>
                </motion.div>
            ))}
        </div>
    );
}
