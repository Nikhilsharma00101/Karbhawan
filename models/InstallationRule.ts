import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInstallationRule extends Document {
    category: string;
    subCategory?: string;
    subSubCategory?: string;
    segmentRates: Map<string, number>; // Map of 'Hatchback' -> 499, 'SUV' -> 599
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const InstallationRuleSchema: Schema<IInstallationRule> = new Schema(
    {
        category: {
            type: String,
            required: true,
            index: true,
        },
        subCategory: {
            type: String,
            index: true,
        },
        subSubCategory: {
            type: String,
            index: true,
        },
        segmentRates: {
            type: Map,
            of: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Compound index for efficient lookup
InstallationRuleSchema.index(
    { category: 1, subCategory: 1, subSubCategory: 1 },
    { unique: true }
);

const InstallationRule: Model<IInstallationRule> =
    mongoose.models.InstallationRule ||
    mongoose.model<IInstallationRule>("InstallationRule", InstallationRuleSchema);

export default InstallationRule;
