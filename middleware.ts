import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const isLoggedIn = !!token;
    const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isApiRoute = req.nextUrl.pathname.startsWith("/api");

    // Allow all API routes for now (or protect specific ones inside the route handler)
    if (isApiRoute) {
        return NextResponse.next();
    }

    // Redirect logged-in users away from auth pages
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/", req.nextUrl));
        }
        return NextResponse.next();
    }

    // Protect Admin Routes
    if (isAdminRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`, req.nextUrl));
        }

        if (token?.role !== "ADMIN") {
            // Redirect non-admins to home
            return NextResponse.redirect(new URL("/", req.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
