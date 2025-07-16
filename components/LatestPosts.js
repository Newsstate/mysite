import { useState, useEffect } from "react";

const LatestPosts = () => {
    const [posts, setPosts] = useState([]);
    const sitemapUrl = "https://khabar24live.com/api/sitemap.xml";

    useEffect(() => {
        const fetchSitemapPosts = async () => {
            try {
                const response = await fetch(sitemapUrl);
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }

                const text = await response.text();

                // Parse XML
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "text/xml");

                // Extract URLs from <loc> elements
                const urls = Array.from(xmlDoc.getElementsByTagName("loc")).map(loc => loc.textContent);

                // Get last 4 posts
                const latestPosts = urls.slice(-4).map(url => ({
                    title: url.split("/").pop().replace(/-/g, " "), // Convert slug to readable title
                    link: url
                }));

                setPosts(latestPosts);
            } catch (error) {
                console.error("Error fetching sitemap:", error);
            }
        };

        fetchSitemapPosts();
    }, []);

    return (
        <div>
            <h3>Latest Posts</h3>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <li key={index}>
                            <a href={post.link} target="_blank" rel="noopener noreferrer">
                                {post.title}
                            </a>
                        </li>
                    ))
                ) : (
                    <p>Loading latest posts...</p>
                )}
            </ul>
        </div>
    );
};

export default LatestPosts;
