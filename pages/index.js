import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import styles from '@/styles/Home.module.css';
import Script from 'next/script';
import sanitizeTitle from '@/utils/sanitizeTitle';
import sanitizeExcerpt from '@/utils/sanitizeExcerpt'; // Import करें

export default function Home({ newsData = [] }) {
  useEffect(() => {
    // Load the AdSense script dynamically
    const adsbygoogleScript = document.createElement("script");
    adsbygoogleScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    adsbygoogleScript.async = true;
    adsbygoogleScript.dataset.adClient = "ca-pub-6466761575770733"; // Replace with your actual client ID
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

  // Number of posts to display
  const numberOfPostsToDisplay = 82;

  // विज्ञापन कोड
  const adCode = `
    <div className={${JSON.stringify(styles.adContainer)}}>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6466761575770733"
        crossorigin="anonymous"></script>
      <ins class="adsbygoogle"
        style="display:inline-block;width:300px;height:250px"
        data-ad-client="ca-pub-6466761575770733"
        data-ad-slot="7528468784"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  `;

  const postsWithAds = [];
  let postCounter = 0;
  let adInterval = Math.floor(Math.random() * 0) + 4; // विज्ञापन दिखाने का यादृच्छिक अंतराल (3 से 5 पोस्ट के बाद)

  for (const post of newsData.slice(0, numberOfPostsToDisplay)) {
    postsWithAds.push(
      <div key={post.id} className={styles.latestPostItem}>
        <Link href={`/post/${post.slug}-${post.id}`}>
          <span className={styles.latestPostCategory}>{post.category}</span>
          <h2 className={styles.latestPostTitle}>{post.title}</h2>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className={styles.latestPostImage}
            />
          )}
          <p className={styles.latestPostDate}>{post.publishedAt}</p>
          {post.excerpt && (
            <p className={styles.latestPostExcerpt}>{post.excerpt}</p>
          )}
          {/* Display other post details as needed */}
        </Link>
      </div>
    );

    postCounter++;
    if (postCounter % adInterval === 0 && postCounter < numberOfPostsToDisplay) {
      postsWithAds.push(<div key={`ad-${postCounter}`} dangerouslySetInnerHTML={{ __html: adCode }} />);
      // विज्ञापन दिखाने के बाद अगला यादृच्छिक अंतराल निर्धारित करें
      adInterval = Math.floor(Math.random() * 0) + 30;
    }
  }

  return (
    <>
      <Head>
        <title>Newsstate24 - Hindi News Highlights, aaj ke Taaja Khabar Hindi Mein - Newsstate24.com</title>
        <meta name="description" content="Newsstate24.com (न्यूज़ स्टेट 24) हिंदी में नवीनतम और सबसे सटीक समाचार अपडेट के लिए आपकी वन-stop डेस्टिनेशन है।" />
        <meta property="og:title" content="Newsstate24 - Hindi News Highlights" />
        <meta property="og:image" content="https://Newsstate24.com/og-image.jpg" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.newsstate24.com/" />
      </Head>

      <Header />
      <Navbar />

      <div className={styles.container}>
        <main className={styles.contentArea}>
          {/* Main Content */}
          <section className={styles.mainContent}>
            <div className={styles.latestPostsList}>
              {postsWithAds}
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className={styles.rightColumn}>
            <div className={styles.widget}>
              <ins
                className="adsbygoogle"
                style={{ display: "inline-block", width: "300px", height: "250px" }}
                data-ad-client="ca-pub-6466761575770733" // Replace with your actual client ID
                data-ad-slot="YOUR_AD_SLOT" // Replace with your actual ad slot ID
              ></ins>
            </div>
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
      title: sanitizeTitle(decodeEntities(post.title.rendered)) || "No Title",
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback-image.jpg',
      publishedAt: new Date(post.date).toLocaleString('hi-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      category: post._embedded?.['wp:term']?.[0]?.[0]?.name || "अन्य",
      slug: post.slug,
      excerpt: sanitizeExcerpt(decodeEntities(post.excerpt.rendered)) || ""
    }));

    return {
      props: {
        newsData: formattedNews
      }
    };
  } catch (error) {
    return {
      props: {
        newsData: []
      }
    };
  }
}