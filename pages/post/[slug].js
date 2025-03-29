import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleSchema from "@/components/ArticleSchema";
import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Article.module.css";
import slugify from "slugify";
import React from "react";
import Navbar from "@/components/Navbar";

const convertToIST = (date) => {
    if (!date) return "";
    const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    return istDate.toISOString().replace(/\.\d{3}Z/, "+05:30");
};

const PostPage = ({ post, author, canonicalUrl, error }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <h2 className={styles.loading}>लोड हो रहा है...</h2>;
    }

    if (error || !post || !post.title) {
        return <h2 className={styles.error}>पोस्ट नहीं मिली!</h2>;
    }

    const featuredImage =
        post.jetpack_featured_media_url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/placeholder.jpg";

    const publishedDate = convertToIST(new Date(post.date));
    const modifiedDate = convertToIST(new Date(post.modified));
    const authorUrl = `https://n.com/author/${slugify(author.name.toLowerCase())}`;

    const cleanExcerpt = (htmlContent) => {
        return htmlContent.replace(/<a[^>]*>(.*?)<\/a>/g, "$1").replace(/<[^>]+>/g, "").replace(/Read more/gi, "").trim();
    };

    const breadcrumbs = [
        { name: "Home", url: "https://khabar24live.com" },
        { name: "Post", url: "https://khabar24live.com/post" },
        { name: post.title.rendered, url: canonicalUrl },
    ];

    return (
        <>
            <Head>
                <title>{post.title.rendered}</title>
                <meta name="description" content={cleanExcerpt(post.excerpt.rendered)} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonicalUrl} />
            </Head>

            <Header />
            <Navbar />
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <ArticleSchema post={post} author={author} publishedDate={publishedDate} modifiedDate={modifiedDate} canonicalUrl={canonicalUrl} />

            <div className={styles.container}>
                <div className={styles.contentArea}>
                    <div className={styles.mainContent}>
                        <h1 className={styles.title}>{post.title.rendered}</h1>
                        <p className={styles.excerpt}>{cleanExcerpt(post.excerpt.rendered)}</p>
                        <img src={featuredImage} alt={post.title.rendered} className={styles.featuredImage} loading="lazy" />
                        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                    </div>
                    <Sidebar />
                </div>
            </div>

            <Footer />
        </>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;

    if (!id) {
        console.error("No ID provided in query.");
        return { notFound: true };
    }

    try {
        console.log(`Fetching post with ID: ${id}`);
        const res = await fetch(`https://khabar24live.com/wp-json/wp/v2/posts/${id}?_embed=wp:featuredmedia`);
        const post = await res.json();

        if (!post || post.code === "rest_post_invalid_id") {
            console.error("Post not found.");
            return { notFound: true };
        }

        return { props: { post } };
    } catch (error) {
        console.error("Error fetching post:", error);
        return { props: { error: true } };
    }
}


export default PostPage;
