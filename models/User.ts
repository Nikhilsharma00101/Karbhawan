import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    name?: string;
    email: string;
    emailVerified?: Date | null;
    password?: string;
    image?: string;
    role: "USER" | "ADMIN";
    provider?: "google" | "credentials";
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
        },
        emailVerified: {
            type: Date,
            default: null,
        },
        password: {
            type: String,
            select: false, // Don't return password by default
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
        provider: {
            type: String,
            enum: ["google", "credentials"],
            default: "credentials",
        },
    },
    { timestamps: true }
);

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
