import { useState } from 'react'; // Import useState at the top
import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import AdComponent from '@/components/AdComponent';
import styles from '@/styles/Home.module.css';


export default function Home({ newsData = [] }) {
    // Filter posts for the left sidebar
    const cityAndStateNews = newsData.filter(news => news.category === "शहर और राज्य").slice(0, 10 );
	 const cricket = newsData.filter(news => news.category === "क्रिकेट").slice(0, 4 );
	 const vrattyohar = newsData.filter(news => news.category === "आस्था").slice(0, 4 );
	 const national = newsData.filter(news => news.category === "देश").slice(0, 10 );
    // Function to create slugs from titles
    const createSlug = (title) => {
        return encodeURIComponent(title.trim().replace(/\s+/g, '-'));
    };

    return (
        <>
            <Head>
                <title>Hindi Latest News Highlights - Newsstate24</title>
                <meta name="description" content="Stay updated with the latest news on Newsstate24." />
                <meta property="og:title" content="Newsstate24 - Latest News" />
                <meta property="og:image" content="https://Newsstate24.com/og-image.jpg" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6466761575770733" crossOrigin="anonymous"></script>
				  {/* Canonical URL */}
                <link rel="canonical" href="https://www.newsstate24.com/" />

                {/* Language Declaration */}
                <html lang="hi" />
				 <meta name="robots" content="index, follow" />
				 
		   </Head>
            
            <Header />
            <Navbar />
            
            <div className={styles.container}>
                <main className={styles.contentArea}>
                    {/* Left Sidebar */}
                    <aside className={styles.leftColumn}>
    <h2>शहर और राज्य</h2>
    {cityAndStateNews.map((news) => {
        const postSlug = `/post/${createSlug(news.title)}-${news.id}`;
        return (
           <Link key={news.id} href={postSlug} className={styles.leftColumnCard}>
    <img src={news.image} alt={news.title} className={styles.leftColumnCardImage} />
    <div className={styles.leftColumnCardContent}>
        <h3 className={styles.leftColumnCardTitle}>{news.title}</h3>
        <div className={styles.metaInfo}>
            <span className={styles.postDate}>{news.publishedAt}</span>
            <span className={styles.categoryLabel}>{news.category}</span>
        </div>
    </div>
</Link>
	
        );
    })}
</aside>

                    {/* Main Content */}
					
                    <section className={styles.mainContent}>
                        {newsData.length > 0 && (
                            <div className={styles.featuredNews}>
                                {(() => {
                                    const postSlug = `/post/${createSlug(newsData[0].title)}-${newsData[0].id}`;
                                    return (
                                        <Link href={postSlug}>
                                            <img src={newsData[0]?.image || '/fallback-image.jpg'} alt={newsData[0]?.title || 'News'} className={styles.featuredImage} />
                                            <h1>{newsData[0]?.title || 'No Title Available'}</h1>
                                        </Link>
                                    );
                                })()}
                            </div>
                        )}

                        <div className={styles.newsList}>
                            {newsData.slice(1,7).map((post) => (
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
						<h2>देश</h2>
{national.length > 0, 10 ? (
    national.map((news) => {
        const postSlug = `/post/${createSlug(news.title)}-${news.id}`;
        return (
            <Link key={news.id} href={postSlug} className={styles.leftColumnCard}>
                <img src={news.image} alt={news.title} className={styles.leftColumnCardImage} />
                <div className={styles.leftColumnCardContent}>
                    <h3 className={styles.leftColumnCardTitle}>{news.title}</h3>
                    <div className={styles.metaInfo}>
                        <span className={styles.postDate}>{news.publishedAt}</span>
                        <span className={styles.categoryLabel}>{news.category}</span>
                    </div>
                </div>
            </Link>
        );
    })
) : (
    <p>कोई खबर उपलब्ध नहीं है।</p>
)}
                    </section>

                    {/* Right Sidebar */}
                    <aside className={styles.rightColumn}>
                        <div className={styles.widget}>
                            <ins className="adsbygoogle"
                                style={{ display: "inline-block", width: "300px", height: "250px" }}
                                data-ad-client="ca-pub-6466761575770733"
                                data-ad-slot="2480605015">
                            </ins>
                        </div>

                        <h2>ट्रेंडिंग</h2>
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
<h2>आस्था</h2>
										{vrattyohar.map((news) => {
											const postSlug = `/post/${createSlug(news.title)}-${news.id}`;
													return (
														<Link key={news.id} href={postSlug} className={styles.leftColumnCard}>
    <img src={news.image} alt={news.title} className={styles.leftColumnCardImage} />
    <div className={styles.leftColumnCardContent}>
        <h3 className={styles.leftColumnCardTitle}>{news.title}</h3>
        <div className={styles.metaInfo}>
            <span className={styles.postDate}>{news.publishedAt}</span>
            <span className={styles.categoryLabel}>{news.category}</span>
        </div>
    </div>
</Link>
														);
										}		)}
										
										
										
                        {/* Google AdSense Ad */}
                        
						<div className={styles.widget}>
                           
                        </div>
                    </aside>
                </main>
            </div>
            
			<div className={styles.container}>
                <main className={styles.contentArea}>
                    {/* Left Sidebar */}
                    <aside className={styles.leftColumn}>
                       
						 <h2>क्रिकेट</h2>
										{cricket.map((news) => {
											const postSlug = `/post/${createSlug(news.title)}-${news.id}`;
													return (
														<Link href={`/post/${createSlug(news.title)}-${news.id}`} className={styles.leftColumnCard}>
    <img src={news.image} alt={news.title} className={styles.leftColumnCardImage} />
    <div className={styles.leftColumnCardContent}>
        <h3 className={styles.leftColumnCardTitle}>{news.title}</h3>
        <div className={styles.metaInfo}>
            <span className={styles.postDate}>{news.publishedAt}</span>
            <span className={styles.categoryLabel}>{news.category}</span>
        </div>
    </div>
</Link>

														);
										}		)}
                    </aside>

                    {/* Main Content */}
								
                     <section className={styles.mainContent}>
                        {newsData.length > 0 && (
                            <div className={styles.featuredNews}>
                                {(() => {
                                    const postSlug = `/post/${createSlug(newsData[0].title)}-${newsData[0].id}`;
                                    return (
                                        <Link href={postSlug}>
                                            <img src={newsData[0]?.image || '/fallback-image.jpg'} alt={newsData[0]?.title || 'News'} className={styles.featuredImage} />
                                            <h1>{newsData[0]?.title || 'No Title Available'}</h1>
                                        </Link>
                                    );
                                })()}
                            </div>
                        )}

                        <div className={styles.newsList}>
                            {newsData.slice(0, 10).map((post) => (
                                <PostCard 
                                       key={post.id} 
										id={post.id} 
										title={post.title} 
										image={post.image} 
										category={post.category} 
										categorySlug={post.categorySlug} // Pass category slug
										categoryLink={`/category/${createSlug(post.category)}`} 
										date={post.publishedAt}
										selectedCategorySlug={"lifestyle"} // Add selected category filter
                                />
                            ))}
                        </div>
						
                        </section>

                    {/* Right Sidebar */}
					
                    <aside className={styles.rightColumn}>
                        <div className={styles.widget}>
                            <ins className="adsbygoogle"
                                style={{ display: "inline-block", width: "300px", height: "250px" }}
                                data-ad-client="ca-pub-6466761575770733"
                                data-ad-slot="2480605015">
                            </ins>
                        </div>

                        <h2>Trending</h2>
                        <div className={styles.newsList}>
                            {newsData.slice(3, 6).map((post) => (
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

        return { props: { newsData: formattedNews } };
    } catch (error) {
        console.error("Error fetching news:", error);
        return { props: { newsData: [] } };
    }
}
