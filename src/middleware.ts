import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Security Headers
    const headers = response.headers;

    // HSTS (HTTP Strict Transport Security)
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

    // X-Frame-Options: Prevent clickjacking
    headers.set('X-Frame-Options', 'DENY');

    // X-Content-Type-Options: Prevent MIME type sniffing
    headers.set('X-Content-Type-Options', 'nosniff');

    // Referrer-Policy: Control referrer information
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions-Policy: Restrict browser features
    headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), payment=()'
    );

    // Content-Security-Policy (Basic)
    // Note: A strict CSP often requires careful tuning for Next.js (scripts, styles, images).
    // We start with a policy that allows self and typical assets, but blocks object/base-uri.
    headers.set(
        'Content-Security-Policy',
        "default-src 'self'; img-src 'self' data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
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
