import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Security Headers
    const headers = response.headers;

    // HSTS (HTTP Strict Transport Security)
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

    // X-Frame-Options: Prevent clickjacking
    // X-Frame-Options: Prevent clickjacking - Relaxed for iframes
    headers.set('X-Frame-Options', 'SAMEORIGIN');

    // X-Content-Type-Options: Prevent MIME type sniffing
    headers.set('X-Content-Type-Options', 'nosniff');

    // Referrer-Policy: Control referrer information
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions-Policy: Restrict browser features
    headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), payment=()'
    );

    // Content-Security-Policy
    // Updated to allow YouTube embeds
    headers.set(
        'Content-Security-Policy',
        "default-src 'self'; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://s.ytimg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://open.spotify.com https://calendar.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';"
    );

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
