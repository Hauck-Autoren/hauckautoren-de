// app/ghostwriter/page.jsx
import { getCategoryBySlug, getArticlesByCategorySlug } from "@/sanity/client";
import { buildPageMetadata, DOMAIN, fromSanityImage } from "@/lib/metadata";
import PageTemplate from "@/components/PageTemplate";
import Articles from "@/components/Articles";
import FAQ from "@/components/FAQ";
import { notFound } from "next/navigation";

export const revalidate = 60;

// -------------------------
// Metadata pentru Ghostwriter
// -------------------------
export async function generateMetadata() {
    const data = await getCategoryBySlug("ghostwriter");

    return buildPageMetadata({
        title: data?.title ?? "Ghostwriter",
        description: data?.description ?? undefined,
        image: fromSanityImage(data?.mainImage),
        path: `/ghostwriter`,
    });
}

// -------------------------
// Pagina Ghostwriter
// -------------------------
export default async function GhostwriterPage() {
    const [category, articles] = await Promise.all([
        getCategoryBySlug("ghostwriter"),
        getArticlesByCategorySlug("ghostwriter"),
    ]);

    if (!category) return notFound();

    const safeArticles = Array.isArray(articles) ? articles : [];

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: safeArticles.map((art, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${DOMAIN}/${art.slug}`,
            name: art.title,
            description: art.description || undefined,
        })),
    };

    return (
        <>
            <PageTemplate
                page={category}
                jsonLdType="CollectionPage"
                canonical={`/ghostwriter`}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />

            <Articles
                articles={safeArticles}
                title={category.title}
                intro={category.description}
                categorySlug=""
            />

            <FAQ FAQ={category.faq} />
        </>
    );
}