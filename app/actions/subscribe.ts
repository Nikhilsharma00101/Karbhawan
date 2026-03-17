"use server";

import connectDB from "@/lib/db";
import Subscriber from "@/models/Subscriber";

export async function subscribeToNewsletter(email: string) {
    try {
        if (!email || !email.includes("@")) {
            return {
                message: "Please provide a valid email address.",
                type: "error"
            };
        }

        await connectDB();

        // Check if subscriber exists
        const existingSubscriber = await Subscriber.findOne({ email });

        if (existingSubscriber) {
            if (existingSubscriber.isActive) {
                return {
                    message: "You are already subscribed to our newsletter! 🎉",
                    type: "info"
                };
            } else {
                // Reactivate them
                existingSubscriber.isActive = true;
                await existingSubscriber.save();
                return {
                    message: "Welcome back! Your subscription has been reactivated.",
                    type: "success"
                };
            }
        }

        // Create new subscriber
        await Subscriber.create({ email });

        return {
            message: "Thanks for subscribing! You'll hear from us soon.",
            type: "success"
        };
    } catch (error: any) {
        console.error("Newsletter subscription error:", error);

        // Handle mongoose duplicate key error just in case of race conditions
        if (error.code === 11000) {
            return {
                message: "You are already subscribed to our newsletter! 🎉",
                type: "info"
            };
        }

        return {
            message: "Something went wrong. Please try again later.",
            type: "error"
        };
    }
}
