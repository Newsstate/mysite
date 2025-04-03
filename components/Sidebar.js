import styles from "@/styles/Sidebar.module.css";
import { useEffect, useState } from "react";
import createSlug from "@/utils/createSlug";
import Link from "next/link";
import sanitizeTitle from "@/utils/sanitizeTitle";

const Sidebar = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://khabar24live.com/wp-json/wp/v2/posts?_embed&per_page=5"
        );
        const data = await response.json();
        const formattedPosts = data.map((post) => {
          const categoryName =
            post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized"; // Get category name
          const categorySlug = createSlug(categoryName); // Generate category slug (or use API slug if available)
          return {
            id: post.id,
            title: post.title.rendered,
            slug: post.slug, // Get the English slug from the API
            categoryName: categoryName,
            categoryLink: `/category/${categorySlug}`, // Generate category link
            thumbnail:
              post.jetpack_featured_media_url ||
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/placeholder.jpg", // Fallback thumbnail
          };
        });
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Load the AdSense script dynamically
    const adsbygoogleScript = document.createElement("script");
    adsbygoogleScript.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    adsbygoogleScript.async = true;
    adsbygoogleScript.dataset.adClient = "ca-pub-6466761575770733";
    adsbygoogleScript.crossOrigin = "anonymous";
    document.body.appendChild(adsbygoogleScript);

    // Push ads if AdSense is already loaded
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <aside className={styles.sidebar}>
      {/* Advertisement Section */}
      <div className={styles.widget}>
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "300px", height: "250px" }}
          data-ad-client="ca-pub-6466761575770733"
          data-ad-slot="2480605015"
        ></ins>
      </div>

      {/* Recent Posts Section */}
      <div className={styles.widget}>
        <h3>Recent Posts</h3>
        <ul className={styles.newsList}>
          {posts.map((post) => {
            const sanitizedTitle = sanitizeTitle(post.title); // Sanitize the title
            return (
              <li key={post.id} className={styles.newsItem}>
                <a
                  href={`/post/${post.slug}-${post.id}`} // Use the English slug
                  className={styles.newsLink}
                >
                  <img
                    src={post.thumbnail}
                    
                    className={styles.thumbnail}
                  />
                <span>{sanitizedTitle}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;