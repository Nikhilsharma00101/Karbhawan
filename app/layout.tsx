import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });

export const metadata: Metadata = {
  metadataBase: new URL("https://karbhawan.com"),
  title: {
    default: "Karbhawan | Aether Luxe Automotive Accessories",
    template: "%s | Karbhawan",
  },
  description: "Experience the pinnacle of automotive luxury with Karbhawan. Premium car accessories designed for the modern driver. Shop light-luxury modifications, organizers, and tech-infused add-ons.",
  keywords: ["car accessories", "automotive luxury", "car modification", "premium car parts", "Karbhawan", "Delhi NCR car accessories", "doorstep car installation"],
  authors: [{ name: "Karbhawan Team" }],
  creator: "Karbhawan",
  publisher: "Karbhawan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Karbhawan | Aether Luxe Automotive Accessories",
    description: "Upgrade your drive with premium, tech-infused automotive accessories. Doorstep installation available in Delhi NCR.",
    url: "https://karbhawan.com",
    siteName: "Karbhawan",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karbhawan | Premium Car Accessories",
    description: "Discover Aether Luxe automotive accessories. Modify your car with premium parts and doorstep installation.",
    creator: "@karbhawan", // Assuming handle, can be updated
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Check task.md/implementation plan for instructions
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore", // Specific for Car Accessories
    name: "Karbhawan",
    image: "https://karbhawan.com/og-image.png",
    "@id": "https://karbhawan.com",
    url: "https://karbhawan.com",
    telephone: "+91-XXXXXXXXXX", // Update with real number
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Shop Address", // Update with real address
      addressLocality: "New Delhi",
      addressRegion: "DL",
      postalCode: "1100XX",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6139, // Update if you have a physical store
      longitude: 77.209,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
    sameAs: [
      "https://facebook.com/karbhawan",
      "https://instagram.com/karbhawan",
      "https://twitter.com/karbhawan",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans text-aether-primary selection:bg-indigo-100 min-h-screen flex flex-col custom-scrollbar">
        <Providers>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen bg-aether-gradient bg-fixed">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
