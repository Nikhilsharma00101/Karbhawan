
"use server";

import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(id: string, newStatus: string) {
    try {
        await connectDB();
        await Order.findByIdAndUpdate(id, { orderStatus: newStatus });
        revalidatePath("/admin/orders");
        revalidatePath(`/admin/orders/${id}`);
        return { success: true, message: "Order status updated successfully" };
    } catch {
        return { success: false, message: "Failed to update order status" };
    }
}
