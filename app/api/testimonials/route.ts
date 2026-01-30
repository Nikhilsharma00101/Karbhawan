import connectDB from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    await connectDB();
    const testimonials = await Testimonial.find({ isActive: true }).sort({ rating: -1 }).limit(10);
    return NextResponse.json(testimonials);
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const newTestimonial = await Testimonial.create(body);
        return NextResponse.json(newTestimonial);
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
