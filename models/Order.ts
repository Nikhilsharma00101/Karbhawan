import mongoose, { Schema, Document, Model } from "mongoose";

interface IOrderItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
    hasInstallation?: boolean;
    installationCost?: number;
}

export interface IOrderTimeline {
    status: string;
    timestamp: Date;
    note?: string;
}

export interface IOrderTracking {
    carrier: string;
    trackingCode: string;
    url?: string;
}

export interface IOrderReturn {
    isRequested: boolean;
    reason?: string;
    status?: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
    requestDate?: Date;
    pickupDate?: Date;
    refundAmount?: number;
}

export type OrderStatus =
    | "PROCESSING"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURN_REQUESTED"
    | "RETURNED";

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    paymentMethod: "RAZORPAY" | "COD";
    paymentStatus: "PENDING" | "PAID" | "FAILED";
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    orderStatus: OrderStatus;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        phone?: string;
    };
    timeline: IOrderTimeline[];
    tracking?: IOrderTracking;
    returnDetails?: IOrderReturn;
    cancellationDetails?: {
        reason?: string;
        requestDate?: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true },
                hasInstallation: { type: Boolean, default: false },
                installationCost: { type: Number, default: 0 },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ["RAZORPAY", "COD"],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED"],
            default: "PENDING",
        },
        razorpayOrderId: String,
        razorpayPaymentId: String,
        razorpaySignature: String,
        orderStatus: {
            type: String,
            enum: [
                "PROCESSING",
                "SHIPPED",
                "OUT_FOR_DELIVERY",
                "DELIVERED",
                "CANCELLED",
                "RETURN_REQUESTED",
                "RETURNED",
            ],
            default: "PROCESSING",
        },
        shippingAddress: {
            street: String,
            city: String,
            state: String,
            zip: String,
            country: String,
            phone: String,
        },
        timeline: [
            {
                status: String,
                timestamp: { type: Date, default: Date.now },
                note: String,
            },
        ],
        tracking: {
            carrier: String,
            trackingCode: String,
            url: String,
        },
        returnDetails: {
            isRequested: { type: Boolean, default: false },
            reason: String,
            status: {
                type: String,
                enum: ["PENDING", "APPROVED", "REJECTED", "COMPLETED"],
            },
            requestDate: Date,
            pickupDate: Date,
            refundAmount: Number,
        },
        cancellationDetails: {
            reason: String,
            requestDate: Date,
        },
    },
    { timestamps: true }
);

// Prevent Mongoose overwrite warning or stale schema
if (mongoose.models.Order) {
    delete mongoose.models.Order;
}

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
