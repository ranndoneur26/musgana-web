"use client";

import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Script from "next/script";

export default function TiendaPage() {
    const { t, lang } = useTranslation();
    const [genero, setGenero] = useState<'male' | 'female'>('male');
    const [talla, setTalla] = useState<string>('L');
    const [cantidad, setCantidad] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [showLegalModal, setShowLegalModal] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [showIllustration, setShowIllustration] = useState(false);

    // Shipping form state
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [shippingDetails, setShippingDetails] = useState({
        firstName: '', lastName: '', email: '',
        address: '', city: '', zip: '', province: '', country: 'España'
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingDetails(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};
        const required = ['firstName', 'lastName', 'email', 'address', 'city', 'zip', 'province', 'country'];

        required.forEach(field => {
            if (!shippingDetails[field as keyof typeof shippingDetails].trim()) {
                errors[field] = (t.store as any).shippingForm.required;
            }
        });

        if (!dni.trim()) {
            errors.dni = 'El D.N.I es obligatorio';
        }

        if (!telefono.trim()) {
            errors.telefono = (t.store as any).shippingForm.required;
        } else if (telefono.trim().length < 6) {
            errors.telefono = 'el teléfono no parece válido';
        }

        if (shippingDetails.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingDetails.email)) {
            errors.email = (t.store as any).shippingForm.invalidEmail;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const renderInput = (name: keyof typeof shippingDetails, label: string, type = "text", placeholder = "") => (
        <div className="flex flex-col gap-1 w-full relative group">
            <label className="text-[10px] uppercase font-bold text-zinc-400 pl-1 tracking-wider">{label}</label>
            <input
                type={type}
                name={name}
                value={shippingDetails[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={`w-full bg-white/5 border ${formErrors[name] ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]'} rounded-lg px-4 py-3 text-white text-sm transition-all focus:outline-none focus:ring-1 ${formErrors[name] ? 'focus:ring-red-500/50' : 'focus:ring-gold/50'} placeholder:text-zinc-600 backdrop-blur-sm group-hover:bg-white/10`}
            />
            <AnimatePresence>
                {formErrors[name] && (
                    <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red-400 text-[10px] pl-1 absolute -bottom-4"
                    >
                        {formErrors[name]}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );

    const handleCheckout = async () => {
        if (!validateForm()) {
            setIsShippingOpen(true);
            alert((t.store as any).shippingForm.fillAll);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    genero,
                    talla,
                    cantidad,
                    dni,
                    telefono,
                    lang: lang || 'es',
                    shippingDetails
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Error al crear la sesión de pago');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Error al procesar la compra. Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const trustItems = [
        { icon: "🚚", text: t.store.trust.delivery },
        { icon: "🔒", text: t.store.trust.payments },
        { icon: "⚖️", text: t.store.trust.legal, isLegal: true },
        { icon: "👕", text: t.store.trust.ondemand },
    ];

    // Schema.org Product Markup
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": t.store.tshirtTitle,
        "image": genero === 'male'
            ? "https://lamusgaña.net/images/shop/tshirt_40th_mockup.png"
            : "https://lamusgaña.net/images/shop/tshirt_40th_female_mockup.png",
        "description": genero === 'male'
            ? (t.store as any).tshirtDescMale
            : (t.store as any).tshirtDescFemale,
        "brand": {
            "@type": "Brand",
            "name": "La Musgaña"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://lamusgaña.net/es/tienda",
            "priceCurrency": "EUR",
            "price": "29.00",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <>
            <head>
                <title>{lang === 'es' ? 'Camiseta La Musgaña 40 Aniversario – Tienda' : 'La Musgaña 40th Anniversary T-Shirt – Store'}</title>
                <meta name="description" content={lang === 'es'
                    ? "Compra la camiseta La Musgaña 40 aniversario. Exclusiva para el concierto del Gran Teatro Pavón. Merchandising oficial de folk ibérico y folk español."
                    : "Buy the official La Musgaña 40th anniversary t-shirt. Exclusive Iberian folk merchandising. Fast shipping."
                } />
            </head>
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            <div className="container mx-auto px-4 py-32 md:py-24 min-h-screen flex flex-col justify-center">
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-[family-name:var(--font-playfair)]">
                        {lang === 'es' ? 'Camiseta La Musgaña 40 Aniversario' : t.store.title}
                    </h1>
                    <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto italic">
                        {(t.store as any).supportText}
                    </p>
                </div>

                <div className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full max-w-2xl md:max-w-6xl"
                    >
                        <GlassCard className="flex flex-col md:flex-row h-full overflow-hidden hover:bg-white/10 transition-colors duration-300">
                            {/* Product Image Area */}
                            <div className="relative w-full md:w-3/5 bg-[#1a1a1a] border-r border-white/5 overflow-hidden flex flex-col items-center justify-center min-h-[400px] md:min-h-[550px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={genero}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full flex flex-col items-center justify-center py-8 md:py-0 h-full"
                                    >
                                        <Image
                                            src={genero === 'male' ? "/images/shop/tshirt_40th_mockup.png" : "/images/shop/tshirt_40th_female_mockup.png"}
                                            alt={genero === 'male' ? "Camiseta La Musgaña 40 aniversario verde botella hombre" : "Camiseta La Musgaña 40 aniversario verde botella mujer"}
                                            width={1000}
                                            height={1000}
                                            className={`w-[125%] max-w-[125%] h-full object-cover md:object-contain transition-transform duration-500 hover:scale-[1.02] mb-2 ${genero === 'female' ? 'scale-125' : ''}`}
                                            priority
                                        />
                                        <button
                                            onClick={() => setShowIllustration(true)}
                                            className="text-center text-gold text-xs font-semibold hover:text-gold-light transition-colors underline cursor-pointer z-10 relative mt-auto mb-4"
                                        >
                                            🔍 Ver ilustración en detalle
                                        </button>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Product Details */}
                            <div className="w-full md:w-2/5 p-8 flex flex-col bg-zinc-900/40 justify-center">
                                <div className="flex-grow flex flex-col justify-center">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                        {t.store.tshirtTitle}
                                    </h2>

                                    <div className="text-3xl font-bold text-gold mb-4 mt-4">
                                        {t.store.price}
                                    </div>

                                    {/* Gender Selection - right below price */}
                                    <div className="mb-4 border-t border-white/10 pt-4">
                                        <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-3">
                                            {t.store.gender}
                                        </span>
                                        <div className="flex gap-3">
                                            {(['male', 'female'] as const).map(gender => (
                                                <button
                                                    key={gender}
                                                    onClick={() => setGenero(gender)}
                                                    className={`px-4 py-2 rounded border transition-all duration-300 text-xs font-medium ${genero === gender
                                                        ? "bg-gold border-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                                        : "bg-white/5 border-white/20 text-zinc-400 hover:border-white/40 hover:text-white"
                                                        }`}
                                                >
                                                    {gender === 'male' ? (t.store as any).male : (t.store as any).female}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dynamic Description based on gender */}
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={genero}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.25 }}
                                            className="text-zinc-300 text-sm leading-relaxed mb-6"
                                        >
                                            {genero === 'male'
                                                ? (t.store as any).tshirtDescMale
                                                : (t.store as any).tshirtDescFemale}
                                        </motion.p>
                                    </AnimatePresence>

                                    <div className="space-y-6 mb-8 md:mb-4">
                                        {/* Size Selection */}
                                        <div>
                                            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-3">
                                                {t.store.sizes}
                                            </span>
                                            <div className="flex gap-2 flex-wrap">
                                                {(genero === 'male'
                                                    ? ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']
                                                    : ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']
                                                ).map(size => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setTalla(size)}
                                                        className={`w-10 h-10 rounded border transition-all duration-300 text-xs font-medium ${talla === size
                                                            ? "bg-white text-black border-white"
                                                            : "bg-white/5 border-white/20 text-zinc-300 hover:border-white/40 hover:text-white"
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                            {/* Size Guide Link */}
                                            <button
                                                onClick={() => setShowSizeGuide(true)}
                                                className="text-[11px] text-gold hover:text-gold-light underline mt-2 transition-colors inline-flex items-center gap-1"
                                            >
                                                📏 {(t.store as any).sizeGuide}
                                            </button>
                                        </div>

                                        {/* Quantity Selection */}
                                        <div>
                                            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-4">
                                                {t.store.quantity}
                                            </span>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center border border-white/20 rounded-lg bg-white/5 overflow-hidden">
                                                    <button
                                                        onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                                        className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <div className="w-12 text-center text-white font-medium">
                                                        {cantidad}
                                                    </div>
                                                    <button
                                                        onClick={() => setCantidad(cantidad + 1)}
                                                        className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Trust Info Section */}
                                        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {trustItems.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                                                    <span className="text-base grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">{item.icon}</span>
                                                    {item.isLegal ? (
                                                        <button onClick={() => setShowLegalModal(true)} className="leading-tight underline hover:text-white transition-colors text-left">
                                                            {item.text}
                                                        </button>
                                                    ) : (
                                                        <span className="leading-tight">{item.text}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Payment Methods Icons */}
                                        <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
                                            {/* Visa */}
                                            <svg className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="48" height="32" rx="4" fill="#1A1F71" />
                                                <path d="M20.3 21.5h-2.8l1.8-10.9h2.8L20.3 21.5zM16.1 10.6l-2.7 7.5-0.3-1.5-1-5.1s-0.1-0.9-1.2-0.9H7.1l-0.1 0.3s1.3 0.3 2.8 1.1l2.3 8.5h2.9l4.4-9.9H16.1zM36.3 21.5h2.6l-2.2-10.9h-2.2c-0.9 0-1.2 0.5-1.2 0.5l-4.1 10.4h2.9l0.6-1.6h3.5L36.3 21.5zM33.5 17.5l1.5-4 0.8 4H33.5zM29.2 13.2l0.4-2.3c0 0-0.9-0.3-1.8-0.3c-1 0-3.4 0.4-3.4 2.5 0 2 2.7 2 2.7 3s-2.4 0.8-3.2 0.2l-0.4 2.3s0.9 0.4 2.3 0.4c1.4 0 3.5-0.7 3.5-2.6 0-2-2.7-2.2-2.7-3.1C26.6 13 28.4 13 29.2 13.2z" fill="white" />
                                            </svg>
                                            {/* Mastercard */}
                                            <svg className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="48" height="32" rx="4" fill="#252525" />
                                                <circle cx="19" cy="16" r="8" fill="#EB001B" />
                                                <circle cx="29" cy="16" r="8" fill="#F79E1B" />
                                                <path d="M24 10.3a8 8 0 0 1 0 11.4 8 8 0 0 1 0-11.4z" fill="#FF5F00" />
                                            </svg>
                                            {/* PayPal */}
                                            <svg className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="48" height="32" rx="4" fill="#003087" />
                                                <text x="8" y="20" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif">Pay</text>
                                                <text x="24" y="20" fill="#009CDE" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif">Pal</text>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 border border-white/10 rounded-xl overflow-hidden bg-white/5">
                                    <button
                                        onClick={() => setIsShippingOpen(!isShippingOpen)}
                                        className="w-full flex items-center justify-between p-4 bg-zinc-900/50 hover:bg-zinc-800/80 transition-colors"
                                    >
                                        <span className="text-white font-medium flex items-center gap-2">
                                            <span className="text-gold">📦</span> {(t.store as any).shippingForm.title}
                                        </span>
                                        <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isShippingOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isShippingOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 pt-1 pb-6 space-y-6 border-t border-white/5 bg-zinc-900/30">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
                                                        {renderInput('firstName', (t.store as any).shippingForm.firstName)}
                                                        {renderInput('lastName', (t.store as any).shippingForm.lastName)}
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                        {renderInput('email', (t.store as any).shippingForm.email, 'email')}
                                                        <div className="flex flex-col gap-1 w-full relative group">
                                                            <label className="text-[10px] uppercase font-bold text-zinc-400 pl-1 tracking-wider">{(t.store as any).shippingForm.phone}</label>
                                                            <input
                                                                type="tel"
                                                                value={telefono}
                                                                onChange={(e) => {
                                                                    setTelefono(e.target.value);
                                                                    if (formErrors.telefono) setFormErrors(prev => ({ ...prev, telefono: '' }));
                                                                }}
                                                                className={`w-full bg-white/5 border ${formErrors.telefono ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]'} rounded-lg px-4 py-3 text-white text-sm transition-all focus:outline-none focus:ring-1 ${formErrors.telefono ? 'focus:ring-red-500/50' : 'focus:ring-gold/50'} placeholder:text-zinc-600 backdrop-blur-sm group-hover:bg-white/10`}
                                                            />
                                                            <AnimatePresence>
                                                                {formErrors.telefono && (
                                                                    <motion.span
                                                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                                                        className="text-red-400 text-[10px] pl-1 absolute -bottom-4"
                                                                    >
                                                                        {formErrors.telefono}
                                                                    </motion.span>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-5">
                                                        <div className="flex flex-col gap-1 w-full relative group">
                                                            <label className="text-[10px] uppercase font-bold text-zinc-400 pl-1 tracking-wider">D.N.I (Obligatorio)</label>
                                                            <input
                                                                type="text"
                                                                value={dni}
                                                                placeholder="Ej: 12345678X"
                                                                onChange={(e) => {
                                                                    setDni(e.target.value);
                                                                    if (formErrors.dni) setFormErrors(prev => ({ ...prev, dni: '' }));
                                                                }}
                                                                className={`w-full bg-white/5 border ${formErrors.dni ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]'} rounded-lg px-4 py-3 text-white text-sm transition-all focus:outline-none focus:ring-1 ${formErrors.dni ? 'focus:ring-red-500/50' : 'focus:ring-gold/50'} placeholder:text-zinc-600 backdrop-blur-sm group-hover:bg-white/10`}
                                                            />
                                                            <AnimatePresence>
                                                                {formErrors.dni && (
                                                                    <motion.span
                                                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                                                        className="text-red-400 text-[10px] pl-1 absolute -bottom-4"
                                                                    >
                                                                        {formErrors.dni}
                                                                    </motion.span>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-5">
                                                        {renderInput('address', (t.store as any).shippingForm.address)}
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                        {renderInput('city', (t.store as any).shippingForm.city)}
                                                        {renderInput('zip', (t.store as any).shippingForm.zip)}
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                        {renderInput('province', (t.store as any).shippingForm.province)}
                                                        <div className="flex flex-col gap-1 w-full relative group">
                                                            <label className="text-[10px] uppercase font-bold text-zinc-400 pl-1 tracking-wider">{(t.store as any).shippingForm.country}</label>
                                                            <input
                                                                type="text"
                                                                name="country"
                                                                value={shippingDetails.country}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    setShippingDetails(prev => ({ ...prev, country: val }));
                                                                }}
                                                                className="w-full bg-white/5 border border-white/10 focus:border-gold/50 rounded-lg px-4 py-3 text-white text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold/50 placeholder:text-zinc-600 backdrop-blur-sm group-hover:bg-white/10"
                                                            />
                                                            <AnimatePresence>
                                                                {shippingDetails.country.trim().toLowerCase() !== 'españa' && shippingDetails.country.trim() !== '' && (
                                                                    <motion.p
                                                                        initial={{ opacity: 0, y: -5 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        exit={{ opacity: 0, y: -5 }}
                                                                        className="text-amber-400 text-[10px] mt-1 pl-1 leading-snug"
                                                                    >
                                                                        ⚠️ {(t.store as any).shippingForm.countryWarning.split('ranndoneur26@gmail.com')[0]}
                                                                        <a href="mailto:ranndoneur26@gmail.com" className="font-bold underline hover:text-white transition-colors">ranndoneur26@gmail.com</a>
                                                                    </motion.p>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="flex flex-col gap-3 mt-10 md:mt-6 border-t border-white/10 pt-8 md:pt-4">
                                    <p className="text-sm text-center text-zinc-300 mb-1 font-medium select-none">Comprar ahora la camiseta 40 aniversario de La Musgaña.</p>

                                    {/* STRIPE PAYMENT LINK */}
                                    <button
                                        onClick={handleCheckout}
                                        disabled={isLoading}
                                        className="w-full py-4 px-6 bg-gold hover:bg-gold-light disabled:bg-zinc-700 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                                    >
                                        <ShoppingCart className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'group-hover:scale-110'} transition-transform`} />
                                        <span className="uppercase tracking-wider">
                                            {isLoading ? 'Procesando...' : t.store.buy}
                                        </span>
                                    </button>

                                    <div className="text-[10.5px] text-zinc-400 text-center mt-3 space-y-1.5 max-w-sm mx-auto">
                                        <p className="flex items-center justify-center gap-1.5"><span className="text-green-500 text-sm">🔒</span> Pago 100% seguro a través de Stripe.</p>
                                        <p className="flex items-center justify-center gap-1.5"><span className="text-gold text-sm">✨</span> Producción responsable bajo demanda.</p>
                                        <p className="flex items-center justify-center gap-1.5"><span className="text-sm">🙌</span> Todos los ingresos ayudan a mantener esta web.</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>

                {/* SEO & Extended Content Section */}
                {lang === 'es' && (
                    <div className="w-full max-w-2xl md:max-w-4xl mx-auto mt-20 space-y-12 text-zinc-300 px-4 md:px-0">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Descripción del producto</h2>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <p>Celebra con nosotros cuatro décadas de música con la <strong>camiseta oficial La Musgaña</strong>. Diseñada exclusivamente para conmemorar este hito histórico de la banda y presentarla en el concierto en directo en el Gran Teatro Pavón, esta <strong>camiseta 40 aniversario La Musgaña</strong> es una pieza indispensable y única de merchandising de folk ibérico contemporáneo.</p>
                                <p>Fabricada minuciosamente bajo demanda para promover una producción responsable e individualizada, esta <strong>camiseta verde botella 100% algodón</strong> es con <strong>patronaje para hombre y mujer</strong> perfecta para cualquier seguidor/a del grupo. Al obtenerla no solo llevas contigo un recuerdo fantástico, sino que nos apoyas directamente: todos los beneficios obtenidos van destinados a mantener activa la web lamusgaña.net</p>
                            </div>

                            <div className="mt-8 grid md:grid-cols-2 gap-8 bg-black/20 p-6 rounded-xl border border-white/5">
                                <div>
                                    <h3 className="text-base font-semibold text-gold mb-3 flex items-center gap-2"><span className="text-lg">🧵</span> Características técnicas</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400 marker:text-gold/50">
                                        <li>Camiseta preencogida de alta definición.</li>
                                        <li>Cinta tapacosturas de hombro a hombro para máxima resistencia.</li>
                                        <li>Gramaje grueso que aporta más durabilidad y sensación premium sin perder transpirabilidad.</li>
                                        <li>Corte regular fit clásico, apto para todas las constituciones.</li>
                                        <li>Impresión integral de alta calidad con tintas perdurables.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gold mb-3 flex items-center gap-2"><span className="text-lg">🧼</span> Composición y cuidados</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400 marker:text-gold/50">
                                        <li>Tejido suave <strong>100% algodón hilado en anillos</strong>.</li>
                                        <li>Se recomienda lavar a máquina en frío, del revés, y con tonos similares.</li>
                                        <li>No usar ningún tipo de lejía ni suavizantes agresivos.</li>
                                        <li>Secado ideal al aire libre (o a muy baja temperatura).</li>
                                        <li>Jamás planchar directamente sobre el arte impreso frontal.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="bg-black/20 p-6 md:p-8 rounded-xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Tallas y guía de medidas</h2>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <p>Nuestra prenda emplea un tallaje estándar y dispone de medidas amplias para asegurar el ajuste que estás buscando. Te recomendamos siempre recurrir a nuestra guía de medidas detallada (haz clic en &quot;Guía de tallas&quot; en la sección de compra justo arriba) para comprobar la equivalencia aproximada en centímetros y pulgadas antes de proceder a encargar tu camiseta oficial.</p>
                            </div>
                        </section>

                        <section className="bg-gradient-to-br from-zinc-900/50 to-black p-6 md:p-8 rounded-xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Envíos y devoluciones</h2>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <p>Ofrecemos total transparencia logística para que puedas disfrutar con máxima protección y seguridad de nuestro merchandising. Ten en cuenta lo siguiente antes de finalizar tu encargo:</p>
                                <ul className="list-disc pl-5 space-y-3 mt-4 text-zinc-400 marker:text-gold/50">
                                    <li><strong>Zonas de envío:</strong> En la actualidad enviamos de forma estándar y económica a toda la Península, así como a las Islas Baleares. Debido a normativas aduaneras extra, envíos dirigidos a Ceuta, Melilla e Islas Canarias requieren tiempos de manipulación concretos y pueden incurrir en retenciones en origen. Consúltanos para estos casos.</li>
                                    <li><strong>Tiempos de producción y entrega:</strong> Funcionar "Bajo Demanda" (Print-on-Demand) significa que tu camiseta todavía no ha sido fabricada. Se encarga y estampa bajo demanda solo para ti cuando validas la compra. Este método sustentable requiere de 3 a 5 días para su producción, a los cuales hay que sumar el tránsito logístico local, dejando el tiempo final de entrega ponderado <strong>entre 7 y 14 días laborables</strong> en total.</li>
                                    <li><strong>Política estricta de cambios:</strong> Si detectas defectos flagrantes en la textura o una equivocación directa en el producto recibido frente a lo comprado, notifícanoslo máximo a los 14 días tras la obtención. Aún así, insistimos rotundamente a todos los fans: la producción individual restringe las opciones de re-stock por simple cambio de opinión de talla. ¡Mide bien antes y contáctanos ante cualquier duda!</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                )}

                {/* Illustration Modal */}
                <AnimatePresence>
                    {showIllustration && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowIllustration(false)}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative max-w-2xl w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setShowIllustration(false)}
                                    className="absolute -top-3 -right-3 z-10 bg-zinc-800 border border-white/10 rounded-full w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors shadow-lg"
                                    aria-label="Cerrar"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="relative group select-none">
                                    <Image
                                        src="/images/shop/ilustra_40aniversario.png"
                                        alt="Ilustración 40 aniversario"
                                        width={1000}
                                        height={1000}
                                        quality={90}
                                        onContextMenu={(e) => e.preventDefault()}
                                        onDragStart={(e) => e.preventDefault()}
                                        className="rounded-xl border border-white/10 shadow-2xl w-full h-auto select-none pointer-events-none"
                                    />
                                    {/* Overlay to block right-click "Save Image As" */}
                                    <div
                                        className="absolute inset-0 z-10"
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Size Guide Modal */}
                <AnimatePresence>
                    {showSizeGuide && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowSizeGuide(false)}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative max-w-2xl w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setShowSizeGuide(false)}
                                    className="absolute -top-3 -right-3 z-10 bg-zinc-800 border border-white/10 rounded-full w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors shadow-lg"
                                    aria-label="Cerrar"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <Image
                                    src={genero === 'male' ? "/images/shop/tallas_hombres.png" : "/images/shop/Guia de tallas.png"}
                                    alt={(t.store as any).sizeGuide}
                                    width={800}
                                    height={600}
                                    className="rounded-xl border border-white/10 shadow-2xl w-full h-auto"
                                />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Legal Modal */}
                <AnimatePresence>
                    {showLegalModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-zinc-900 border border-white/10 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 shadow-2xl"
                            >
                                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                    <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)]">
                                        {t.store.legalModal.title}
                                    </h3>
                                    <button
                                        onClick={() => setShowLegalModal(false)}
                                        className="text-zinc-400 hover:text-white transition-colors p-2"
                                        aria-label="Cerrar modal"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
                                    <p>{t.store.legalModal.content}</p>

                                    <div>
                                        <h4 className="text-gold font-semibold mb-2">{t.store.legalModal.subtitle2}</h4>
                                        <p>{t.store.legalModal.content2}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-gold font-semibold mb-2">{t.store.legalModal.subtitle3}</h4>
                                        <p>{t.store.legalModal.content3}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-gold font-semibold mb-2">{t.store.legalModal.subtitle4}</h4>
                                        <p>{t.store.legalModal.content4}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
