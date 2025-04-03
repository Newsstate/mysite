import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import styles from '@/styles/Home.module.css';
import Script from 'next/script';
import BigNewsCard from "@/components/BigNewsCard.js";
import CategoryNewsList from "@/components/CategoryNewsList.js";
import MainContent from '@/components/MainContent';
import NewsList from '@/components/NewsList.js';

export default function Home({ newsData = [] }) {
  useEffect(() => {
    // Load the AdSense script dynamically
    const adsbygoogleScript = document.createElement("script");
    adsbygoogleScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    adsbygoogleScript.async = true;
    adsbygoogleScript.dataset.adClient = "ca-pub-YOUR_AD_CLIENT"; // Replace with your actual client ID
    adsbygoogleScript.crossOrigin = "anonymous";
    document.body.appendChild(adsbygoogleScript);

    // Push ads if AdSense is already loaded or will be loaded
    const pushAdSense = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    };

    // If the script is already loaded, push the ads
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      pushAdSense();
    } else {
      // Wait for the script to load and then push the ads
      adsbygoogleScript.onload = pushAdSense;
    }
  }, []);

  // Filter posts (your existing code remains the same)
  const cityAndStateNews = newsData.filter(news => news.category === "शहर और राज्य").slice(0, 4);
  const big = newsData.filter(news => news.category === "शहर और राज्य").slice(0, 1);
  const cricket = newsData.filter(news => news.category === "क्रिकेट").slice(2, 7);
  const business = newsData.filter(news => news.category === "कारोबार").slice(0, 4);
  const auto = newsData.filter(news => news.category === "ऑटो").slice(0, 4);
  const vrattyohar = newsData.filter(news => news.category === "आस्था").slice(0, 8);
  const entertainment = newsData.filter(news => news.category === "मनोरंजन").slice(0, 10);

  // Function to create slugs from titles (your existing code remains the same)
  const createSlug = (title) => encodeURIComponent(title.trim().replace(/\s+/g, '-'));

  return (
    <>
      <Head>
        <title>Newsstate24 - Hindi News Highlights, aaj ke Taaja Khabar Hindi Mein - Newsstate24.com</title>
        <meta name="description" content="Newsstate24.com (न्यूज़ स्टेट 24) हिंदी में नवीनतम और सबसे सटीक समाचार अपडेट के लिए आपकी वन-स्टॉप डेस्टिनेशन है।" />
        <meta property="og:title" content="Newsstate24 - Hindi News Highlights" />
        <meta property="og:image" content="https://Newsstate24.com/og-image.jpg" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newsstate24.com/" />
      </Head>

      <Header />
      <Navbar />

      <div className={styles.container}>
        <main className={styles.contentArea}>
          {/* Left Sidebar */}
          <aside className={styles.leftColumn}>
            {big.map((news) => (
              <BigNewsCard key={news.id} news={news} />
            ))}
            <CategoryNewsList title="शहर और राज्य" newsList={cityAndStateNews} />
            <CategoryNewsList title="ऑटो" newsList={auto} />
          </aside>

          {/* Main Content */}
          "{<MainContent newsData={newsData} createSlug={createSlug} /> }"

          {/* Right Sidebar */}
          <aside className={styles.rightColumn}>
            <div className={styles.widget}>
              <ins
                className="adsbygoogle"
                style={{ display: "inline-block", width: "300px", height: "250px" }}
                data-ad-client="ca-pub-YOUR_AD_CLIENT" // Replace with your actual client ID
                data-ad-slot="YOUR_AD_SLOT" // Replace with your actual ad slot ID
              ></ins>
            </div>
            <div className={styles.categorytop}><p>ट्रेंडिंग</p></div>
            <div className={styles.newsList}>
              {newsData.slice(8, 16).map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  image={post.image}
                  category={"देश"}
                  categoryLink={`देश`}
                  date={post.publishedAt}
                />
              ))}
            </div>
          </aside>
        </main>
      </div>
      <div className={styles.container}>
        <main className={styles.contentArea}>
          <aside className={styles.leftColumn}>
            <CategoryNewsList title="कारोबार" newsList={business} />
            <CategoryNewsList title="क्रिकेट" newsList={cricket} />
          </aside>

          <section className={styles.mainContent}>
            <div className={styles.newsList}>
              <CategoryNewsList title="" newsList={cityAndStateNews} />
              {newsData.slice(10, 100).map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  image={post.image}
                  category={post.category}
                  categoryLink={`/category/${createSlug(post.category)}`}
                  date={post.publishedAt}
                />
              ))}
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className={styles.rightColumn}>
            <div className={styles.widget}>
              {/* Place Google Ad Here */}
              <ins
                className="adsbygoogle"
                style={{ display: "inline-block", width: "300px", height: "250px" }}
                data-ad-client="ca-pub-YOUR_AD_CLIENT" // Replace with your actual client ID
                data-ad-slot="ANOTHER_AD_SLOT" // Replace with another ad slot ID if needed
              ></ins>
            </div>
            <CategoryNewsList title="आस्था" newsList={vrattyohar} />
            {/* Google AdSense Ad */}
          </aside>
        </main>
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  // Your getServerSideProps function remains the same
  try {
    const response = await fetch('https://khabar24live.com/wp-json/wp/v2/posts?_embed&per_page=100');
    if (!response.ok) throw new Error('Failed to fetch news');

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid data format');

    const decodeEntities = (str) => str
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");

    const formattedNews = data.map(post => ({
      id: post.id,
      title: decodeEntities(post.title.rendered) || "No Title",
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback-image.jpg',
      publishedAt: new Date(post.date).toLocaleString('hi-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      category: post._embedded?.['wp:term']?.[0]?.[0]?.name || "अन्य"
    }));

    return { props: { newsData: formattedNews } };
  } catch (error) {
    return { props: { newsData: [] } };
  }
}