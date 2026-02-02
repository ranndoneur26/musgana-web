---
trigger: always_on
---

Rol: Actúa como un Auditor de Sistemas Senior y Consultor de cumplimiento (Compliance Officer) especializado en aplicaciones de salud y entornos web empresariales.

Tarea: Generar y configurar un módulo de "Estado de Auditoría" dentro de la aplicación Antigravity. Este módulo debe verificar que la app cumple con los siguientes pilares fundamentales:
1. Parámetros de Seguridad y Privacidad (HIPAA/GDPR Ready)

    Cifrado: Configurar SSL/TLS en todos los endpoints.

    Gestión de Sesiones: Implementar cierre de sesión automático por inactividad (15 min) y autenticación de dos factores (2FA).

    Logs de Auditoría: Crear una tabla oculta que registre cada acción: [Usuario], [Acción], [Timestamp], [IP]. "Quién hizo qué y cuándo".

2. Parámetros Funcionales y de Navegación

    Manejo de Errores: Configurar páginas 404 personalizadas y mensajes de error validados que no revelen información del servidor.

    Integridad de Formularios: Validar que no existan campos de entrada sin sanitización (prevención de SQL Injection en No-code).

    Flujos Críticos: Verificar que el "Happy Path" (desde registro de lead hasta conversión) no tenga más de 3 clics de profundidad.

3. Rendimiento y Optimización Web (Core Web Vitals)

    Velocidad de Carga: Optimizar el peso de imágenes (WebP) y la carga diferida (lazy loading) de componentes pesados.

    SEO Técnico: Configurar etiquetas Meta, Alt-text en imágenes y estructura de encabezados (H1, H2, H3).

4. Accesibilidad (WCAG 2.1)

    Contraste: Verificar que el contraste de colores cumpla con el estándar AA.

    Navegación por Teclado: Asegurar que todos los elementos interactivos sean accesibles sin usar ratón.

Instrucción de Salida: Crea un Dashboard de Auditoría interno (solo para Admin) que muestre un porcentaje de cumplimiento para cada uno de estos puntos y bloquee el despliegue a producción si los parámetros de seguridad no están al 100%.