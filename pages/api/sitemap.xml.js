// pages/api/sitemap.xml.js

export async function handler(req, res) {
    try {
        // Define the number of posts to fetch
        const postsLimit = 100;

        // Fetch posts from the WordPress API (limit is added to request to ensure we only fetch required posts)
        const response = await fetch(`https://newsstate24.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=${postsLimit}`);
        const posts = await response.json();

        // Check if posts are available
        if (!posts || posts.length === 0) {
            return res.status(404).send("No posts found");
        }

        // Sort posts by the `date` (or `modified`) in descending order to get the most recent posts first
        const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Base URL of your site (adjust if necessary)
        const baseUrl = 'https://khabar24live.com';

        // Function to create a slug from the Hindi title and append post ID
        const createSlugFromTitle = (title, postId) => {
            // Convert Hindi title to lowercase and replace spaces with hyphens
            return title
                .toLowerCase()
                .replace(/[\s-]+/g, '-') // Replace spaces and hyphens with a single hyphen
                .replace(/[^\w\u0900-\u097F\s-]+/g, '') // Remove non-Hindi or non-alphanumeric characters
                .trim() + `-${postId}`; // Append post ID to slug
        };

        // Generate the URLs for the posts using the Hindi title as the slug
        const urls = sortedPosts.map(post => {
            // Use the Hindi title to create a slug and append post ID
            const hindiSlug = createSlugFromTitle(post.title.rendered, post.id);

            // Only generate URL if the slug is not empty
            if (!hindiSlug) return '';

            // Format post details
            const loc = `${baseUrl}/business/${hindiSlug}`;
            const lastmod = new Date(post.modified).toISOString();
            const title = post.title.rendered;
            const publicationDate = new Date(post.date).toISOString();
            const hindiTitle = post.title.rendered; // Assuming post.title.rendered is in Hindi
            const language = "hi"; // Assuming the language is Hindi

            return `
                <url>
                    <loc>${loc}</loc>
                    <lastmod>${lastmod}</lastmod>
                    <news:news>
                        <news:publication>
                            <news:name>khabar24live</news:name>
                            <news:language>${language}</news:language>
                        </news:publication>
                        <news:publication_date>${publicationDate}</news:publication_date>
                        <news:title>${hindiTitle}</news:title>
                    </news:news>
                </url>
            `;
        }).filter(Boolean).join(''); // Filter out empty slugs

        // Construct the complete XML for the sitemap with additional namespaces
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.00</priority>
    </url>
    ${urls}
</urlset>`;

        // Set the correct Content-Type header
        res.setHeader('Content-Type', 'application/xml');

        // Send the generated sitemap
        return res.status(200).send(sitemap);
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return res.status(500).send("Internal Server Error");
    }
}

export default handler;
