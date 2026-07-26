import { carBrands } from "@/lib/cars";

// Common brand aliases mapping to canonical brand names
const BRAND_ALIASES: Record<string, string> = {
    "vw": "Volkswagen",
    "volkswagen": "Volkswagen",
    "maruti": "Maruti Suzuki",
    "suzuki": "Maruti Suzuki",
    "maruti suzuki": "Maruti Suzuki",
    "merc": "Mercedes-Benz",
    "mercedes": "Mercedes-Benz",
    "mercedes benz": "Mercedes-Benz",
    "mercedes-benz": "Mercedes-Benz",
    "rr": "Land Rover / Range Rover",
    "range rover": "Land Rover / Range Rover",
    "land rover": "Land Rover / Range Rover",
    "land rover / range rover": "Land Rover / Range Rover",
    "bmw": "BMW",
    "mg": "MG",
    "kia": "KIA",
    "byd": "BYD",
    "tata": "Tata",
    "honda": "Honda",
    "hyundai": "Hyundai",
    "hundai": "Hyundai",
    "toyota": "Toyota",
    "mahindra": "Mahindra",
    "skoda": "Skoda",
    "jaguar": "Jaguar"
};

// Known uppercase acronym brands
const ACRONYMS = new Set(["BMW", "MG", "KIA", "BYD"]);

/**
 * Normalizes vehicle make string:
 * 1. Sanitizes whitespace.
 * 2. Checks alias dictionary.
 * 3. Checks carBrands master list case-insensitively.
 * 4. Checks acronym whitelist.
 * 5. Falls back to clean Title Case.
 */
export function normalizeMake(input: string): string {
    if (!input) return "";

    // 1. Sanitize whitespace
    const sanitized = input.trim().replace(/\s+/g, " ");
    if (!sanitized) return "";

    const lower = sanitized.toLowerCase();

    // 2. Check Alias Map
    if (BRAND_ALIASES[lower]) {
        return BRAND_ALIASES[lower];
    }

    // 3. Match against carBrands dataset
    const matchedBrand = carBrands.find(b => b.brand.toLowerCase() === lower);
    if (matchedBrand) {
        return matchedBrand.brand;
    }

    // 4. Check Acronym Whitelist
    const upper = sanitized.toUpperCase();
    if (ACRONYMS.has(upper)) {
        return upper;
    }

    // 5. Fallback Title Case (preserving digits and hyphenated words)
    return toTitleCase(sanitized);
}

/**
 * Normalizes vehicle model string:
 * 1. Sanitizes whitespace.
 * 2. If make matches a known carBrand, searches for matching model case-insensitively.
 * 3. Otherwise, falls back to clean Title Case while preserving acronyms and digits.
 */
export function normalizeModel(makeInput: string, modelInput: string): string {
    if (!modelInput) return "";

    const sanitizedModel = modelInput.trim().replace(/\s+/g, " ");
    if (!sanitizedModel) return "";

    const canonicalMake = normalizeMake(makeInput);
    const brandData = carBrands.find(b => b.brand.toLowerCase() === canonicalMake.toLowerCase());

    if (brandData) {
        const matchedModel = brandData.models.find(
            m => m.name.toLowerCase() === sanitizedModel.toLowerCase()
        );
        if (matchedModel) {
            return matchedModel.name;
        }
    }

    // Check if model input itself is an acronym like "EV6" or "GT" or "RS"
    if (sanitizedModel.length <= 3 && /^[a-z0-9]+$/i.test(sanitizedModel)) {
        return sanitizedModel.toUpperCase();
    }

    return toTitleCase(sanitizedModel);
}

/**
 * Helper to convert string to Title Case while respecting roman numerals, hyphens, and parenthesized text
 */
function toTitleCase(str: string): string {
    return str.replace(/\b\w+/g, (word) => {
        const lowerWord = word.toLowerCase();
        // Keep small uppercase words like EV, GT, RS, 4WD, AWD, V8
        if (/^(ev|gt|rs|awd|4wd|v6|v8|v10|v12|hybrid|phev)$/i.test(word)) {
            return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}
