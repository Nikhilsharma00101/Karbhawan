import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { type Session } from "next-auth";

export const runtime = "nodejs";

interface ExtendedSession extends Session {
    user: {
        id: string;
        role: "USER" | "ADMIN";
    } & Session["user"];
}

export async function POST(req: Request) {
    try {
        const session = await auth() as ExtendedSession | null;
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

        if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
        }

        // Verify Signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(razorpayOrderId + "|" + razorpayPaymentId)
            .digest("hex");

        if (generatedSignature !== razorpaySignature) {
            return NextResponse.json({ error: "Payment verification failed: Invalid Signature" }, { status: 400 });
        }

        await connectDB();

        // Update Order
        const order = await Order.findOne({ razorpayOrderId: razorpayOrderId });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Check if already paid to avoid double processing
        if (order.paymentStatus === "PAID") {
            return NextResponse.json({ success: true, message: "Order already paid" });
        }

        order.paymentStatus = "PAID";
        order.razorpayPaymentId = razorpayPaymentId;
        order.razorpaySignature = razorpaySignature;
        // Optionally update orderStatus if needed, e.g. to "PROCESSING" if it wasn't already

        await order.save();

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Payment verification failed", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
