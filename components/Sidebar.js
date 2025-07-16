import styles from "@/styles/Sidebar.module.css";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://lalluram.com/wp-json/wp/v2/posts?_embed&per_page=5");
                const data = await response.json();
                const formattedPosts = data.map(post => {
                    const hindiTitle = post.title.rendered;
                    const hindiSlug = hindiTitle.replace(/\s+/g, "-").replace(/[^\u0900-\u097F\w-]/g, "");
                    return {
                        id: post.id,
                        title: hindiTitle,
                        link: `/post/${hindiSlug}-${post.id}`,
                        thumbnail: post.jetpack_featured_media_url || 
                                   post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || 
                                   "/placeholder.jpg"  // Fallback thumbnail
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
        adsbygoogleScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        adsbygoogleScript.async = true;
        adsbygoogleScript.dataset.adClient = "ca-pub-6466761575770733";
        adsbygoogleScript.crossOrigin = "anonymous";
        document.body.appendChild(adsbygoogleScript);

        // Push ads if AdSense is already loaded
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <aside className={styles.sidebar}>
            {/* Advertisement Section */}
            <div className={styles.widget}>
                <ins className="adsbygoogle"
                    style={{ display: "inline-block", width: "300px", height: "250px" }}
                    data-ad-client="ca-pub-6466761575770733"
                    data-ad-slot="2480605015"></ins>
            </div>

            {/* Recent Posts Section */}
            <div className={styles.widget}>
                <h3>Recent Posts</h3>
                <ul className={styles.newsList}>
                    {posts.map(post => (
                        <li key={post.id} className={styles.newsItem}>
                            <a href={post.link} className={styles.newsLink}>
                                <img src={post.thumbnail} alt={post.title} className={styles.thumbnail} />
                                <span>{post.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
