"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { revalidatePath } from "next/cache";

export async function cancelOrder(orderId: string, reason: string) {
    try {
        const session = await auth();
        if (!session?.user) throw new Error("Unauthorized");

        await connectDB();
        const order = await Order.findOne({ _id: orderId, userId: session.user.id });

        if (!order) throw new Error("Order not found");

        if (order.orderStatus !== "PROCESSING") {
            return { success: false, error: "Order cannot be cancelled at this stage" };
        }

        order.orderStatus = "CANCELLED";
        order.cancellationDetails = {
            reason,
            requestDate: new Date()
        };

        order.timeline.push({
            status: "CANCELLED",
            timestamp: new Date(),
            note: `Order cancelled by customer. Reason: ${reason}`
        });

        await order.save();
        revalidatePath(`/orders/${orderId}`);
        revalidatePath(`/orders`);
        return { success: true };
    } catch (error) {
        console.error("Error cancelling order:", error);
        return { success: false, error: "Failed to cancel order" };
    }
}

export async function requestReturn(orderId: string, reason: string) {
    try {
        const session = await auth();
        if (!session?.user) throw new Error("Unauthorized");

        await connectDB();
        const order = await Order.findOne({ _id: orderId, userId: session.user.id });

        if (!order) throw new Error("Order not found");

        if (order.orderStatus !== "DELIVERED") {
            return { success: false, error: "Only delivered orders can be returned" };
        }

        order.orderStatus = "RETURN_REQUESTED";
        order.returnDetails = {
            isRequested: true,
            reason,
            status: "PENDING",
            requestDate: new Date()
        } as any;

        order.timeline.push({
            status: "RETURN_REQUESTED",
            timestamp: new Date(),
            note: `Return requested by customer. Reason: ${reason}`
        });

        await order.save();
        revalidatePath(`/orders/${orderId}`);
        return { success: true };
    } catch (error) {
        console.error("Error requesting return:", error);
        return { success: false, error: "Failed to request return" };
    }
}
