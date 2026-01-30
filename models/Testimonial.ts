import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
    name: string;
    message: string;
    rating: number;
    designation?: string;
    isActive: boolean;
    createdAt: Date;
}

const TestimonialSchema: Schema<ITestimonial> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: false,
            default: "",
        },
        message: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Testimonial: Model<ITestimonial> =
    mongoose.models.Testimonial ||
    mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
