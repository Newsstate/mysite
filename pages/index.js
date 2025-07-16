import NewsCard from '@/components/NewsCard';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import sanitizeTitle from '@/utils/sanitizeTitle';
import sanitizeExcerpt from '@/utils/sanitizeExcerpt'; // Import करें

export default function Home({ newsData }) {
    return (
        <>
            {/* SEO Meta Tags */}
            <Head>
                <title>Newsstate24 Hindi Latest News Highlights, Aaj Ke Taaja khabar Hindi Mein - newsstate24.com</title>
                <meta name="description" content="Stay updated with the latest news, articles, and updates on Newsstate24. Get insights on trending topics across various categories." />
                <link rel="canonical" href="https://newsstate24.com" />
                <meta property="og:title" content="Khabar24live - Latest News" />
                <meta property="og:description" content="Explore breaking news, trending stories, and the latest updates across a variety of topics." />
                <meta property="og:image" content="https://khabar24live.com/og-image.jpg" />
                <meta property="og:url" content="https://khabar24live.com" />
                <meta name="robots" content="index, follow" />
            </Head>

            <Header />
            <Navbar />
            <div className={styles.container}>
                <main className={styles.mainContent}>
                    <div className={styles.newsGrid}>
                        {newsData.length > 0 ? (
                            newsData.map((news) => <NewsCard key={news.id} {...news} />)
                        ) : (
                            <p>No news available.</p>
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}

// Fetch data server-side before rendering the page
export async function getServerSideProps() {
    try {
        const response = await fetch('https://lalluram.com/wp-json/wp/v2/posts?_embed&per_page=63');
        if (!response.ok) throw new Error('Failed to fetch news');

        const data = await response.json();

        // Utility function to decode HTML entities
        const decodeEntities = (str) => {
            if (!str) return "";
            return str.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
                      .replace(/&amp;/g, "&")
                      .replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">");
        };

        const formattedNews = data.map(post => ({
            id: post.id,
             title: sanitizeTitle(decodeEntities(post.title.rendered)) || "No Title",
            excerpt: decodeEntities(post.excerpt.rendered.replace(/<[^>]+>/g, '')), // Cleaning up excerpt
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback-image.jpg',
            publishedAt: new Date(post.date).toLocaleString('hi-IN', { dateStyle: 'medium', timeStyle: 'short' }), // Format date in Hindi locale
        }));	

        return {
            props: { newsData: formattedNews },
        };
    } catch (error) {
        console.error("Error fetching news:", error);
        return { props: { newsData: [] } };
    }
}
