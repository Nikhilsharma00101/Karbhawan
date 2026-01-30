export interface ProductCompatibility {
    make: string;
    model: string;
    years?: string[];
}

export interface ProductType {
    _id: string;
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
    isNewArrival: boolean;
    isBestSeller: boolean;
    isTopChoice: boolean;
    status: 'draft' | 'active' | 'archived';
    tags?: string[];
    highlights?: string[];
    specifications?: Record<string, string>;
    colors?: string[];
    sizes?: string[];
    metaTitle?: string;
    metaDescription?: string;
    rating?: {
        average: number;
        count: number;
    };
    compatibility?: ProductCompatibility[];
    isUniversal?: boolean;
    installationOverride?: {
        isAvailable: boolean;
        flatRate?: number;
        segmentRates?: Record<string, number>;
    };
}

export interface CartItem {
    productId: string;
    slug: string;
    quantity: number;
    price: number;
    originalPrice?: number;
    name: string;
    image: string;
    hasInstallation?: boolean;
    installationCost?: number;
}

export interface TestimonialType {
    _id: string;
    name: string;
    designation?: string;
    message: string;
    rating: number;
    isActive: boolean;
    createdAt: string;
}
