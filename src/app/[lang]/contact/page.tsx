import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { GlassCard } from "@/components/ui/GlassCard";
import { submitContactForm } from "@/app/actions/contact";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus('loading');
        setErrors({});

        const formData = new FormData(event.currentTarget);
        const result = await submitContactForm(formData);

        if (result.error) {
            setErrors(result.error);
            setStatus('error');
        } else {
            setStatus('success');
            (event.target as HTMLFormElement).reset();
        }
    }

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Contact Form Section */}
                <GlassCard className="p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                        {t.contact.title}
                    </h1>

                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">¡Mensaje enviado!</h2>
                            <p className="text-zinc-400 mb-8">Gracias por contactar con nosotros. Te responderemos lo antes posible.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="text-gold hover:underline font-medium"
                            >
                                Enviar otro mensaje
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                                    {t.contact.name}
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all`}
                                    placeholder="..."
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                                    {t.contact.email}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all`}
                                    placeholder="example@email.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-zinc-300">
                                    {t.contact.message}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all resize-none`}
                                    placeholder="..."
                                />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message[0]}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-gold text-black font-bold uppercase tracking-wide py-4 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Enviando...
                                    </>
                                ) : (
                                    t.contact.send
                                )}
                            </button>

                            {status === 'error' && !Object.keys(errors).length && (
                                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-lg">
                                    <AlertCircle size={20} />
                                    <p className="text-sm">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>
                                </div>
                            )}
                        </form>
                    )}
                </GlassCard>

                {/* Info & Sidebar Section */}
                <div className="space-y-8 flex flex-col">
                    <GlassCard className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-black/40">
                        <div className="w-full h-64 bg-zinc-800 rounded-lg mb-8 shadow-inner border border-white/5 animate-pulse" />

                        <h3 className="text-xl font-bold text-white mb-2">Management & Booking</h3>
                        <p className="text-zinc-400 mb-6">Oficina La Musgaña</p>

                        <div className="space-y-2 text-zinc-300">
                            <p>info@lamusgana.com</p>
                            <p>+34 000 000 000</p>
                            <p>Madrid, España</p>
                        </div>
                    </GlassCard>
                </div>

            </div>
        </div>
    );
}
