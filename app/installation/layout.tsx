import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Doorstep Car Installation Service | Karbhawan Delhi NCR",
    description: "Expert mobile car accessory installation service in Delhi, Gurgaon, Noida, and Ghaziabad. We bring the workshop to your doorstep with certified technicians.",
    openGraph: {
        title: "Doorstep Installation | Karbhawan",
        description: "Premium mobile installation service for automotive accessories. We bring the workshop to you.",
        images: ["/home-installation.png"], // Assuming this image exists based on previous file listing
    },
};

export default function InstallationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        name: "Karbhawan Doorstep Installation",
        image: "https://karbhawan.com/home-installation.png",
        areaServed: ["New Delhi", "Gurgaon", "Noida", "Ghaziabad", "Faridabad", "Greater Noida"],
        availableLanguage: ["English", "Hindi"],
        serviceType: "Car Accessory Installation",
        provider: {
            "@type": "AutoPartsStore",
            name: "Karbhawan",
            url: "https://karbhawan.com"
        },
        offers: {
            "@type": "Offer",
            price: "299",
            priceCurrency: "INR",
            description: "Starting price for installation services"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
