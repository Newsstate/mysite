import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';

export default function Home() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch('https://newsstate24.com/wp-json/wp/v2/posts?_embed&per_page=63');
                if (!response.ok) throw new Error('Failed to fetch news');

                const data = await response.json();
                const formattedNews = data.map(post => ({
                    id: post.id,
                    title: post.title.rendered,
                    excerpt: post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ''),
                    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback-image.jpg',
                }));

                setNewsData(formattedNews);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            {loading && <p>Loading news...</p>}
            {error && <p className={styles.error}>Error: {error}</p>}

            <div className={styles.newsGrid}>
                {newsData.map((news) => (
                    <NewsCard key={news.id} {...news} />
                ))}
            </div>
        </div>
    );
}
