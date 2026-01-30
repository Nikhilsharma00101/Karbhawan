import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://karbhawan.com";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/admin/",
                "/account/",
                "/api/",
                "/checkout/success", // Prevent indexing of dynamic/private states
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
