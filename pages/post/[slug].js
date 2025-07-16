import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleSchema from "@/components/ArticleSchema";
import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Article.module.css";
import slugify from "slugify";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import sanitizeTitle from "@/utils/sanitizeTitle"; // Import sanitizeTitle


const convertToIST = (date) => {
  if (!date) return "";
  const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
  return istDate.toISOString().replace(/\.\d{3}Z/, "+05:30");
};

const insertReadArticleAfterSecondParagraph = (
  content,
  relatedArticles,
  currentPostId
) => {
  const paragraphs = content.split("</p>");

  // Filter out the current article from related articles
  const filteredArticles = relatedArticles.filter(
    (article) => article.id !== currentPostId
  );

  // Pick a random article from the filtered list
  const randomArticle =
    filteredArticles.length > 0
      ? filteredArticles[Math.floor(Math.random() * filteredArticles.length)]
      : null;

  let articleHtml = "";
  if (randomArticle) {
    const articleTitle = sanitizeTitle(randomArticle.title.rendered); // Sanitize title
    const articleUrl = `/post/${randomArticle.slug}-${randomArticle.id}`; // Use the slug from the API
    articleHtml = `
      <div style="
        background-color: #f8f9fa;
        border-left: 4px solid #007bff;
        padding: 10px;
        margin: 15px 0;
        font-size: 16px;
      ">
        <strong>Also Read: </strong>
        <a href="${articleUrl}">
          "${articleTitle}"
        </a>
      </div>
    `;
  }

  // विज्ञापन कोड
  const adCode = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6466761575770733"
      crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
      style="display:inline-block;width:300px;height:250px"
      data-ad-client="ca-pub-6466761575770733"
      data-ad-slot="7528468784"></ins>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  `;

  if (paragraphs.length > 2) {
    paragraphs.splice(
      2,
      0,
      adCode, // विज्ञापन कोड यहाँ जोड़ा गया
      articleHtml // उसके बाद "Also Read" सेक्शन
    );
  } else if (paragraphs.length > 1) {
    paragraphs.splice(
      1,
      0,
      adCode, // यदि केवल एक या दो पैराग्राफ हैं तो विज्ञापन को दूसरे के बाद डालें
      articleHtml
    );
  } else if (paragraphs.length > 0) {
    paragraphs.unshift(adCode, articleHtml); // यदि कोई पैराग्राफ नहीं है तो शुरुआत में डालें (हालांकि यह असामान्य स्थिति है)
  } else {
    return adCode + articleHtml; // यदि कोई कंटेंट नहीं है तो केवल विज्ञापन और "Also Read" रिटर्न करें
  }

  return paragraphs.join("</p>");
};
const cleanExcerpt = (htmlContent) => {
  if (!htmlContent) {
    return ""; // Handle null or undefined input
  }

  return htmlContent
    .replace(/<a[^>]*>(.*?)<\/a>/gi, "$1") // Remove anchor tags (case-insensitive)
    .replace(/<[^>]+>/g, "") // Remove all HTML tags
    .replace(/Read more/gi, "") // Remove "Read more" (case-insensitive)
    .replace(/&hellip;/g, "...") // Replace ellipsis with "..."
    .replace(/&#?[a-z0-9]+;/gi, "") // Remove HTML entities
    .replace(/\s+/g, " ") // Remove extra spaces
    .trim(); // Trim leading/trailing spaces
};

const PostPage = ({
  post,
  author,
  categoryName,
  canonicalUrl,
  relatedArticles,
}) => {
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

  const authorUrl = `https://newsstate24.com/author/${slugify(
    author.name.toLowerCase()
  )}`;

  const breadcrumbs = [
    { name: "Home", url: "https://newsstate24.com" },
    { name: categoryName, url: `/post/${slugify(categoryName.toLowerCase())}` },
    { name: post.title.rendered, url: canonicalUrl },
  ];

  const sanitizedTitle = sanitizeTitle(post.title.rendered); // Sanitize title

  const contentWithReadArticle = insertReadArticleAfterSecondParagraph(
    post.content.rendered,
    relatedArticles,
    post.id
  ); // Pass post.id

  const cleanedExcerpt = cleanExcerpt(post.excerpt.rendered);
  const metaDescription =
    cleanedExcerpt.length > 160 ? cleanedExcerpt.substring(0, 157) + "..." : cleanedExcerpt;

  return (
    <>
      <Head>
        <html lang="hi" />
        <title>{sanitizedTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <meta name="robots" content="max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={modifiedDate} />
      </Head>

      <Header />
      <Navbar />
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
            <h1 className={styles.title}>{sanitizedTitle}</h1>
            <p className={styles.excerpt}>{cleanedExcerpt}</p>

            <p className={styles.articleMeta}>
              Published:{" "}
              {new Date(post.date).toLocaleString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kolkata",
              })}{" "}
              {` | `} Modified:{" "}
              {new Date(post.modified).toLocaleString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kolkata",
              })}{" "}
              {` | `} By:{" "}
              <a
                href={authorUrl}
                className={styles.authorLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {author.name}
              </a>{" "}
              {` | `}
              📂 Category: <span className={styles.category}>{categoryName}</span>
            </p>
            <div className={styles.socialShare}>
              <span>Social Share</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  canonicalUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/facebook.png"
                  alt="Facebook"
                  className={styles.shareIcon}
                />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  canonicalUrl
                )}&text=${encodeURIComponent(sanitizedTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/icons/twitter.png" alt="X" className={styles.shareIcon} />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  sanitizedTitle + " " + canonicalUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/whatsapp.png"
                  alt="WhatsApp"
                  className={styles.shareIcon}
                />
              </a>
              {/* Instagram (Direct sharing isn't available, but we can redirect to Instagram profile) */}
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/icons/instagram.png"
                  alt="Instagram"
                  className={styles.shareIcon}
                />
              </a>
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  canonicalUrl
                )}&title=${encodeURIComponent(sanitizedTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/linkedin.png"
                  alt="LinkedIn"
                  className={styles.shareIcon}
                />
              </a>
            </div>
            <img
              src={featuredImage}
              alt={sanitizedTitle}
              className={styles.featuredImage}
              loading="lazy"
            />

            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: contentWithReadArticle }}
            />

            {/* ✅ Styled Related Articles Section with Bullets */}
            <div className={styles.relatedArticles}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  borderBottom: "2px solid #333",
                  paddingBottom: "5px",
                  marginBottom: "10px",
                  color: "red",
                }}
              >
                Related Articles
              </h3>

              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                }}
              >
                {relatedArticles.map((article) => (
                  <li key={article.id} style={{ marginBottom: "8px" }}>
                    <a
                      href={`/post/${article.slug}-${article.id}`} // Use the slug from the API
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#007bff",
                        textDecoration: "none",
                      }}
                    >
                      {sanitizeTitle(article.title.rendered)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.separator}></div>

            <h3>About Author</h3>
            <div className={styles.authorContainer}>
              <div className={styles.profileCard}>
                <img
                  src={author.avatar_urls[96]}
                  alt={author.name}
                  className={styles.photo}
                />
                <h3 className={styles.titleauthor}>
                  <a href={authorUrl} target="_blank" rel="noopener noreferrer">
                    {author.name}
                  </a>
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


      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const postId = slug.split("-").pop();

  try {
    const res = await fetch(
      `https://lalluram.com/wp-json/wp/v2/posts/${postId}?_embed=wp:featuredmedia`
    );
    const post = await res.json();

    if (!post || post.code === "rest_post_invalid_id") {
      return { notFound: true };
    }

    const authorRes = await fetch(
      `https://lalluram.com/wp-json/wp/v2/users/${post.author}`
    );
    const author = await authorRes.json();

    const categoryId = post.categories[0];
    const categoryRes = await fetch(
      `https://lalluram.com/wp-json/wp/v2/categories/${categoryId}`
    );
    const categoryData = await categoryRes.json();
    const categoryName = categoryData.name || "Uncategorized";

    const relatedRes = await fetch(
      `https://lalluram.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=5&_embed`
    ); // Embed featured media if needed
    const relatedArticles = await relatedRes.json();

    return {
      props: {
        post,
        author,
        categoryName,
        canonicalUrl: `https://www.newsstate24.com/post/${post.slug}-${postId}`, // Using post.slug here
        relatedArticles: relatedArticles.map((article) => ({
          ...article,
          featured_media_url:
            article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        })),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { notFound: true };
  }
}

export default PostPage;