"use server";

import connectDB from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const TestimonialSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    designation: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
    rating: z.coerce.number().min(1).max(5),
    isActive: z.boolean().optional().default(true),
});

export async function createTestimonial(formData: FormData) {
    try {
        await connectDB();
        const data = {
            name: formData.get("name") as string,
            designation: (formData.get("designation") as string) || undefined,
            message: formData.get("message") as string,
            rating: Number(formData.get("rating")),
            isActive: formData.get("isActive") === "on",
        };

        const validatedData = TestimonialSchema.parse(data);
        await Testimonial.create(validatedData);

        revalidatePath("/admin/testimonials");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to create testimonial:", error);
        return { success: false, error: "Validation failed" };
    }
}

export async function updateTestimonial(id: string, formData: FormData) {
    try {
        await connectDB();
        const data = {
            name: formData.get("name") as string,
            designation: (formData.get("designation") as string) || undefined,
            message: formData.get("message") as string,
            rating: Number(formData.get("rating")),
            isActive: formData.get("isActive") === "on",
        };

        const validatedData = TestimonialSchema.parse(data);
        await Testimonial.findByIdAndUpdate(id, validatedData);

        revalidatePath("/admin/testimonials");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update testimonial:", error);
        return { success: false, error: "Validation failed" };
    }
}

export async function deleteTestimonial(id: string) {
    try {
        await connectDB();
        await Testimonial.findByIdAndDelete(id);
        revalidatePath("/admin/testimonials");
        revalidatePath("/");
        return { success: true };
    } catch {
        return { success: false };
    }
}

export async function toggleTestimonialStatus(id: string) {
    try {
        await connectDB();
        const testimonial = await Testimonial.findById(id);
        if (testimonial) {
            testimonial.isActive = !testimonial.isActive;
            await testimonial.save();
        }
        revalidatePath("/admin/testimonials");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}
