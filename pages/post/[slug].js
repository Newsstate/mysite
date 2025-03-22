import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";  // Import Footer component
import styles from "@/styles/Article.module.css";
import slugify from "slugify";

const PostPage = ({ post, author, canonicalUrl }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <h2 className={styles.loading}>लोड हो रहा है...</h2>;
    }

    // Ensure post data exists
    if (!post || !post.title) {
        return <h2 className={styles.error}>पोस्ट नहीं मिली!</h2>;
    }

    // Extract and validate featured image
    const featuredImage =
        post.jetpack_featured_media_url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/placeholder.jpg"; // Fallback image

    // Function to format the date in IST (+05:30) timezone
    const getFormattedPublishedTime = (date) => {
        const timezoneOffset = 5.5 * 60; // IST is +05:30 (5.5 hours offset from UTC)
        const localDate = new Date(date.getTime() + timezoneOffset * 60000); // Adjust for IST offset

        const year = localDate.getUTCFullYear();
        const month = (localDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const day = localDate.getUTCDate().toString().padStart(2, '0');
        const hour = localDate.getUTCHours().toString().padStart(2, '0');
        const minute = localDate.getUTCMinutes().toString().padStart(2, '0');
        const second = localDate.getUTCSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hour}:${minute}:${second}+05:30`;
    };

    // Format publish date & time (in IST: +05:30)
    const publishedDate = new Date(post.date);
    const formattedPublishedDate = getFormattedPublishedTime(publishedDate);
    const formattedModifiedDate = getFormattedPublishedTime(new Date(post.modified));

    // ✅ Get proper slug
    const slug = router.query.slug;

    // Create dynamic author URL
    const authorUrl = `http://localhost:3000/author/${slugify(author.name.toLowerCase())}`;

    // Function to remove HTML tags, hyperlinks, and "Read more" text
    const cleanExcerpt = (htmlContent) => {
        let cleanedContent = htmlContent.replace(/<a[^>]*>(.*?)<\/a>/g, "$1").replace(/<[^>]+>/g, "");
        cleanedContent = cleanedContent.replace(/Read more/gi, ""); // Remove "Read more"
        return cleanedContent.trim();
    };

    // Schema.org structured data for Article
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title.rendered,
        "description": cleanExcerpt(post.excerpt.rendered),
        "author": {
            "@type": "Person",
            "name": author.name,
            "url": authorUrl
        },
        "publisher": {
            "@type": "Organization",
            "name": "NewsState24",
            "logo": {
                "@type": "ImageObject",
                "url": "/logo.png" // Update with actual logo URL
            }
        },
        "datePublished": formattedPublishedDate,  // Use the formatted IST date for published time
        "dateModified": formattedModifiedDate,    // Use the formatted IST date for modified time
        "image": featuredImage,
        "mainEntityOfPage": canonicalUrl,
        "url": canonicalUrl
    };

    return (
        <>
            <Head>
                <html lang="hi" />
                <title>{post.title.rendered}</title>
                <meta name="description" content={cleanExcerpt(post.excerpt.rendered)} />
                <meta name="robots" content="index, follow" />
                <meta name="robots" content="max-image-preview:large" />
                {/* Set the canonical link dynamically */}
                <link rel="canonical" href={canonicalUrl} />

                {/* Structured Data - Article */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(articleSchema),
                    }}
                />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={post.title.rendered} />
                <meta property="og:description" content={cleanExcerpt(post.excerpt.rendered)} />
                <meta property="og:image" content={featuredImage} />
                <meta property="og:url" content={canonicalUrl} />

                {/* Article Published Time */}
                <meta property="article:published_time" content={formattedPublishedDate} />
            </Head>

            <Header />

            <div className={styles.container}>
                <h1 className={styles.title}>{post.title.rendered}</h1>
                <p className={styles.excerpt}>{cleanExcerpt(post.excerpt.rendered)}</p>
                <p className={styles.date}>🕒 Published on: {publishedDate.toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}</p>
                <p className={styles.author}>
                    By: <a href={authorUrl} target="_blank" rel="noopener noreferrer">{author.name}</a>
                </p>

                <img src={featuredImage} alt={post.title.rendered} className={styles.featuredImage} />

                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
            </div>

            <Footer />
        </>
    );
};

// Block AMP URLs by returning 404
export async function getServerSideProps(context) {
    const { slug } = context.params;
    const { amp } = context.query;

    if (amp === "1" || amp !== undefined) {
        return { notFound: true };
    }

    const postId = slug.split("-").pop();
    const res = await fetch(`https://newsstate24.com/wp-json/wp/v2/posts/${postId}?_embed=wp:featuredmedia`);
    const post = await res.json();

    if (!post || post.code === "rest_post_invalid_id") {
        return { notFound: true };
    }

    const authorRes = await fetch(`https://newsstate24.com/wp-json/wp/v2/users/${post.author}`);
    const author = await authorRes.json();

    const canonicalUrl = `https://${context.req.headers.host}/post/${slug}`;

    return { props: { post, author, canonicalUrl } };
}

export default PostPage;
