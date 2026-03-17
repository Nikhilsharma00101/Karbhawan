import connectDB from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const { isActive } = body;

        await connectDB();

        const subscriber = await Subscriber.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!subscriber) {
            return NextResponse.json(
                { error: "Subscriber not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ subscriber });
    } catch (error) {
        console.error("Error updating subscriber:", error);
        return NextResponse.json(
            { error: "Failed to update subscriber" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        const { id } = await params;

        await connectDB();

        const subscriber = await Subscriber.findByIdAndDelete(id);

        if (!subscriber) {
            return NextResponse.json(
                { error: "Subscriber not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Subscriber deleted successfully" });
    } catch (error) {
        console.error("Error deleting subscriber:", error);
        return NextResponse.json(
            { error: "Failed to delete subscriber" },
            { status: 500 }
        );
    }
}
