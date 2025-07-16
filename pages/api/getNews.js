// pages/api/getNews.js
export default async function handler(req, res) {
    const { categoryId } = req.query;

    try {
        const response = await fetch(`https://lalluram.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}&per_page=20`);
        const data = await response.json();

        res.status(200).json(data); // No CORS issue since it's from the same domain
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
}
