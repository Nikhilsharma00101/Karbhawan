import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OTP from "@/models/OTP";
import { sendOTPEmail, generateOTP } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({
    interval: 5 * 60 * 1000, // 5 minutes
    uniqueTokenPerInterval: 500,
});

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    const response = NextResponse.next();
    const clientIp = req.headers.get('x-forwarded-for') || 'anonymous';

    // 1. Rate Limit: 3 requests per 5 minutes per IP
    const isRateLimited = limiter.check(response, 3, clientIp);

    if (isRateLimited) {
        return NextResponse.json(
            { error: "Too many requests. Please try again after 5 minutes." },
            { status: 429 }
        );
    }

    try {
        const { email } = await req.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        await connectDB();

        // Delete any existing OTPs for this email
        await OTP.deleteMany({ email: email.toLowerCase() });

        // Generate new OTP
        const code = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save OTP to database
        await OTP.create({
            email: email.toLowerCase(),
            code,
            expiresAt,
            verified: false,
        });

        // Send email
        try {
            await sendOTPEmail(email, code);
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Delete the OTP if email fails
            await OTP.deleteOne({ email: email.toLowerCase(), code });
            return NextResponse.json(
                { error: "Failed to send email. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "OTP sent successfully", email: email.toLowerCase() },
            { status: 200 }
        );
    } catch (error) {
        console.error("Send OTP error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
