import mongoose, { Schema, Document } from "mongoose";

export interface IOTP extends Document {
    email: string;
    code: string;
    expiresAt: Date;
    verified: boolean;
    createdAt: Date;
}

const OTPSchema = new Schema<IOTP>({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    code: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// TTL index to auto-delete expired OTPs
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.OTP || mongoose.model<IOTP>("OTP", OTPSchema);
