import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Testimonial from "@/models/Testimonial";
import { ProductType, TestimonialType } from "@/types";
import HomeClient from "@/components/home/HomeClient";

export const revalidate = 0; // Disable cache for immediate updates during development

async function getData() {
  await connectDB();

  // Optimized field selection (Projection) to reduce payload size significantly
  const productProjection = "name slug price discountPrice images category stock isNewArrival isBestSeller compatibility installationOverride createdAt updatedAt";

  const [newArrivals, bestSellers, testimonials] = await Promise.all([
    Product.find({ isNewArrival: true }).select(productProjection).sort({ createdAt: -1 }).limit(8).lean(),
    Product.find({ isBestSeller: true }).select(productProjection).limit(8).lean(),
    Testimonial.find({ isActive: true }).sort({ createdAt: -1 }).limit(3).lean()
  ]);

  // Fallback if no specific tags set, just get latest
  const finalNewArrivals = newArrivals.length > 0
    ? newArrivals
    : await Product.find({}).select(productProjection).sort({ createdAt: -1 }).limit(8).lean();

  const finalBestSellers = bestSellers.length > 0
    ? bestSellers
    : await Product.find({}).select(productProjection).sort({ updatedAt: -1 }).limit(8).lean(); // Fallback to updated

  return {
    newArrivals: JSON.parse(JSON.stringify(finalNewArrivals)) as ProductType[],
    bestSellers: JSON.parse(JSON.stringify(finalBestSellers)) as ProductType[],
    testimonials: JSON.parse(JSON.stringify(testimonials)) as TestimonialType[]
  };
}

export default async function Home() {
  const { newArrivals, bestSellers, testimonials } = await getData();

  return (
    <HomeClient
      newArrivals={newArrivals}
      bestSellers={bestSellers}
      testimonials={testimonials}
    />
  );
}
