/**
 * Next.js 16 proxy (formerly `middleware.ts`).
 * Handles locale routing without Accept-Language / cookie redirects (see routing.ts).
 */
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Root and all localized pathnames
    '/',
    '/(es|en)/:path*',
    // Exclude API routes, Next.js internals, Vercel internals, and static files
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};
