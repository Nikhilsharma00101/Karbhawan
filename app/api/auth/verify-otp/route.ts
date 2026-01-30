import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OTP from "@/models/OTP";
import User from "@/models/User";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const { email, code } = await req.json();

        if (!email || !code) {
            return NextResponse.json(
                { error: "Email and code are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Find OTP
        const otpRecord = await OTP.findOne({
            email: email.toLowerCase(),
            code: code.trim(),
        });

        if (!otpRecord) {
            return NextResponse.json(
                { error: "Invalid OTP code" },
                { status: 400 }
            );
        }

        // Check if expired
        if (new Date() > otpRecord.expiresAt) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return NextResponse.json(
                { error: "OTP has expired. Please request a new one." },
                { status: 400 }
            );
        }

        // Check if already verified
        if (otpRecord.verified) {
            return NextResponse.json(
                { error: "OTP already used. Please request a new one." },
                { status: 400 }
            );
        }

        // Mark as verified
        otpRecord.verified = true;
        await otpRecord.save();

        // Find or create user
        let user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            user = await User.create({
                email: email.toLowerCase(),
                emailVerified: new Date(),
                role: "USER",
            });
        } else {
            // Update email verification if not verified
            if (!user.emailVerified) {
                user.emailVerified = new Date();
                await user.save();
            }
        }

        // Create account entry for email provider
        const client = await clientPromise;
        const db = client.db();
        const accountsCollection = db.collection("accounts");

        const existingAccount = await accountsCollection.findOne({
            provider: "email",
            providerAccountId: email.toLowerCase(),
        });

        if (!existingAccount) {
            await accountsCollection.insertOne({
                userId: user._id.toString(),
                type: "email",
                provider: "email",
                providerAccountId: email.toLowerCase(),
            });
        }

        // Clean up used OTP
        await OTP.deleteOne({ _id: otpRecord._id });

        return NextResponse.json(
            {
                message: "OTP verified successfully",
                user: {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Verify OTP error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
