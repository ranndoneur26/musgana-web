"use client";

import { useState, useRef, useEffect } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [showVolume, setShowVolume] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((err) => {
                console.log("Autoplay blocked or audio file missing:", err);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div
            className="fixed bottom-8 left-8 z-[60] flex items-center gap-3"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
        >
            <audio
                ref={audioRef}
                src="/audio/background.mp3"
                loop
                preload="auto"
            />

            <motion.div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-xl">
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="group relative flex items-center justify-center w-10 h-10 rounded-full text-white transition-all shadow-xl"
                    title={isPlaying ? "Pausar música" : "Reproducir música"}
                >
                    {/* Music Bars Animation when playing */}
                    <AnimatePresence>
                        {isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center gap-[2px]">
                                {[1, 2, 3, 4].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 4 }}
                                        animate={{
                                            height: [4, 16, 8, 14, 4],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            delay: i * 0.15,
                                            ease: "easeInOut"
                                        }}
                                        className="w-[1.5px] bg-gold/60 rounded-full"
                                    />
                                ))}
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Speaker Icon */}
                    <div className={isPlaying ? "opacity-20 transition-opacity" : "opacity-100"}>
                        {isPlaying ? (
                            <SpeakerWaveIcon className="w-5 h-5 text-gold" />
                        ) : (
                            <SpeakerXMarkIcon className="w-5 h-5 text-zinc-500" />
                        )}
                    </div>
                </motion.button>

                {/* Volume Slider */}
                <AnimatePresence>
                    {showVolume && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 100, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="overflow-hidden flex items-center pr-3"
                        >
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Tooltip on hover (only if volume slider is hidden) */}
            {!showVolume && (
                <span className="absolute left-14 whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest border border-white/5">
                    {isPlaying ? "Música ON" : "Música OFF"}
                </span>
            )}
        </div>
    );
}
