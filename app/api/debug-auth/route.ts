import { getToken, decode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const secret = process.env.AUTH_SECRET;
        const legacySecret = process.env.NEXTAUTH_SECRET;

        // 1. Standard getToken call (what middleware does)
        const token = await getToken({ req, secret });

        // 2. Manual Decoding Attempts
        const cookieName5 = "__Secure-authjs.session-token";
        const cookieName4 = "__Secure-next-auth.session-token";

        const cookieValue5 = req.cookies.get(cookieName5)?.value;
        const cookieValue4 = req.cookies.get(cookieName4)?.value;

        async function tryDecode(token: string, secret: string | undefined, salt: string) {
            if (!secret) return "Skipped (No Secret)";
            try {
                // v5 decode takes { token, secret, salt }
                return await decode({ token, secret, salt });
            } catch (e: any) {
                return `Failed: ${e.message}`;
            }
        }

        const manualDecodes = {
            attempt1_authSecret_v5Cookie: cookieValue5 ? await tryDecode(cookieValue5, secret, cookieName5) : "Cookie Not Found",
            attempt2_authSecret_v4Cookie: cookieValue4 ? await tryDecode(cookieValue4, secret, cookieName4) : "Cookie Not Found",
            attempt3_nextAuthSecret_v5Cookie: cookieValue5 ? await tryDecode(cookieValue5, legacySecret, cookieName5) : "Cookie Not Found",
            attempt4_nextAuthSecret_v4Cookie: cookieValue4 ? await tryDecode(cookieValue4, legacySecret, cookieName4) : "Cookie Not Found",
        };

        return NextResponse.json({
            status: "Debug Info v2",
            env: {
                hasAuthSecret: !!secret,
                authSecretLen: secret?.length,
                hasNextAuthSecret: !!legacySecret,
                nextAuthSecretLen: legacySecret?.length,
                VERCEL_URL: process.env.VERCEL_URL,
                NEXTAUTH_URL: process.env.NEXTAUTH_URL,
                NODE_ENV: process.env.NODE_ENV,
            },
            cookies: {
                all: req.cookies.getAll().map(c => c.name),
                v5ValueFound: !!cookieValue5,
                v4ValueFound: !!cookieValue4,
            },
            getTokenResult: token,
            manualDecodes
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}
