"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Album {
    id: string;
    title: string;
    year: string;
    image: string;
    songs: string[];
    members: string[];
    buyLink?: string;
    spotifyLink?: string;
    streamingLink?: string;
    description: {
        es: string;
        en: string;
    };
}

interface AlbumModalProps {
    album: Album | null;
    isOpen: boolean;
    onClose: () => void;
}

export function AlbumModal({ album, isOpen, onClose }: AlbumModalProps) {
    const { lang, t } = useTranslation();

    // Close on ESC key
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!album) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-900 border border-white/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-white/10 p-6 flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2">{album.title}</h2>
                                    <p className="text-gold font-mono">{album.year}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label={t.discography.close}
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 grid md:grid-cols-2 gap-8">
                                {/* Left Column - Image */}
                                <div>
                                    <div className="aspect-square rounded-lg overflow-hidden border border-white/10 max-w-[500px] max-h-[500px] mx-auto">
                                        <img
                                            src={album.image}
                                            alt={album.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Links */}
                                    <div className="mt-6 space-y-3">
                                        {album.spotifyLink && (
                                            <a
                                                href={album.spotifyLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full py-3 px-4 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-semibold text-center transition-colors"
                                            >
                                                {t.discography.listenSpotify}
                                            </a>
                                        )}
                                        {!album.spotifyLink && album.streamingLink && (
                                            <a
                                                href={album.streamingLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-center transition-colors"
                                            >
                                                {t.discography.listenOnline}
                                            </a>
                                        )}
                                        {album.buyLink && (
                                            <a
                                                href={album.buyLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full py-3 px-4 border border-gold/50 text-gold hover:bg-gold hover:text-black rounded-lg font-semibold text-center transition-all"
                                            >
                                                {album.buyLink.includes('discogs') ? t.discography.viewDiscogs : t.discography.buyAlbum}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column - Info */}
                                <div className="space-y-6">
                                    {/* Description */}
                                    {album.description && (
                                        <div>
                                            <p className="text-zinc-400 leading-relaxed">{album.description[lang as "es" | "en"]}</p>
                                        </div>
                                    )}

                                    {/* Songs */}
                                    {album.songs && album.songs.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-4">{t.discography.songs}</h3>
                                            <ol className="space-y-2">
                                                {album.songs.map((song, index) => (
                                                    <li key={index} className="text-zinc-400 flex items-start">
                                                        <span className="text-gold font-mono text-sm mr-3 min-w-[2rem]">
                                                            {String(index + 1).padStart(2, '0')}.
                                                        </span>
                                                        <span>{song}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )}

                                    {/* Members */}
                                    {album.members && album.members.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-4">{t.discography.members}</h3>
                                            <ul className="space-y-2">
                                                {album.members.map((member, index) => (
                                                    <li key={index} className="text-zinc-400 flex items-start">
                                                        <span className="text-gold mr-2">•</span>
                                                        <span>{member}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
