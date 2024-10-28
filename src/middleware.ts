import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export const middleware = auth((req) => {
    if (!req.auth) {
        const url = new URL('/login', req.nextUrl.origin);
        url.searchParams.set('redirect', req.nextUrl.pathname);

        return NextResponse.redirect(url);
    }

    if (
        req.auth.user.role !== 'ADMIN' &&
        req.nextUrl.pathname.startsWith('/admin')
    )
        return NextResponse.redirect(new URL('/', req.nextUrl.origin));

    return;
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - trpc (tRPC routes)
         * - login (login page)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - $ (root path)
         */
        '/((?!api|trpc|login|_next/static|_next/image|favicon.ico|$).*)',
    ],
};
