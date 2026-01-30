import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });

        // Check environment variables (safely)
        const hasAuthSecret = !!process.env.AUTH_SECRET;
        const authSecretLength = process.env.AUTH_SECRET?.length || 0;
        const nextAuthUrl = process.env.NEXTAUTH_URL;

        // Get all cookie names
        const cookieNames = req.cookies.getAll().map(c => c.name);

        return NextResponse.json({
            status: "Debug Info",
            environment: {
                hasAuthSecret,
                authSecretLength,
                nextAuthUrl,
                nodeEnv: process.env.NODE_ENV,
            },
            request: {
                url: req.url,
                cookies: cookieNames,
                secureConnection: req.url.startsWith("https"),
            },
            token: token ? {
                // Return only safe fields
                sub: token.sub,
                email: token.email,
                role: token.role,
                iat: token.iat,
                exp: token.exp
            } : "No Token Found",
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
