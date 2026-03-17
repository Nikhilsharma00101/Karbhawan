import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email address",
            ],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Optional: create an index for faster queries on active subscribers
subscriberSchema.index({ email: 1 });
subscriberSchema.index({ isActive: 1 });

const Subscriber = mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
