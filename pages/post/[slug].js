import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import styles from "@/styles/Article.module.css";
import slugify from "slugify";

const PostPage = ({ post, canonicalUrl }) => {
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

    // Format publish date & time
    const publishedDate = new Date(post.date).toLocaleDateString("hi-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    // ✅ Get proper slug
    const slug = router.query.slug;

    return (
        <>
            <Head>
                <html lang="hi" />
                <title>{post.title.rendered}</title>
                <meta name="description" content={post.excerpt.rendered.replace(/<[^>]*>?/gm, '')} />
                <meta name="robots" content="max-image-preview:large" />
                {/* Set the canonical link dynamically */}
                <link rel="canonical" href={canonicalUrl} />
            </Head>

            <Header />

            <div className={styles.container}>
                {/* ✅ Only One H1 for Hindi Title */}
                <h1 className={styles.title}>{post.title.rendered}</h1>

                {/* Display Publish Date & Time */}
                <p className={styles.date}>🕒 प्रकाशित: {publishedDate}</p>

                {/* Display Featured Image */}
                <img src={featuredImage} alt={post.title.rendered} className={styles.featuredImage} />

                {/* Render Article Content */}
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
            </div>
        </>
    );
};

// ✅ Block AMP URLs by returning 404
export async function getServerSideProps(context) {
    const { slug } = context.params;
    const { amp } = context.query;

    // ❌ If AMP is detected, return 404
    if (amp === "1" || amp !== undefined) {
        return { notFound: true };
    }

    const postId = slug.split("-").pop();
    const res = await fetch(`https://newsstate24.com/wp-json/wp/v2/posts/${postId}?_embed=wp:featuredmedia`);
    const post = await res.json();

    if (!post || post.code === "rest_post_invalid_id") {
        return { notFound: true };
    }

    // Generate the full URL for the canonical link
    const canonicalUrl = `https://${context.req.headers.host}/post/${slug}`;

    return { props: { post, canonicalUrl } };
}

export default PostPage;
