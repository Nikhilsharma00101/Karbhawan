import connectDB from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import TestimonialList from "./TestimonialList";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
    await connectDB();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();

    // Serialize MongoDB objects
    const serializedTestimonials = JSON.parse(JSON.stringify(testimonials));

    return <TestimonialList initialTestimonials={serializedTestimonials} />;
}
