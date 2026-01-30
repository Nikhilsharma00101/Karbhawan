import mongoose, { Schema, Document, Model } from "mongoose";

export interface ProductCompatibility {
    make: string;
    model: string;
    years?: string[];
}

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    price: number;
    discountPrice?: number;
    images: string[];
    category: string;
    subCategory?: string;
    subSubCategory?: string;
    stock: number;
    sku: string;
    featured: boolean;
    status: 'draft' | 'active' | 'archived';
    tags?: string[];
    highlights?: string[];
    specifications?: Record<string, string>;
    colors?: string[];
    sizes?: string[];
    metaTitle?: string;
    metaDescription?: string;
    isNewArrival: boolean;
    isBestSeller: boolean;
    isTopChoice: boolean;
    rating?: {
        average: number;
        count: number;
    };
    compatibility?: ProductCompatibility[];
    isUniversal: boolean;
    createdAt: Date;
    updatedAt: Date;
    installationOverride?: {
        isAvailable: boolean;
        flatRate?: number;
        segmentRates?: Map<string, number>;
    };
}

const ProductSchema: Schema<IProduct> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a price"],
            min: 0,
        },
        discountPrice: {
            type: Number,
            min: 0,
        },
        images: {
            type: [String],
            required: [true, "Please upload at least one image"],
        },
        category: {
            type: String,
            required: [true, "Please provide a category"],
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
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        sku: {
            type: String,
            unique: true,
            sparse: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        isNewArrival: {
            type: Boolean,
            default: false,
        },
        isBestSeller: {
            type: Boolean,
            default: false,
        },
        isTopChoice: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["draft", "active", "archived"],
            default: "active",
        },
        tags: [String],
        highlights: [String],
        specifications: {
            type: Map,
            of: String,
        },
        colors: [String],
        sizes: [String],
        metaTitle: String,
        metaDescription: String,
        rating: {
            average: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
        },
        compatibility: [{
            make: String,
            model: String,
            years: [String]
        }],
        isUniversal: {
            type: Boolean,
            default: false
        },
        installationOverride: {
            isAvailable: { type: Boolean, default: true },
            flatRate: Number,
            segmentRates: {
                type: Map,
                of: Number
            }
        }
    },
    { timestamps: true }
);

// Pre-save hook to generate slug
ProductSchema.pre("save", function () {
    if (this.isModified("name") || !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // Remove non-word chars
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(/--+/g, "-") // Replace multiple - with single -
            .trim();
    }
});

// In development, we might have a cached model with an old schema.
// This check ensures we refresh it if the new fields are missing.
if (mongoose.models.Product && (!mongoose.models.Product.schema.path('highlights') || !mongoose.models.Product.schema.path('isNewArrival') || !mongoose.models.Product.schema.path('compatibility'))) {
    delete mongoose.models.Product;
}

const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;




