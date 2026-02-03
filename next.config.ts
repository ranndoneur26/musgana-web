import type { NextConfig } from "next";

const securityHeaders = [
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "origin-when-cross-origin",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
    },
    {
        key: "Content-Security-Policy",
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.youtube.com https://s.ytimg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://open.spotify.com; connect-src 'self' https://www.google-analytics.com https://www.youtube.com;",
    },
];

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
