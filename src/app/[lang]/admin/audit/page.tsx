"use client";

import { useEffect, useState } from "react";
import {
    ShieldCheck,
    Settings,
    Zap,
    Accessibility,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    LayoutDashboard,
    RefreshCcw,
    History
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { getAuditData, AuditCategory } from "@/lib/audit-service";

export default function AuditDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        async function fetchData() {
            const auditData = await getAuditData();
            setData(auditData);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading || !mounted || !data) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin text-gold">
                    <Zap size={48} />
                </div>
            </div>
        );
    }

    const categoryIcons: Record<string, any> = {
        'Seguridad y Privacidad': ShieldCheck,
        'Funcionalidad y Navegación': Settings,
        'Rendimiento (Web Vitals)': Zap,
        'Accesibilidad (WCAG 2.1)': Accessibility,
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-16">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-white mb-2">
                            Dashboard de Auditoría
                        </h1>
                        <p className="text-zinc-400 flex items-center gap-2">
                            <History size={16} /> Última revisión: {new Date(data.lastAudit).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <GlassCard className="px-6 py-3 flex items-center gap-4 border-gold/20">
                            <span className="text-sm uppercase tracking-widest text-zinc-400">Score Global</span>
                            <span className={`text-4xl font-bold ${data.globalScore >= 90 ? 'text-green-500' : data.globalScore >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                                {data.globalScore}%
                            </span>
                        </GlassCard>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {data.categories.map((cat: AuditCategory) => {
                        const Icon = categoryIcons[cat.name] || LayoutDashboard;
                        return (
                            <GlassCard key={cat.name} className="p-6 border-white/5 hover:border-gold/30 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-gold/10 transition-colors text-gold">
                                        <Icon size={24} />
                                    </div>
                                    <span className={`text-2xl font-bold ${cat.score >= 90 ? 'text-green-500' : cat.score >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                                        {cat.score}%
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold mb-1">{cat.name}</h3>
                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${cat.score >= 90 ? 'bg-green-500' : cat.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                        style={{ width: `${cat.score}%` }}
                                    />
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>

                {/* Detailed Items */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {data.categories.map((cat: AuditCategory) => (
                        <GlassCard key={cat.name} className="p-8 border-white/5">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                {cat.name}
                            </h2>
                            <div className="space-y-6">
                                {cat.items.map((item: any) => (
                                    <div key={item.id} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold text-lg flex items-center gap-2">
                                                {item.status === 'passed' && <CheckCircle2 className="text-green-500" size={18} />}
                                                {item.status === 'warning' && <AlertTriangle className="text-yellow-500" size={18} />}
                                                {item.status === 'failed' && <XCircle className="text-red-500" size={18} />}
                                                {item.name}
                                            </h4>
                                            <span className={`text-xs uppercase tracking-wider px-2 py-1 rounded ${item.status === 'passed' ? 'bg-green-500/10 text-green-500' :
                                                item.status === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-red-500/10 text-red-500'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 text-sm mb-2">{item.description}</p>
                                        {item.recommendation && (
                                            <div className="bg-gold/5 border border-gold/10 p-3 rounded-lg text-xs text-gold/80 italic">
                                                <strong>Recomendación:</strong> {item.recommendation}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Deploy Blocker Notice */}
                {data.categories.find((c: any) => c.name === 'Seguridad y Privacidad')?.score < 100 && (
                    <div className="mt-12 p-6 bg-red-900/20 border border-red-500/30 rounded-2xl flex items-center gap-6">
                        <div className="p-4 bg-red-500/20 rounded-full text-red-500">
                            <AlertTriangle size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-500 mb-1">Despliegue bloqueado</h3>
                            <p className="text-red-200/60">
                                La política de seguridad de Antigravity requiere un cumplimiento del 100% en el pilar de Seguridad y Privacidad antes de permitir el despliegue a producción.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
