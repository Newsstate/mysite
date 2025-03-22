import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import styles from "@/styles/Article.module.css";
import slugify from "slugify";

const PostPage = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <h2 className={styles.loading}>Loading...</h2>;
    }

    // Extract featured image
    const featuredImage =
        post.jetpack_featured_media_url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/placeholder.jpg"; // Fallback image

    // Format publish date & time
    const publishedDate = new Date(post.date).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <>
            <Head>
                <title>{post.title.rendered}</title>
            </Head>

            <Header /> {/* ✅ Add Header Here */}

            <div className={styles.container}>
                <h1 className={styles.title}>{post.title.rendered}</h1>

                {/* Display Publish Date & Time */}
                <p className={styles.date}>🕒 Publish: {publishedDate}</p>

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

// ✅ Fetch post data and include _embedded
export async function getStaticPaths() {
    const res = await fetch("https://newsstate24.com/wp-json/wp/v2/posts");
    const posts = await res.json();

    const paths = posts.map((post) => {
        // ✅ Create a short, clean, and unique slug
        let hindiSlug = slugify(post.title.rendered, {
            replacement: "-",
            remove: /[*+~.,()'"!:@]/g, // Removes unwanted characters
            lower: false, // Keeps Hindi characters intact
            strict: true,
            trim: true,
        });

        // ✅ Limit slug length to 100 characters and add post ID
        hindiSlug = hindiSlug.substring(1, 20) + `-${post.id}`;

        return { params: { slug: hindiSlug } };
    });

    return { paths, fallback: true };
}

// ✅ Fetch post details dynamically
export async function getStaticProps({ params }) {
    const postId = params.slug.split("-").pop(); // Extract post ID from slug
    const res = await fetch(`https://newsstate24.com/wp-json/wp/v2/posts/${postId}?_embed=wp:featuredmedia`);
    const post = await res.json();

    if (!post || post.code === "rest_post_invalid_id") {
        return { notFound: true };
    }

    return { props: { post }, revalidate: 10 };
}

export default PostPage;
