import { urlFor } from "@/sanity/client";

// Centralize these two so you don't repeat them anywhere else
export const SITE_NAME = "Hauck & Autoren";
export const DOMAIN = "https://hauckautoren.de";


export const NAVIGATION = {

    header: [

        { name: "Wssenschaftliche Arbeit", href: "/wissenschaftliche-arbeiten" },
        { name: "Plagiatspruefung", href: "/plagiatspruefung" },
        { name: "Lektorat", href: "/lektorat" },
        { name: "Wissenwertes", href: "/fachrichtungen" },
        { name: "Ghostwriter", href: "/ghostwriter" },
        { name: "Glossar", href: "/glossar" },
        { name: "Fachrichtungen", href: "/fachrichtungen" },
        { name: "FAQ", href: "/faq" },
    ],
    footer: [
        { name: 'Impressum', href: '/impressum' },
        { name: 'AGB', href: '/agb' },
        { name: 'Datenschutz', href: '/datenschutz' },
    ],
}


// Helper if you use Sanity images for OG
export function fromSanityImage(img) {
    return img ? urlFor(img).width(1200).height(630).url() : undefined;
}

/**
 * Tiny, universal builder for Next.js metadata.
 * Call it with raw pieces, NOT with the whole page object.
 *
 * Example:
 *   const image = fromSanityImage(page?.mainImage);
 *   return buildPageMetadata({
 *     title: page?.title,
 *     description: page?.description,
 *     image,
 *     path: `/${slug}`
 *   });
 */
export function buildPageMetadata(input) {
    const { title, description, image, path = "/" } = input || {};
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    const desc = description || "Infos.";
    const canonical = `${DOMAIN}${path}`;

    return {
        title: fullTitle,
        description: desc,
        alternates: { canonical: canonical },
        openGraph: {
            title: fullTitle,
            description: desc,
            url: canonical,
            type: "website",
            images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
        },
        twitter: {
            card: image ? "summary_large_image" : "summary",
            title: fullTitle,
            description: desc,
            images: image ? [image] : undefined,
        },
        robots: { index: true, follow: true },
    };
}