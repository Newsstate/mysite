// pages/api/sitemap.xml.js

export async function handler(req, res) {
    try {
        // Define the total number of posts to fetch
        const totalPosts = 500;
        const perPage = 100; // WordPress allows max 100 per page
        const totalPages = Math.ceil(totalPosts / perPage);

        // Base URL of your site (adjust if necessary)
        const baseUrl = 'https://newsstate24.com';

        // Function to fetch posts with pagination
        const fetchPosts = async (page) => {
            const response = await fetch(`https://lalluram.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=${perPage}&page=${page}`);
            if (!response.ok) throw new Error(`Failed to fetch page ${page}: ${response.status}`);
            return response.json();
        };

        // Fetch all posts across multiple pages
        let allPosts = [];
        for (let i = 1; i <= totalPages; i++) {
            const posts = await fetchPosts(i);
            allPosts = [...allPosts, ...posts];
        }

        // Check if posts are available
        if (!allPosts || allPosts.length === 0) {
            return res.status(404).send("No posts found");
        }

        // Sort posts by `date` in descending order to get the latest posts first
        const sortedPosts = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Function to create a slug from the Hindi title and append post ID
        const createSlugFromTitle = (title, postId) => {
            return title
                .toLowerCase()
                .replace(/[\s-]+/g, '-') // Replace spaces and hyphens with a single hyphen
                .replace(/[^\w\u0900-\u097F\s-]+/g, '') // Remove non-Hindi or non-alphanumeric characters
                .trim() + `-${postId}`;
        };

        // Function to convert date to IST (+05:30) and remove milliseconds
        const convertToIST = (date) => {
            if (!date) return "";
            const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
            const istDate = new Date(date.getTime() + istOffset);
            return istDate.toISOString().replace(/\.\d{3}Z/, "+05:30"); // Remove milliseconds and add +05:30
        };

        // Generate URLs for posts
        const urls = sortedPosts.map(post => {
            const hindiSlug = createSlugFromTitle(post.title.rendered, post.id);
            if (!hindiSlug) return '';

            const loc = `${baseUrl}/business/${hindiSlug}`;
            const lastmod = convertToIST(new Date(post.modified));
            const publicationDate = convertToIST(new Date(post.date));
            const hindiTitle = post.title.rendered;
            const language = "hi";

            return `
                <url>
                    <loc>${loc}</loc>
                    <lastmod>${lastmod}</lastmod>
                    <news:news>
                        <news:publication>
                            <news:name>n</news:name>
                            <news:language>${language}</news:language>
                        </news:publication>
                        <news:publication_date>${publicationDate}</news:publication_date>
                        <news:title>${hindiTitle}</news:title>
                    </news:news>
                </url>
            `;
        }).filter(Boolean).join('');

        // Construct sitemap XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>${baseUrl}</loc>
        <lastmod>${convertToIST(new Date())}</lastmod>
        <priority>1.00</priority>
    </url>
    ${urls}
</urlset>`;

        // Set response headers
        res.setHeader('Content-Type', 'application/xml');
        return res.status(200).send(sitemap);
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return res.status(500).send("Internal Server Error");
    }
}


