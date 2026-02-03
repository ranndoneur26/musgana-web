# Plan de Implementación: Reproductor YouTube Personalizado

## Objetivo
Crear un reproductor de video moderno, responsive y accesible utilizando la YouTube Iframe Player API, integrado tanto como un artefacto independiente (`reproductor-youtube.html`) y dentro de la sección "Videos" de la aplicación Next.js.

## Pasos

1.  **Prototipado (Vanilla JS/HTML)**
    *   Crear `reproductor-youtube.html`.
    *   Implementar estructura HTML con contenedor responsive (aspect-ratio 16:9).
    *   Implementar estilos CSS modernos (Glassmorphism, gradientes, controles personalizados).
    *   Implementar lógica JS para conectar con YouTube Iframe API.
    *   Funcionalidades: Play, Pause, Stop, Control de Volumen, Barra de Progreso (opcional pero deseable para "moderno").
    *   Video objetivo: `RV8l4BWSDrk`.

2.  **Verificación**
    *   Usar un agente de navegador para abrir el archivo local.
    *   Verificar carga del video.
    *   Interactuar con los controles (Play, Pause).
    *   Capturar evidencia (screenshot/video).

3.  **Integración en Next.js (`VideosSection.tsx`)**
    *   Portar la lógica a React.
    *   Crear un componente `YouTubePlayer.tsx` (o integrarlo en la sección).
    *   Asegurar que se ajuste al sistema de diseño actual (fuentes Montserrat/Playfair, colores dorados).
    *   Reemplazar el contenido actual de `VideosSection` con este nuevo reproductor destacado.

## Lista de Tareas
- [x] Crear `reproductor-youtube.html`
- [x] Verificar funcionamiento con agente (Agente ejecutado: `verify_youtube_player`)
- [x] Crear componente React en `src/components/ui/YouTubePlayer.tsx`
- [x] Actualizar `src/components/sections/VideosSection.tsx`
- [ ] Desplegar cambios (Pendiente de `git push`)
