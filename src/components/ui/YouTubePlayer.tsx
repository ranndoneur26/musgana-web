"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon, PauseIcon, StopIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

interface YouTubePlayerProps {
    videoId: string;
    className?: string;
}

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

export function YouTubePlayer({ videoId, className }: YouTubePlayerProps) {
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);

    // We use a ref to hold the player instance purely for API calls
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load YouTube API if not already loaded
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            // Check if script is already in DOM to avoid duplicates
            if (!document.querySelector(`script[src="${tag.src}"]`)) {
                const firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            }

            // Setup global callback
            window.onYouTubeIframeAPIReady = () => {
                initializePlayer();
            };
        } else {
            initializePlayer();
        }

        return () => {
            // Cleanup if needed? Usually better to keep the player or destroy it on unmount
            if (playerRef.current && playerRef.current.destroy) {
                try {
                    playerRef.current.destroy();
                } catch (e) {
                    console.error("Error destroying player", e);
                }
            }
        };
    }, [videoId]);

    const initializePlayer = () => {
        if (playerRef.current) return; // Already initialized

        // Wait a tick to ensure container is ready
        setTimeout(() => {
            if (!window.YT || !containerRef.current) return;

            playerRef.current = new window.YT.Player(containerRef.current.id, {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    controls: 0, // Hide native controls
                    rel: 0,
                    modestbranding: 1,
                    showinfo: 0,
                    iv_load_policy: 3,
                    fs: 0,
                    disablekb: 1
                },
                events: {
                    onReady: (event: any) => {
                        setIsReady(true);
                        event.target.setVolume(volume);
                    },
                    onStateChange: (event: any) => {
                        // YT.PlayerState.PLAYING = 1, PAUSED = 2
                        if (event.data === 1) setIsPlaying(true);
                        if (event.data === 2) setIsPlaying(false);
                        if (event.data === 0) setIsPlaying(false); // Ended
                    }
                }
            });
        }, 100);
    };

    const togglePlay = () => {
        if (!playerRef.current || !isReady) return;
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const stopVideo = () => {
        if (!playerRef.current || !isReady) return;
        playerRef.current.stopVideo();
        setIsPlaying(false);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = parseInt(e.target.value);
        setVolume(newVol);
        if (playerRef.current && isReady) {
            playerRef.current.setVolume(newVol);
            if (newVol > 0 && isMuted) {
                playerRef.current.unMute();
                setIsMuted(false);
            }
        }
    };

    const toggleMute = () => {
        if (!playerRef.current || !isReady) return;
        if (isMuted) {
            playerRef.current.unMute();
            playerRef.current.setVolume(volume); // Restore previous volume
            setIsMuted(false);
        } else {
            playerRef.current.mute();
            setIsMuted(true);
        }
    };

    return (
        <div className={cn("relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-black border border-white/10 group", className)}>

            {/* Aspect Ratio Container */}
            <div className="relative w-full pb-[56.25%] bg-black">
                <div
                    id={`youtube-player-${videoId}`}
                    ref={containerRef}
                    className="absolute top-0 left-0 w-full h-full"
                />
            </div>

            {/* Overlay Play Button (Big) - Only visible when paused/stopped */}
            {!isPlaying && (
                <div
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer z-10 transition-all duration-300 hover:bg-black/30"
                >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold bg-gold/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-gold transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                        <PlayIcon className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" />
                    </div>
                </div>
            )}

            {/* Custom Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/10 p-4 z-20 flex items-center justify-between transition-transform duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">

                <div className="flex items-center gap-4">
                    <button
                        onClick={togglePlay}
                        className="text-white hover:text-gold transition-colors transform hover:scale-110 active:scale-95"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <PauseIcon className="w-8 h-8" />
                        ) : (
                            <PlayIcon className="w-8 h-8" />
                        )}
                    </button>

                    <button
                        onClick={stopVideo}
                        className="text-zinc-400 hover:text-red-500 transition-colors transform hover:scale-110 active:scale-95"
                        aria-label="Stop"
                    >
                        <StopIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={toggleMute} className="text-zinc-400 hover:text-white transition-colors">
                        {isMuted || volume === 0 ? (
                            <SpeakerXMarkIcon className="w-5 h-5" />
                        ) : (
                            <SpeakerWaveIcon className="w-5 h-5" />
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-gold hover:accent-gold/80"
                    />
                </div>
            </div>

            {/* Status Indicator (Optional) */}
            <div className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase text-white/50 bg-black/50 px-2 py-1 rounded border border-white/5">
                {isPlaying ? "Reproduciendo" : isReady ? "Listo" : "Cargando..."}
            </div>
        </div>
    );
}
