"use server";

import Product from "@/models/Product";
import InstallationRule from "@/models/InstallationRule";
import connectDB from "@/lib/db";
import { CarModel, carBrands, CarSegment } from "@/lib/cars";

interface PriceReaction {
    price: number | null;
    source: 'override' | 'category' | 'base' | 'none';
    isAvailable: boolean;
}

export async function calculateInstallationPrice(
    productId: string,
    carModelName?: string,
    manualSegment?: CarSegment
): Promise<PriceReaction> {
    try {
        await connectDB();

        // 1. Fetch Product
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        // 2. Identify Car Segment
        let userSegment: CarSegment | undefined = manualSegment;

        if (!userSegment && carModelName) {
            // Find the segment for the given model name
            // Flatten the structure to find the model
            for (const brand of carBrands) {
                const model = brand.models.find(m => m.name === carModelName);
                if (model) {
                    userSegment = model.segment;
                    break;
                }
            }
        }

        // 3. LAYER 1: Product Override
        if (product.installationOverride && product.installationOverride.isAvailable) {
            // If strictly flat rate
            if (product.installationOverride.flatRate) {
                return { price: product.installationOverride.flatRate, source: 'override', isAvailable: true };
            }
            // If segment specific and we know the segment
            if (userSegment && product.installationOverride.segmentRates) {
                // Convert Mongoose Map to JS Map or Object if needed, but Mongoose Map has .get()
                const price = product.installationOverride.segmentRates.get(userSegment);
                if (price !== undefined) {
                    return { price, source: 'override', isAvailable: true };
                }
            }
        } else if (product.installationOverride && product.installationOverride.isAvailable === false) {
            // Explicitly disabled
            return { price: null, source: 'none', isAvailable: false };
        }

        // 4. LAYER 2: Category Rules
        // Find rule for SubSub -> Sub -> Category (most specific match)

        // Try SubSubCategory first
        if (product.subSubCategory) {
            const rule = await InstallationRule.findOne({
                category: product.category,
                subCategory: product.subCategory,
                subSubCategory: product.subSubCategory,
                isActive: true
            });
            if (rule && userSegment && rule.segmentRates.has(userSegment)) {
                return { price: rule.segmentRates.get(userSegment)!, source: 'category', isAvailable: true };
            }
        }

        // Try SubCategory
        if (product.subCategory) {
            const rule = await InstallationRule.findOne({
                category: product.category,
                subCategory: product.subCategory,
                subSubCategory: null, // explicit strictly subcat rule
                isActive: true
            });
            if (rule && userSegment && rule.segmentRates.has(userSegment)) {
                return { price: rule.segmentRates.get(userSegment)!, source: 'category', isAvailable: true };
            }
        }

        // Try Main Category
        const catRule = await InstallationRule.findOne({
            category: product.category,
            subCategory: null,
            subSubCategory: null,
            isActive: true
        });

        if (catRule && userSegment && catRule.segmentRates.has(userSegment)) {
            return { price: catRule.segmentRates.get(userSegment)!, source: 'category', isAvailable: true };
        }

        // 5. LAYER 3: Global/Fallback (Optional, we can return null if no rule found)
        return { price: null, source: 'none', isAvailable: false };

    } catch (error) {
        console.error("Error calculating installation price:", error);
        return { price: null, source: 'none', isAvailable: false };
    }
}

export async function getInstallationRules() {
    try {
        await connectDB();
        const rules = await InstallationRule.find({ isActive: true });
        // Serialize map to object for client
        return rules.map(rule => ({
            ...rule.toObject(),
            _id: rule._id.toString(),
            segmentRates: Object.fromEntries(rule.segmentRates)
        }));
    } catch (error) {
        console.error("Error fetching rules:", error);
        return [];
    }
}

export async function saveInstallationRule(
    category: string,
    subCategory: string | undefined,
    subSubCategory: string | undefined,
    segmentRates: Record<string, number>
) {
    try {
        await connectDB();

        // Construct query to find existing rule
        const query = {
            category,
            subCategory: subCategory || null,
            subSubCategory: subSubCategory || null
        };

        const update = {
            ...query,
            segmentRates, // Map will be automatically handled by Mongoose if passed as object, or we cast it
            isActive: true
        };

        const rule = await InstallationRule.findOneAndUpdate(
            query,
            update,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return { success: true, rule: JSON.parse(JSON.stringify(rule)) };
    } catch (error) {
        console.error("Error saving rule:", error);
        return { success: false, error: "Failed to save rule" };
    }
}
