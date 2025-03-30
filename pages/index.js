import { useEffect } from 'react';
import LeftColumnCard from '@/components/LeftColumnCard';
import PostCard from '@/components/PostCard';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';

export default function Home({ newsData = [] }) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    // Filter posts for the left sidebar
    const cityAndStateNews = newsData.filter(news => news.category === "शहर और राज्य").slice(0, 3);

    return (
        <>
            <Head>
                <title>Hindi Latest News Highlights - Newsstate24</title>
                <meta name="description" content="Stay updated with the latest news on Newsstate24." />
                <meta property="og:title" content="Newsstate24 - Latest News" />
                <meta property="og:image" content="https://Newsstate24.com/og-image.jpg" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6466761575770733" crossOrigin="anonymous"></script>
            </Head>
            
            <Header />
            <Navbar />
            
            <div className={styles.container}>
                <main className={styles.contentArea}>
                    {/* Left Sidebar */}
                    <aside className={styles.leftColumn}>
                        <h2>शहर और राज्य</h2>
                        {cityAndStateNews.map((news) => (
                            <Link key={news.id} href={`/post/${news.id}`} className={styles.leftColumnCard}>
                                <img src={news.image} alt={news.title} className={styles.leftColumnCardImage} />
                                <h3 className={styles.leftColumnCardTitle}>{news.title}</h3>
                            </Link>
                        ))}
                    </aside>

                    {/* Main Content */}
                    <section className={styles.mainContent}>
                        {newsData.length > 0 && (
                            <div className={styles.featuredNews}>
                                <Link href={`/post/${newsData[0].id}`}>
                                    <img src={newsData[0]?.image || '/fallback-image.jpg'} alt={newsData[0]?.title || 'News'} className={styles.featuredImage} />
                                    <h1>{newsData[0]?.title || 'No Title Available'}</h1>
                                </Link>
                            </div>
                        )}

                        <div className={styles.newsList}>
                            {newsData.slice(1, 50).map((post) => (
                                <PostCard 
                                    key={post.id} 
                                    id={post.id} 
                                    title={post.title} 
                                    image={post.image} 
                                    category={post.category} 
                                    categoryLink={`/category/${post.category}`} 
                                    date={post.publishedAt}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Right Sidebar with Google AdSense Ad */}
                    <aside className={styles.rightColumn}>
                        {/* Google AdSense 300x250 Ad */}
                        <div className={styles.adContainer}>
                            <ins className="adsbygoogle"
                                style={{ display: "block", width: "300px", height: "250px" }}
                                data-ad-client="ca-pub-6466761575770733"
                                data-ad-slot="2480605015"
                                data-ad-format="auto"
                                data-full-width-responsive="true">
                            </ins>
                        </div>

                        <h2>Trending</h2>
                        <div className={styles.newsList}>
                            {newsData.slice(4, 7).map((post) => (
                                <PostCard 
                                    key={post.id} 
                                    id={post.id} 
                                    title={post.title} 
                                    image={post.image} 
                                    category={post.category} 
                                    categoryLink={`/category/${post.category}`} 
                                    date={post.publishedAt}
                                />
                            ))}
                        </div>
                    </aside>
                </main>
            </div>
            
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    try {
        const response = await fetch('https://khabar24live.com/wp-json/wp/v2/posts?_embed&per_page=63');
        if (!response.ok) throw new Error('Failed to fetch news');

        const data = await response.json();
        console.log("API Response:", data);

        if (!Array.isArray(data)) throw new Error('Invalid data format');

        const decodeEntities = (str) => {
            if (!str) return "";
            return str.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
                      .replace(/&amp;/g, "&")
                      .replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">");
        };

        const formattedNews = data.map(post => ({
            id: post.id,
            title: decodeEntities(post.title.rendered) || "No Title",
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback-image.jpg',
            publishedAt: new Date(post.date).toLocaleString('hi-IN', { dateStyle: 'medium', timeStyle: 'short' }),
            category: post._embedded?.['wp:term']?.[0]?.[0]?.name || "अन्य"
        }));

        console.log("Formatted News Data:", formattedNews);

        return { props: { newsData: formattedNews } };
    } catch (error) {
        console.error("Error fetching news:", error);
        return { props: { newsData: [] } };
    }
}
