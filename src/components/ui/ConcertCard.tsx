import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, MapPin } from "lucide-react";

interface ConcertCardProps {
    date: string;
    title: string;
    location: string;
    description?: string;
}

export function ConcertCard({ date, title, location, description }: ConcertCardProps) {
    const eventDate = new Date(date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleDateString("es-ES", { month: "short" }).toUpperCase();
    const weekday = eventDate.toLocaleDateString("es-ES", { weekday: "long" });
    const time = eventDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

    return (
        <GlassCard className="flex flex-col md:flex-row items-center gap-6 p-6 group hover:bg-white/10 transition-colors w-full">
            {/* Date Badge */}
            <div className="flex flex-col items-center justify-center bg-gold/10 border border-gold/30 rounded-xl p-3 w-20 h-20 md:w-24 md:h-24 shrink-0 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                <span className="text-2xl md:text-3xl font-bold text-gold">{day}</span>
                <span className="text-xs md:text-sm font-medium text-gold/80 tracking-wider">{month}</span>
            </div>

            {/* Event Details */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-grow space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-gold transition-colors font-[family-name:var(--font-playfair)]">
                    {title}
                </h3>

                <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-zinc-300 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold/60" />
                        <span className="capitalize">{weekday} • {time}</span>
                    </div>
                    {location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gold/60" />
                            <span>{location}</span>
                        </div>
                    )}
                </div>

                {description && (
                    <p className="text-zinc-400 text-sm line-clamp-2 max-w-2xl">
                        {description}
                    </p>
                )}
            </div>

            {/* Action (Optional - creates balance) */}
            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0 hidden md:block">
                {/* Arrow or icon could go here */}
            </div>
        </GlassCard>
    );
}
