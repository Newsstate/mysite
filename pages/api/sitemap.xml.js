// pages/api/sitemap.js

export async function handler(req, res) {
    // Fetch all posts from the WordPress API
    const response = await fetch('https://newsstate24.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia');
    const posts = await response.json();

    if (!posts || posts.length === 0) {
        return res.status(404).send("No posts found");
    }

    // Base URL of your site (adjust if necessary)
    const baseUrl = 'https://khabar24live.com';

    // Function to create a slug from the Hindi title and append post ID
    const createSlugFromTitle = (title, postId) => {
        // Convert Hindi title to lowercase and replace spaces with hyphens
        // We keep only alphanumeric characters, hyphens, and spaces
        return title
            .toLowerCase()
            .replace(/[\s-]+/g, '-') // Replace spaces and hyphens with a single hyphen
            .replace(/[^\w\u0900-\u097F\s-]+/g, '') // Remove any non-Hindi or non-alphanumeric characters, but keep Hindi letters
            .trim() + `-${postId}`; // Append post ID to slug
    };

    // Generate the URLs for the posts using the Hindi title as the slug
    const urls = posts.map(post => {
        // Use the Hindi title to create a slug and append post ID
        const hindiSlug = createSlugFromTitle(post.title.rendered, post.id);

        // Only generate URL if the slug is not empty
        if (!hindiSlug) return '';

        // Get the featured image URL
        const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';

        return `
            <url>
                <loc>${baseUrl}/post/${hindiSlug}</loc>
                <lastmod>${new Date(post.modified).toISOString()}</lastmod>
                <priority>0.80</priority>
                <title>${post.title.rendered}</title>
                <image>${featuredImageUrl}</image>
            </url>
        `;
    }).filter(Boolean).join(''); // Filter out empty slugs

    // Construct the complete XML for the sitemap without any leading newlines or spaces
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.00</priority>
    </url>
    ${urls}
</urlset>`;

    // Set the Content-Type header to indicate that this is XML
    res.setHeader('Content-Type', 'application/xml');

    // Send the generated sitemap
    res.status(200).send(sitemap);
}

export default handler;
