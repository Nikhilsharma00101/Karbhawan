import connectDB from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sendNewsletterEmail } from "@/lib/email";

// Helper for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { subject, content } = body;

        if (!subject || !content) {
            return NextResponse.json(
                { error: "Subject and content are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Fetch only active subscribers
        const subscribers = await Subscriber.find({ isActive: true }).select('email').lean();

        if (!subscribers || subscribers.length === 0) {
            return NextResponse.json(
                { error: "No active subscribers found" },
                { status: 404 }
            );
        }

        let successCount = 0;
        let failCount = 0;

        // Process sequentially with a delay to respect rate limits
        for (const sub of subscribers) {
            try {
                // Ensure email address is a string
                if (typeof sub.email === 'string' && sub.email.includes('@')) {
                    await sendNewsletterEmail(sub.email, subject, content);
                    successCount++;
                    // 1 second delay between sends
                    await delay(1000);
                } else {
                    console.warn(`Invalid email skipped: ${sub.email}`);
                    failCount++;
                }
            } catch (err) {
                console.error(`Failed to send to ${sub.email}:`, err);
                failCount++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Newsletter sent. Successful: ${successCount}, Failed: ${failCount}`,
            stats: {
                totalTargeted: subscribers.length,
                successCount,
                failCount
            }
        });

    } catch (error) {
        console.error("Error sending newsletter:", error);
        return NextResponse.json(
            { error: "Failed to process newsletter send request" },
            { status: 500 }
        );
    }
}
