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
import Navbar from '@/components/Navbar'; // ✅ Importing Navbar

const convertToIST = (date) => {
    if (!date) return "";
    const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    return istDate.toISOString().replace(/\.\d{3}Z/, "+05:30"); // Removes milliseconds
};


const PostPage = ({ post, author, canonicalUrl }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <h2 className={styles.loading}>लोड हो रहा है...</h2>;
    }

    if (!post || !post.title) {
        return <h2 className={styles.error}>पोस्ट नहीं मिली!</h2>;
    }

    const featuredImage =
        post.jetpack_featured_media_url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/placeholder.jpg";

    const publishedDate = convertToIST(new Date(post.date));
    const modifiedDate = convertToIST(new Date(post.modified));

    const authorUrl = `http://khabar24live.com/author/${slugify(author.name.toLowerCase())}`;

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
                <html lang="hi" />
                <title>{post.title.rendered}</title>
                <meta name="description" content={cleanExcerpt(post.excerpt.rendered)} />
                <meta name="robots" content="index, follow" />
                <meta name="robots" content="max-image-preview:large" />
                <link rel="canonical" href={canonicalUrl} />

                <meta property="article:published_time" content={publishedDate} />
                <meta property="article:modified_time" content={modifiedDate} />
            </Head>

            <Header />
            <Navbar /> {/* ✅ Navbar placed just after Head */}
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <ArticleSchema
                post={post}
                author={author}
                publishedDate={publishedDate}
                modifiedDate={modifiedDate}
                canonicalUrl={canonicalUrl}
            />

            <div className={styles.container}>
                <div className={styles.contentArea}>
                    <div className={styles.mainContent}>
                        <h1 className={styles.title}>{post.title.rendered}</h1>
                        <p className={styles.excerpt}>{cleanExcerpt(post.excerpt.rendered)}</p>

                        <p className={styles.articleMeta}>
                            🕒 Published: {new Date(post.date).toLocaleString("en-IN", { 
                                weekday: "long", 
                                year: "numeric", 
                                month: "long", 
                                day: "numeric", 
                                hour: "2-digit", 
                                minute: "2-digit", 
                                timeZone: "Asia/Kolkata" 
                            })} 
                            {` | `} 
                            🔄 Modified: {new Date(post.modified).toLocaleString("en-IN", { 
                                weekday: "long", 
                                year: "numeric", 
                                month: "long", 
                                day: "numeric", 
                                hour: "2-digit", 
                                minute: "2-digit", 
                                timeZone: "Asia/Kolkata" 
                            })}
                            {` | `} 
                            ✍️ By: <a href={authorUrl} className={styles.authorLink} target="_blank" rel="noopener noreferrer">
                                {author.name}
                            </a>
                        </p>

                        {/* Social Share Buttons */}
                        <div className={styles.socialShare}>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`} target="_blank" rel="noopener noreferrer">
                                <img src="/icons/facebook.png" alt="Share on Facebook" />
                            </a>
                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title.rendered)}`} target="_blank" rel="noopener noreferrer">
                                <img src="/icons/twitter.png" alt="Share on X (Twitter)" />
                            </a>
                            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title.rendered + " " + canonicalUrl)}`} target="_blank" rel="noopener noreferrer">
                                <img src="/icons/whatsapp.png" alt="Share on WhatsApp" />
                            </a>
                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(canonicalUrl)}&title=${encodeURIComponent(post.title.rendered)}`} target="_blank" rel="noopener noreferrer">
                                <img src="/icons/linkedin.png" alt="Share on LinkedIn" />
                            </a>
                            <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer"> 
                                <img src="/icons/instagram.png" alt="Share on Instagram" />
                            </a>
                        </div>

                        {/* ✅ Featured Image (Fixed - Only One Now) */}
                        <img src={featuredImage} alt={post.title.rendered} className={styles.featuredImage} loading="lazy" />

                        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                        <div className={styles.separator}></div>

                        <h3>About Author</h3>
                        <div className={styles.authorContainer}>
                            <div className={styles.profileCard}>
                                <img src={author.avatar_urls[96]} alt={author.name} className={styles.photo} />
                                <h3 className={styles.titleauthor}>
                                    <a href={authorUrl} target="_blank" rel="noopener noreferrer">{author.name}</a>
                                </h3>
                                <p className={styles.bio}>{author.description || "No bio available."}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.sidebarDesktop}>
                        <Sidebar />
                    </div>
                </div>
            </div>

            <div className={styles.sidebarMobile}>
                <Sidebar />
            </div>

            <Footer />
        </>
    );
};

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
