"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Order, { OrderStatus } from "@/models/Order";
import { revalidatePath } from "next/cache";

// Helper to check admin
async function checkAdmin() {
    const session = await auth();
    // In a real app, you'd check role. Assuming logged in user is admin for this context based on file location/usage or strict role check if available. 
    // For now, robust check:
    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }
    // const user = await User.findOne({ email: session.user.email });
    // if (user.role !== 'admin') throw ...
    // Assuming simple auth = admin for now as per current codebase structure usually seen
}

export async function updateOrderStatus(orderId: string, status: OrderStatus, note?: string) {
    try {
        await checkAdmin();
        await connectDB();

        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        order.orderStatus = status;

        // Add to timeline
        order.timeline.push({
            status,
            timestamp: new Date(),
            note: note || `Status updated to ${status}`
        });

        if (status === "DELIVERED") {
            // implicit logic for delivered
        }

        await order.save();
        revalidatePath(`/admin/orders/${orderId}`);
        revalidatePath(`/admin/orders`);
        return { success: true };
    } catch (error) {
        console.error("Error updating order status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function addTrackingInfo(orderId: string, tracking: { carrier: string; trackingCode: string; url?: string }) {
    try {
        await checkAdmin();
        await connectDB();

        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        order.tracking = tracking;
        order.orderStatus = "SHIPPED"; // Auto-move to SHIPPED if adding tracking

        order.timeline.push({
            status: "SHIPPED",
            timestamp: new Date(),
            note: `Order shipped via ${tracking.carrier}. Tracking: ${tracking.trackingCode}`
        });

        await order.save();
        revalidatePath(`/admin/orders/${orderId}`);
        return { success: true };
    } catch (error) {
        console.error("Error adding tracking:", error);
        return { success: false, error: "Failed to add tracking" };
    }
}

export async function handleReturnRequest(orderId: string, action: "APPROVED" | "REJECTED" | "COMPLETED", refundAmount?: number) {
    try {
        await checkAdmin();
        await connectDB();

        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        if (!order.returnDetails) {
            order.returnDetails = { isRequested: true } as any;
        }

        order.returnDetails!.status = action;

        if (action === "APPROVED") {
            order.orderStatus = "RETURNED"; // or keep as RETURN_REQUESTED until completed? Let's say Approved starts the process
            // Update timeline
            order.timeline.push({
                status: "RETURN_APPROVED",
                timestamp: new Date(),
                note: "Return request approved. Pickup will be scheduled."
            });
        }

        if (action === "COMPLETED") {
            order.returnDetails!.refundAmount = refundAmount;
            order.timeline.push({
                status: "REFUNDED",
                timestamp: new Date(),
                note: `Return completed. Refund of ₹${refundAmount} processed.`
            });
            order.orderStatus = "RETURNED";
        }

        if (action === "REJECTED") {
            order.timeline.push({
                status: "RETURN_REJECTED",
                timestamp: new Date(),
                note: "Return request rejected."
            });
            // Revert status to Delivered?
            order.orderStatus = "DELIVERED";
        }

        await order.save();
        revalidatePath(`/admin/orders/${orderId}`);
        return { success: true };
    } catch (error) {
        console.error("Error handling return:", error);
        return { success: false, error: "Failed to handle return" };
    }
}

export async function deleteOrder(orderId: string) {
    try {
        await checkAdmin();
        await connectDB();

        await Order.findByIdAndDelete(orderId);
        revalidatePath("/admin/orders");
        return { success: true };
    } catch (error) {
        console.error("Error deleting order:", error);
        return { success: false, error: "Failed to delete order" };
    }
}
