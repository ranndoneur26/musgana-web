"use client";

import Link from "next/link";
import { Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full py-8 mt-auto border-t border-white/10 bg-black backdrop-blur-sm">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Brand */}
                <div className="text-left">
                    <h3 className="text-2xl font-normal text-white font-[family-name:var(--font-great-vibes)]">La Musgaña</h3>
                    <p className="text-xs text-zinc-500 mt-1">
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                        Disseny{" "}
                        <a
                            href="https://www.marcxicola.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold hover:text-gold/80 transition-colors underline"
                        >
                            marcxicola.com
                        </a>
                    </p>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-6">
                    <Link href="https://www.youtube.com/results?search_query=la+musgaña" target="_blank" className="text-zinc-400 hover:text-gold transition-colors flex items-center gap-2">
                        <Youtube size={24} />
                        <span className="text-sm font-medium tracking-widest uppercase">YouTube</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
