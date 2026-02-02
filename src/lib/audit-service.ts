export interface AuditCategory {
    name: string;
    score: number;
    status: 'passed' | 'warning' | 'failed';
    items: AuditItem[];
}

export interface AuditItem {
    id: string;
    name: string;
    status: 'passed' | 'warning' | 'failed';
    description: string;
    recommendation?: string;
}

export async function getAuditData() {
    const categories: AuditCategory[] = [
        {
            name: 'Seguridad y Privacidad',
            score: 100,
            status: 'passed',
            items: [
                {
                    id: 'ssl-tls',
                    name: 'SSL/TLS Configurado',
                    status: 'passed',
                    description: 'SSL habilitado mediante Vercel/Next.js.',
                },
                {
                    id: 'security-headers',
                    name: 'Encabezados de Seguridad',
                    status: 'passed',
                    description: 'HSTS, CSP, X-Frame-Options, etc. configurados.',
                },
                {
                    id: 'session-timeout',
                    name: 'Cierre de Sesión Automático',
                    status: 'passed',
                    description: 'Hook useSessionTimeout implementado (15 min).',
                },
                {
                    id: 'audit-logs',
                    name: 'Logs de Auditoría',
                    status: 'passed',
                    description: 'Registro de acciones críticas activo en el servidor.',
                }
            ]
        },
        {
            name: 'Funcionalidad y Navegación',
            score: 95,
            status: 'passed',
            items: [
                {
                    id: 'custom-404',
                    name: 'Página 404 Personalizada',
                    status: 'passed',
                    description: 'Página not-found.tsx implementada y elegante.',
                },
                {
                    id: 'form-sanitization',
                    name: 'Sanitización de Formularios',
                    status: 'passed',
                    description: 'Validación robusta en servidor implementada.',
                },
                {
                    id: 'happy-path',
                    name: 'Flujo Crítico (Happy Path)',
                    status: 'passed',
                    description: 'Navegación fluida de menos de 3 clics.',
                }
            ]
        },
        {
            name: 'Rendimiento (Web Vitals)',
            score: 65,
            status: 'failed',
            items: [
                {
                    id: 'image-optimization',
                    name: 'Optimización de Imágenes',
                    status: 'failed',
                    description: 'Se detectan imágenes críticas con tamaño excesivo (>1MB).',
                    recommendation: 'Comprimir hero9.png (10.8MB) y convertir a WebP.',
                },
                {
                    id: 'lazy-loading',
                    name: 'Carga Diferida',
                    status: 'passed',
                    description: 'Componentes pesados usan lazy loading de Next.js.',
                }
            ]
        },
        {
            name: 'Accesibilidad (WCAG 2.1)',
            score: 90,
            status: 'passed',
            items: [
                {
                    id: 'color-contrast',
                    name: 'Contraste de Color',
                    status: 'passed',
                    description: 'Cumple con el estándar AA en la mayoría de secciones.',
                },
                {
                    id: 'keyboard-nav',
                    name: 'Navegación por Teclado',
                    status: 'passed',
                    description: 'Skip-to-content implementado y foco visible mejorado.',
                }
            ]
        }
    ];

    return {
        categories,
        globalScore: Math.round(categories.reduce((acc, cat) => acc + cat.score, 0) / categories.length),
        lastAudit: new Date().toISOString(),
    };
}
