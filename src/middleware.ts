import { getUserData } from "@/utils/apis/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "../constants";

export async function middleware(req: NextRequest) {
    const isAuthenticated = await checkUserAuth();
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
const checkUserAuth = async () => {
    // Check if user is authenticated
    const userId = cookies().get("user_id")?.value;
    const token = cookies().get(ACCESS_TOKEN)?.value;
    if (!userId || !token) return false;
    let userData;
    try {
        userData = await getUserData(userId ?? '');
    } catch (error) {
        return false;
    }

    return Boolean(userData?.first_name);
}

export const config = {
    matcher:     /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico (favicon file)
    * - /login
    */
        '/((?!api|login|_next/static|_next/image|_next|.*\\..*|favicon.ico).*)',
}