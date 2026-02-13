#!/bin/bash

# Script de optimización de imágenes para La Musgaña Web
# Requiere macOS (usa 'sips')

IMG_DIR="public/images"

echo "🔍 Buscando imágenes pesadas en $IMG_DIR..."

# 1. Optimizar Hero images (PNG/JPG)
# Limitamos a 1920px de ancho y reducimos calidad
for img in $IMG_DIR/hero*.{png,jpg}; do
    if [ -f "$img" ]; then
        size=$(du -h "$img" | cut -f1)
        echo "⚡ Procesando $img ($size)..."
        # Convertir a JPEG para reducir tamaño drásticamente (las fotos de fondo no necesitan PNG)
        target="${img%.*}.jpg"
        sips -s format jpeg -s formatOptions 80 -Z 1920 "$img" --out "$target"
        
        # Si el original era PNG y el nuevo JPG es mucho más pequeño, podrías borrar el original
        # Para este script, solo informamos
        new_size=$(du -h "$target" | cut -f1)
        echo "✅ Optimizado: $target ($new_size)"
    fi
done

# 2. Nota especial para el SVG
echo "⚠️ El archivo 40-anniversari.svg contiene una imagen incrustada de 2.5MB."
echo "💡 Se recomienda abrirlo en Illustrator y exportarlo 'Para pantallas' con la opción 'Incluir imágenes' desactivada (enlazarlas en su lugar)."

echo "🚀 ¡Optimización básica completada!"
