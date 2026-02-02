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
    // In a real app, this would perform actual checks
    // For now, we'll simulate the checks based on the AUDIT_REPORT.md

    const categories: AuditCategory[] = [
        {
            name: 'Seguridad y Privacidad',
            score: 85, // Increased because we are adding headers
            status: 'warning',
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
                    status: 'failed',
                    description: 'No se detecta sistema de gestión de sesiones con timeout.',
                    recommendation: 'Implementar NextAuth.js o middleware de sesión.',
                },
                {
                    id: 'audit-logs',
                    name: 'Logs de Auditoría',
                    status: 'warning',
                    description: 'Registros parciales activos.',
                    recommendation: 'Implementar tabla de logs centralizada.',
                }
            ]
        },
        {
            name: 'Funcionalidad y Navegación',
            score: 75,
            status: 'warning',
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
                    status: 'warning',
                    description: 'Validación del lado del cliente activa, falta validación robusta en servidor.',
                    recommendation: 'Añadir validación Zod en API routes.',
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
            score: 60,
            status: 'warning',
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
                    status: 'warning',
                    description: 'Faltan skip-links y focus-trap en algunos modales.',
                    recommendation: 'Añadir componente SkipToContent.',
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
