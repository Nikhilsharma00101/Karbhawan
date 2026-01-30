export type Category = {
    id: string;
    name: string;
    slug: string;
    children?: Category[];
};

export const categories: Category[] = [
    {
        id: '1',
        name: 'Interior Accessories',
        slug: 'interior-accessories',
        children: [
            {
                id: '1-1',
                name: 'Seat Covers',
                slug: 'seat-covers',
                children: [
                    { id: '1-1-1', name: 'Leather Seat Covers', slug: 'leather-seat-covers' },
                    { id: '1-1-3', name: 'Fabric Seat Covers', slug: 'fabric-seat-covers' },
                ],
            },
            {
                id: '1-2',
                name: 'Floor Mats',
                slug: 'floor-mats',
                children: [
                    { id: '1-2-1', name: 'Foot Mats', slug: 'rubber-mats' },
                    { id: '1-2-2', name: 'Floor Mats', slug: 'carpet-mats' },
                ],
            },
            { id: '1-3', name: 'Dashboard Accessories', slug: 'dashboard-accessories' },
            { id: '1-4', name: 'Car Organizers', slug: 'car-organizers' },
            { id: '1-5', name: 'Steering Wheel Covers', slug: 'steering-wheel-covers' },
            { id: '1-6', name: 'Interior Lighting', slug: 'interior-lighting' },
            { id: '1-7', name: 'Sun Shades', slug: 'sun-shades' },
            { id: '1-8', name: 'Parcel Trays', slug: 'parcel-trays' },
            { id: '1-9', name: 'Roller Curtains', slug: 'roller-curtains' },
        ],
    },
    {
        id: '2',
        name: 'Exterior Accessories',
        slug: 'exterior-accessories',
        children: [
            {
                id: '2-1',
                name: 'Car Covers',
                slug: 'car-covers',
                children: [
                    { id: '2-1-1', name: 'Full Body Covers', slug: 'full-body-covers' },
                    { id: '2-1-2', name: 'Half Covers', slug: 'half-covers' },
                ],
            },
            { id: '2-2', name: 'Spoilers', slug: 'spoilers' },
            { id: '2-3', name: 'Side Mirrors & Guards', slug: 'side-mirrors-guards' },
            { id: '2-4', name: 'Bumpers & Guards', slug: 'bumpers-guards' },
            { id: '2-5', name: 'Roof accessories', slug: 'roof-racks' },
            {
                id: '2-6',
                name: 'Alloy Wheels',
                slug: 'alloy-wheels',
                children: [
                    { id: '2-6-1', name: '17 inch', slug: '17-inch' },
                    { id: '2-6-2', name: '18 inch', slug: '18-inch' },
                    { id: '2-6-3', name: '19 inch', slug: '19-inch' },
                    { id: '2-6-4', name: '20 inch+', slug: '20-inch-plus' },
                ],
            },
            {
                id: '2-7',
                name: 'Fog Lights & Headlights',
                slug: 'fog-headlights',
                children: [
                    { id: '2-7-1', name: 'LED Fog Lights', slug: 'led-fog-lights' },
                    { id: '2-7-2', name: 'Halogen Fog Lights', slug: 'halogen-fog-lights' },
                    { id: '2-7-3', name: 'Headlights', slug: 'headlights' },
                ],
            },
            { id: '2-8', name: 'Car Decals & Stickers', slug: 'car-decals-stickers' },
            { id: '2-9', name: 'Wheel Covers', slug: 'wheel-covers' },
            { id: '2-10', name: 'Wiper Blades', slug: 'wiper-blades' },
            { id: '2-11', name: 'Scuff Plates', slug: 'scuff-plates' },
            { id: '2-12', name: 'Mud Flaps', slug: 'mud-flaps' },
            { id: '2-13', name: 'Diffusers', slug: 'diffusers' },
            { id: '2-14', name: 'Door Guards', slug: 'door-guards' },
            { id: '2-15', name: 'Door Visors', slug: 'door-visors' },
            { id: '2-16', name: 'Flag Rod Covers', slug: 'flag-rod-covers' },
            { id: '2-17', name: 'Number Plate Frames', slug: 'number-plate-frames' },
            { id: '2-18', name: 'Combo Kits', slug: 'combo-kits' },
        ],
    },
    {
        id: '3',
        name: 'Car Electronics',
        slug: 'car-electronics',
        children: [
            {
                id: '3-1',
                name: 'Screens',
                slug: 'screens',
                children: [
                    { id: '3-1-1', name: 'Android Screens', slug: 'android' },
                    { id: '3-1-2', name: 'Apple Screens', slug: 'apple' },
                ],
            },
            { id: '3-2', name: 'Car Cameras', slug: 'car-cameras' },
            { id: '3-3', name: 'GPS & Navigation', slug: 'gps-navigation' },
            { id: '3-4', name: 'Sensors & Alarms', slug: 'sensors-alarms' },
            { id: '3-5', name: 'Lighting Accessories', slug: 'lighting-accessories' },
            { id: '3-6', name: 'Dashcams', slug: 'dashcams' },
            { id: '3-7', name: 'Amplifiers & Subwoofers', slug: 'amplifiers-subwoofers' },
            { id: '3-8', name: 'Car Antennas', slug: 'car-antennas' },
            { id: '3-9', name: 'Car Fans', slug: 'car-fans' },
            { id: '3-10', name: 'Sirens', slug: 'sirens' },
            { id: '3-11', name: 'Horns', slug: 'horns' },
        ],
    },
    {
        id: '4',
        name: 'Car Care & Tools',
        slug: 'car-care-tools',
        children: [
            { id: '4-1', name: 'Cleaning Kits', slug: 'cleaning-kits' },
            { id: '4-2', name: 'Polish & Wax', slug: 'polish-wax' },
            { id: '4-3', name: 'Tools & Equipment', slug: 'tools-equipment' },
            { id: '4-4', name: 'Tyre & Battery Accessories', slug: 'tyre-battery-accessories' },
            { id: '4-5', name: 'Car Jacks & Lifts', slug: 'car-jacks-lifts' },
            { id: '4-6', name: 'Air Compressors', slug: 'air-compressors' },
        ],
    },
    {
        id: '5',
        name: 'Lifestyle & Apparel',
        slug: 'lifestyle-apparel',
        children: [
            { id: '5-1', name: 'Car-Themed Apparel', slug: 'car-themed-apparel' },
            { id: '5-2', name: 'Bags & Backpacks', slug: 'bags-backpacks' },
            { id: '5-3', name: 'Car Gadgets & Gifts', slug: 'car-gadgets-gifts' },
            { id: '5-4', name: 'Car Keychains', slug: 'car-keychains' },
            { id: '5-5', name: 'Car Mugs & Cups', slug: 'car-mugs-cups' },
            { id: '5-6', name: 'Arm Rests', slug: 'arm-rests' },
            { id: '5-7', name: 'Tissue Boxes', slug: 'tissue-boxes' },
            { id: '5-8', name: 'Car Cushion Sets', slug: 'car-cushion-sets' },
            { id: '5-9', name: 'Car Temples', slug: 'car-temples' },
        ],
    },
];

export function flattenCategories(categories: Category[], prefix = ''): { label: string; slug: string }[] {
    let result: { label: string; slug: string }[] = [];

    for (const cat of categories) {
        const label = prefix ? `${prefix} > ${cat.name}` : cat.name;
        result.push({ label, slug: cat.slug });

        if (cat.children?.length) {
            result = [...result, ...flattenCategories(cat.children, label)];
        }
    }

    return result;
}

export function getAllChildSlugs(categorySlug: string): string[] {
    const findCategory = (cats: Category[]): Category | null => {
        for (const cat of cats) {
            if (cat.slug === categorySlug) return cat;
            if (cat.children) {
                const found = findCategory(cat.children);
                if (found) return found;
            }
        }
        return null;
    };

    const target = findCategory(categories);
    if (!target) return [];

    const slugs = [target.slug];

    const collectSlugs = (cat: Category) => {
        if (cat.children) {
            for (const child of cat.children) {
                slugs.push(child.slug);
                collectSlugs(child);
            }
        }
    };

    collectSlugs(target);
    return slugs;
}
export function getCategoryLineage(categorySlug: string): { category: string; subCategory?: string; subSubCategory?: string } | null {
    for (const root of categories) {
        if (root.slug === categorySlug) {
            return { category: root.slug };
        }
        if (root.children) {
            for (const sub of root.children) {
                if (sub.slug === categorySlug) {
                    return { category: root.slug, subCategory: sub.slug };
                }
                if (sub.children) {
                    for (const subSub of sub.children) {
                        if (subSub.slug === categorySlug) {
                            return { category: root.slug, subCategory: sub.slug, subSubCategory: subSub.slug };
                        }
                    }
                }
            }
        }
    }
    return null;
}
