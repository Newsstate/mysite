import styles from "@/styles/Sidebar.module.css";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://khabar24live.com/wp-json/wp/v2/posts?_embed&per_page=5");
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

    return (
        <aside className={styles.sidebar}>
            {/* Advertisement Section */}
            <div className={styles.widget}>
                <h3>Advertisement</h3>
                <img src="/ad-placeholder.jpg" alt="Advertisement" className={styles.adImage} />
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
