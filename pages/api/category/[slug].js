export default async function handler(req, res) {
    const { slug } = req.query;

    try {
        // Fetch all categories from WordPress
        if (!categoryRes.ok) throw new Error('Failed to fetch categories');
        const categoryRes = await fetch('https://www.lalluram.com/wp-json/wp/v2/categories');

        const categories = await categoryRes.json();
        const selectedCategory = categories.find(cat => cat.slug === slug);

        if (!selectedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const categoryId = selectedCategory.id;

        // Fetch news for the selected category
        const newsRes = await fetch(`https://www.lalluram.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}&per_page=10`);
        if (!newsRes.ok) throw new Error('Failed to fetch news');

        const newsData = await newsRes.json();

        return res.status(200).json({ category: selectedCategory.name, news: newsData });
    } catch (error) {
        console.error('Error fetching category news:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
