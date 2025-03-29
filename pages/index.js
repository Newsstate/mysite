import { useEffect } from 'react';
import NewsCard from '@/components/NewsCard';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Sidebar from "@/components/Sidebar";

export default function Home({ newsData }) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <>
            {/* SEO Meta Tags */}
            <Head>
                <title>Hindi Latest News Highlights, Aaj Ke Taaja Khabar Hindi Mein - Newsstate24.com</title>
                <meta name="description" content="Stay updated with the latest news, articles, and updates on Newsstate24. Get insights on trending topics across various categories." />
                <link rel="canonical" href="https://Newsstate24.com" />
                <meta property="og:title" content="Newsstate24 - Latest News" />
                <meta property="og:description" content="Explore breaking news, trending stories, and the latest updates across a variety of topics." />
                <meta property="og:image" content="https://Newsstate24.com/og-image.jpg" />
                <meta property="og:url" content="https://Newsstate24.com" />
                <meta name="robots" content="index, follow" />

                {/* Google AdSense */}
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6466761575770733"
                    crossOrigin="anonymous"></script>
            </Head>

            <Header />
            <Navbar />

            {/* Three-Column Layout */}
            <div className={styles.container}>
                <main className={styles.contentArea}>
                    {/* Left Column - Categories or Trending Topics */}
                    <aside className={styles.leftColumn}>
                        <h2>मध्यप्रदेश</h2>
                        {newsData.slice(0, 3).map((news) => (
                            <NewsCard key={news.id} {...news} compact />
                        ))}
                    </aside>

                    {/* Center Column - Main News (Single Column) */}
                    <section className={styles.mainContent}>
                        {/* Featured News */}
                        {newsData.length > 0 && (
                            <div className={styles.featuredNews}>
                                <img src={newsData[0].image} alt={newsData[0].title} className={styles.featuredImage} />
                                <h1>{newsData[0].title}</h1>
                                <p>{newsData[0].excerpt}</p>
                            </div>
                        )}

                        {/* Single Column Layout for News Cards */}
                        <div className={styles.newsList}>
                            {newsData.slice(6, 50).map((news) => (
                                <NewsCard key={news.id} {...news} />
                            ))}
                        </div>
                    </section>

                    {/* Right Column - Ads & More News */}
                    <div className={styles.sidebarDesktop}>
                        <Sidebar />
                        <aside className={styles.rightColumn}>
                            {/* Google AdSense Ad (Top of Sidebar) */}
                            <div className={styles.adContainer}>
                                <ins className="adsbygoogle"
                                    style={{ display: "inline-block", width: "300px", height: "250px" }}
                                    data-ad-client="ca-pub-6466761575770733"
                                    data-ad-slot="5053362651"></ins>
                            </div>

                            <h2>छत्तीसगढ़</h2>
                            {newsData.slice(10, 13).map((news) => (
                                <NewsCard key={news.id} {...news} compact />
                            ))}
                        </aside>
                    </div> {/* Closed sidebarDesktop div properly */}
                </main> {/* Closed main tag properly */}
            </div> {/* Closed container div properly */}

            <Footer />
        </>
    );
}

// Fetch data server-side before rendering the page
export async function getServerSideProps() {
    try {
        const response = await fetch('https://khabar24live.com/wp-json/wp/v2/posts?_embed&per_page=63');
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
            title: decodeEntities(post.title.rendered), // Decoding HTML entities in the title
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
