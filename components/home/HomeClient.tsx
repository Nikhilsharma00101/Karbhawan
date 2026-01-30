"use client";

import HeroSection from "./HeroSection";
import CategoryGrid from "./CategoryGrid";
import ProductCarousel from "./ProductCarousel";
import FeatureShowcase from "./FeatureShowcase";
import HomeInstallationSection from "./HomeInstallationSection";
import ProductGrid from "./ProductGrid";
import Testimonials from "./Testimonials";
import { ProductType, TestimonialType } from "@/types";

interface HomeClientProps {
    newArrivals: ProductType[];
    bestSellers: ProductType[];
    testimonials: TestimonialType[];
}

export default function HomeClient({ newArrivals, bestSellers, testimonials }: HomeClientProps) {
    return (
        <main className="flex flex-col min-h-screen bg-white">
            {/* 1. Cinematic Hero */}
            <HeroSection />

            {/* 2. Key Categories */}
            <div id="collections" className="relative z-30 bg-white">
                <CategoryGrid />
            </div>

            {/* 3. New Arrivals Carousel */}
            <ProductCarousel
                title="New Arrivals"
                subtitle="Just Added"
                products={newArrivals}
                bgClass="bg-white"
            />

            {/* 3.5 Home Installation Feature - MAIN ATTRACTION */}
            <HomeInstallationSection />

            {/* 4. Premium Feature: Interior */}
            <FeatureShowcase
                title="Maximum Comfort"
                subtitle="Interior Upgrades"
                description="Get the best seat covers and interior items to make your daily drive more comfortable."
                image="/interior-feature.png" // Custom Generated Feature Image
                features={["Fits your car perfectly", "High quality leather options", "Extra padding for comfort"]}
                ctaText="Shop Interior"
                ctaLink="/shop?category=interior-accessories"
                theme="warm"
                align="right"
            />

            {/* 5. Trending / Best Sellers */}
            <ProductGrid
                title="Trending Now"
                subtitle="Best Sellers"
                products={bestSellers}
            />

            {/* 6. Feature: Exterior */}
            <FeatureShowcase
                title="Stylish Exterior"
                subtitle="Exterior Parts"
                description="Make your car look great with our exterior accessories. Spoilers, alloys, and more."
                image="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2670&auto=format&fit=crop" // Cool car exterior
                features={["Spoilers and kits", "Stylish Alloy Wheels", "Guards and protection"]}
                ctaText="Shop Exterior"
                ctaLink="/shop?category=exterior-accessories"
                theme="cool"
                align="left"
            />

            {/* 7. Testimonials */}
            <section className="bg-white">
                <Testimonials testimonials={testimonials} />
            </section>
        </main>
    );
}
