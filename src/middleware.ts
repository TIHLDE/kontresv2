import { checkUserAuth, getUserData } from '@/utils/apis/user';

import { ACCESS_TOKEN } from '../constants';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const isAuthenticated = await checkUserAuth();
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /login
     */
    matcher:
        '/((?!api|login|_next/static|_next/image|_next|.*\\..*|favicon.ico).*)',
};
