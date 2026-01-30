export type CarSegment = 'Hatchback' | 'Sedan' | 'SUV' | 'MUV' | 'Luxury';

export interface CarModel {
    name: string;
    segment: CarSegment;
}

export interface CarBrand {
    brand: string;
    models: CarModel[];
}

export const carBrands: CarBrand[] = [
    {
        brand: "Honda",
        models: [
            { name: "Amaze", segment: "Sedan" },
            { name: "City", segment: "Sedan" },
            { name: "City Hybrid", segment: "Sedan" },
            { name: "Civic", segment: "Sedan" },
            { name: "WR-V", segment: "SUV" },
            { name: "Jazz", segment: "Hatchback" },
            { name: "CR-V", segment: "SUV" }
        ]
    },
    {
        brand: "Hyundai",
        models: [
            { name: "Grand i10 Nios", segment: "Hatchback" },
            { name: "i20", segment: "Hatchback" },
            { name: "i20 N Line", segment: "Hatchback" },
            { name: "Aura", segment: "Sedan" },
            { name: "Verna", segment: "Sedan" },
            { name: "Venue", segment: "SUV" },
            { name: "Venue N Line", segment: "SUV" },
            { name: "Creta", segment: "SUV" },
            { name: "Creta N Line", segment: "SUV" },
            { name: "Alcazar", segment: "SUV" },
            { name: "Tucson", segment: "SUV" },
            { name: "Kona Electric", segment: "SUV" },
            { name: "Ioniq 5", segment: "SUV" }
        ]
    },
    {
        brand: "KIA",
        models: [
            { name: "Sonet", segment: "SUV" },
            { name: "Sonet Facelift", segment: "SUV" },
            { name: "Seltos", segment: "SUV" },
            { name: "Seltos Facelift", segment: "SUV" },
            { name: "Carens", segment: "MUV" },
            { name: "Carnival", segment: "MUV" },
            { name: "EV6", segment: "SUV" }
        ]
    },
    {
        brand: "Mahindra",
        models: [
            { name: "Thar", segment: "SUV" },
            { name: "Thar 5-Door", segment: "SUV" },
            { name: "Bolero", segment: "SUV" },
            { name: "Bolero Neo", segment: "SUV" },
            { name: "XUV300", segment: "SUV" },
            { name: "XUV400 EV", segment: "SUV" },
            { name: "XUV700", segment: "SUV" },
            { name: "Scorpio Classic", segment: "SUV" },
            { name: "Scorpio N", segment: "SUV" },
            { name: "Marazzo", segment: "MUV" }
        ]
    },
    {
        brand: "Maruti Suzuki",
        models: [
            { name: "Alto K10", segment: "Hatchback" },
            { name: "S-Presso", segment: "Hatchback" },
            { name: "Celerio", segment: "Hatchback" },
            { name: "Wagon R", segment: "Hatchback" },
            { name: "Swift", segment: "Hatchback" },
            { name: "Baleno", segment: "Hatchback" },
            { name: "Ignis", segment: "Hatchback" },
            { name: "Dzire", segment: "Sedan" },
            { name: "Ertiga", segment: "MUV" },
            { name: "XL6", segment: "MUV" },
            { name: "Brezza", segment: "SUV" },
            { name: "Fronx", segment: "SUV" },
            { name: "Grand Vitara", segment: "SUV" },
            { name: "Jimny", segment: "SUV" },
            { name: "Invicto", segment: "MUV" }
        ]
    },
    {
        brand: "MG",
        models: [
            { name: "Comet EV", segment: "Hatchback" },
            { name: "Astor", segment: "SUV" },
            { name: "Hector", segment: "SUV" },
            { name: "Hector Plus", segment: "SUV" },
            { name: "ZS EV", segment: "SUV" },
            { name: "Gloster", segment: "SUV" }
        ]
    },
    {
        brand: "Skoda",
        models: [
            { name: "Slavia", segment: "Sedan" },
            { name: "Kushaq", segment: "SUV" },
            { name: "Octavia", segment: "Sedan" },
            { name: "Octavia RS", segment: "Sedan" },
            { name: "Superb", segment: "Sedan" },
            { name: "Kodiaq", segment: "SUV" }
        ]
    },
    {
        brand: "Tata",
        models: [
            { name: "Tiago", segment: "Hatchback" },
            { name: "Tiago EV", segment: "Hatchback" },
            { name: "Tigor", segment: "Sedan" },
            { name: "Tigor EV", segment: "Sedan" },
            { name: "Altroz", segment: "Hatchback" },
            { name: "Altroz Racer", segment: "Hatchback" },
            { name: "Punch", segment: "SUV" },
            { name: "Punch EV", segment: "SUV" },
            { name: "Nexon", segment: "SUV" },
            { name: "Nexon EV", segment: "SUV" },
            { name: "Harrier", segment: "SUV" },
            { name: "Safari", segment: "SUV" }
        ]
    },
    {
        brand: "Toyota",
        models: [
            { name: "Glanza", segment: "Hatchback" },
            { name: "Urban Cruiser Taisor", segment: "SUV" },
            { name: "Urban Cruiser Hyryder", segment: "SUV" },
            { name: "Innova Crysta", segment: "MUV" },
            { name: "Innova Hycross", segment: "MUV" },
            { name: "Fortuner", segment: "SUV" },
            { name: "Fortuner Legender", segment: "SUV" },
            { name: "Camry", segment: "Sedan" },
            { name: "Vellfire", segment: "Luxury" },
            { name: "Hilux", segment: "SUV" },
            { name: "Land Cruiser 300", segment: "Luxury" }
        ]
    },
    {
        brand: "Volkswagen",
        models: [
            { name: "Polo", segment: "Hatchback" },
            { name: "Virtus", segment: "Sedan" },
            { name: "Taigun", segment: "SUV" },
            { name: "Tiguan", segment: "SUV" }
        ]
    },
    {
        brand: "Mercedes-Benz",
        models: [
            { name: "A-Class Limousine", segment: "Luxury" },
            { name: "C-Class", segment: "Luxury" },
            { name: "E-Class", segment: "Luxury" },
            { name: "S-Class", segment: "Luxury" },
            { name: "GLA", segment: "Luxury" },
            { name: "GLB", segment: "Luxury" },
            { name: "GLC", segment: "Luxury" },
            { name: "GLE", segment: "Luxury" },
            { name: "GLS", segment: "Luxury" },
            { name: "EQB", segment: "Luxury" },
            { name: "EQE", segment: "Luxury" },
            { name: "EQS", segment: "Luxury" },
            { name: "AMG GT", segment: "Luxury" }
        ]
    },
    {
        brand: "BMW",
        models: [
            { name: "2 Series Gran Coupe", segment: "Luxury" },
            { name: "3 Series", segment: "Luxury" },
            { name: "5 Series", segment: "Luxury" },
            { name: "6 Series GT", segment: "Luxury" },
            { name: "7 Series", segment: "Luxury" },
            { name: "X1", segment: "Luxury" },
            { name: "X3", segment: "Luxury" },
            { name: "X4", segment: "Luxury" },
            { name: "X5", segment: "Luxury" },
            { name: "X7", segment: "Luxury" },
            { name: "i4", segment: "Luxury" },
            { name: "i7", segment: "Luxury" },
            { name: "iX", segment: "Luxury" }
        ]
    },
    {
        brand: "Jaguar",
        models: [
            { name: "XE", segment: "Luxury" },
            { name: "XF", segment: "Luxury" },
            { name: "F-Type", segment: "Luxury" },
            { name: "F-Pace", segment: "Luxury" },
            { name: "I-Pace", segment: "Luxury" }
        ]
    },
    {
        brand: "Land Rover / Range Rover",
        models: [
            { name: "Defender 90", segment: "Luxury" },
            { name: "Defender 110", segment: "Luxury" },
            { name: "Discovery Sport", segment: "Luxury" },
            { name: "Discovery", segment: "Luxury" },
            { name: "Range Rover", segment: "Luxury" },
            { name: "Range Rover Sport", segment: "Luxury" },
            { name: "Range Rover Velar", segment: "Luxury" },
            { name: "Range Rover Evoque", segment: "Luxury" }
        ]
    }
];
