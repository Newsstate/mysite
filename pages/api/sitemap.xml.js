export default async function handler(req, res) {
  const siteUrl = "https://newsstate24.com"; // Your website URL

  try {
    // Fetch posts from WordPress API
    const response = await fetch("https://newsstate24.com/wp-json/wp/v2/posts");
    if (!response.ok) throw new Error("Failed to fetch posts");

    const posts = await response.json();

    // Generate sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;

    posts.forEach((post) => {
      const postUrl = post.link || `${siteUrl}/post/${post.slug}`;
      const publishedDate = new Date(post.date_gmt).toISOString();

      sitemap += `
      <url>
        <loc>${postUrl}</loc>
        <lastmod>${publishedDate}</lastmod>
        <news:news>
          <news:publication>
            <news:name>Newsstate24</news:name>
            <news:language>hi</news:language>
          </news:publication>
          <news:publication_date>${publishedDate}</news:publication_date>
          <news:title><![CDATA[${post.title.rendered}]]></news:title>
        </news:news>
      </url>`;
    });

    sitemap += `\n</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
}
