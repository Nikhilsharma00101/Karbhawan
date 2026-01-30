import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWishlist extends Document {
    user: mongoose.Schema.Types.ObjectId;
    products: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const WishlistSchema: Schema<IWishlist> = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // One wishlist per user for now
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    { timestamps: true }
);

const Wishlist: Model<IWishlist> =
    mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema);

export default Wishlist;
