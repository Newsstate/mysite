import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import styles from '@/styles/Home.module.css';
import GoogleAd from "@/components/GoogleAd";
import Script from 'next/script';
import BigNewsCard from "@/components/BigNewsCard.js";
import CategoryNewsList from "@/components/CategoryNewsList.js";
import MainContent from '@/components/MainContent';
import NewsList from '@/components/NewsList.js';


export default function Home({ newsData = [] }) {



    // Filter posts
    const cityAndStateNews = newsData.filter(news => news.category === "शहर और राज्य").slice(0, 4);
    const big = newsData.filter(news => news.category === "शहर और राज्य").slice(0, 1);
	const cricket = newsData.filter(news => news.category === "क्रिकेट").slice(2, 7);
    const business = newsData.filter(news => news.category === "कारोबार").slice(0, 4);
    const auto = newsData.filter(news => news.category === "ऑटो").slice(0, 2);
    const vrattyohar = newsData.filter(news => news.category === "आस्था").slice(0, 8);
	const entertainment = newsData.filter(news => news.category === "मनोरंजन").slice(0, 10);
	

    // Function to create slugs from titles
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
			
			
			
			
			{/*upper Main */}
            
			<div className={styles.container}>
                <main className={styles.contentArea}>
				
				
				
				 
			
				
				
				
				
                    {/* Left Sidebar */}
                    <aside className={styles.leftColumn}>{big.map((news) => (<BigNewsCard key={news.id} news={news} />
))}

                      
						
						<CategoryNewsList title="शहर और राज्य" newsList={cityAndStateNews} />
						<CategoryNewsList title="लाइफस्टाइल" newsList={cityAndStateNews} />
						

						
						
						
                      
              </aside>





                    {/* Main Content */}
						"{<MainContent newsData={newsData} createSlug={createSlug} /> }"
			

					

                    {/* Right Sidebar */}
                    <aside className={styles.rightColumn}>
                       <GoogleAd adSlot="2480605015" adFormat="rectangle" adStyle={{ width: "300", height: "250px" }} />
						
                        <div className={styles.categorytop}><p>देश</p></div>
                        <div className={styles.newsList}>
                            {newsData.slice(4, 8).map((post) => (
                                <PostCard 
                                    key={post.id} 
                                    id={post.id} 
                                    title={post.title} 
                                    image={post.image} 
                                    category={"देश"	} 
                                    categoryLink={`/category/${post.category}`} 
                                    date={post.publishedAt}
                                />
                            ))}
                        </div>
						 <GoogleAd adSlot="7528468784" adFormat="rectangle" adStyle={{ width: "300", height: "250px" }} />
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
                              <GoogleAd adSlot="5053362651" adFormat="rectangle" adStyle={{ width: "300px", height: "250px" }} />
                        </div>

						<CategoryNewsList title="मनोरंजन" newsList={entertainment} />
                      
						<CategoryNewsList title="आस्था" newsList={vrattyohar} />

                        {/* Google AdSense Ad */}
                        
						<div className={styles.widget}>
                            <ins className="adsbygoogle"
                                style={{ display: "inline-block", width: "300px", height: "250px" }}
                                data-ad-client="ca-pub-6466761575770733"
                                data-ad-slot="7528468784">
                            </ins>
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