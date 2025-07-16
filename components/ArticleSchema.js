import React from "react";

const ArticleSchema = ({ post, author, publishedDate, modifiedDate, canonicalUrl }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]*>?/gm, ""),  // Clean up HTML tags in the description
        author: {
            "@type": "Person",
            name: author.name,
            url: `https://khabar24live.com/author/${author.slug}`,
        },
        publisher: {
            "@type": "Organization",
            name: "khabar24live",
            logo: {
                "@type": "ImageObject",
                url: "https://khabar24live.com/logo.png", // Replace with actual logo URL
            },
        },
        datePublished: publishedDate,
        dateModified: modifiedDate,  // Updated to include modifiedDate
        url: canonicalUrl,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schema),
                }}
            />
        </>
    );
};

export default ArticleSchema;
