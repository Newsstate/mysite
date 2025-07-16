import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NewsCard from '@/components/NewsCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import categoryStyles from '@/styles/Category.module.css';

export default function CategoryPage({ categoryId, categoryName }) {
    const router = useRouter();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryId) {
            fetchNews();
        }
    }, [categoryId]);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/getNews?categoryId=${categoryId}`);
            const data = await res.json();

            // Debugging: Check what data is being received
            console.log("Fetched News Data:", data);

            // Ensure that the image field is correctly mapped
            const formattedNews = data.map(item => ({
                id: item.id,
                title: item.title?.rendered || "No Title", // Extract rendered title
                excerpt: item.excerpt?.rendered || "No summary available.", // Extract rendered excerpt
                image: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/fallback-image.jpg" // Fix image loading
            }));

            setNews(formattedNews);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    if (router.isFallback) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Head>
                <title>{categoryName} News - Newsstate24</title>
                <meta name="description" content={`Latest ${categoryName} news updates on Khabar24live.`} />
            </Head>

            <Header />
            <Navbar />

            <div className={categoryStyles.categoryContainer}>
                <h1 className={categoryStyles.categoryTitle}>{categoryName} News</h1>

                <main className={categoryStyles.mainContent}>
                    {loading ? (
                        <p className={categoryStyles.loadingMessage}>Loading news...</p>
                    ) : news.length > 0 ? (
                        <div className={categoryStyles.categoryNewsGrid}>
                            {news.map((newsItem) => (
                                <NewsCard key={newsItem.id} {...newsItem} />
                            ))}
                        </div>
                    ) : (
                        <p className={categoryStyles.noNewsMessage}>No news available for this category.</p>
                    )}
                </main>
            </div>

            <Footer />
        </>
    );
}

// Fetch category details for dynamic routing
export async function getServerSideProps({ params }) {
    try {
        const { slug } = params;

        // Fetch category details
        const categoryRes = await fetch(`https://www.lalluram.com/wp-json/wp/v2/categories?per_page=100&hide_empty=false`);
        if (!categoryRes.ok) throw new Error('Failed to fetch categories');

        const categories = await categoryRes.json();
        const selectedCategory = categories.find(cat => cat.slug === slug);

        if (!selectedCategory) return { notFound: true };

        return {
            props: { 
                categoryId: selectedCategory.id, 
                categoryName: selectedCategory.name 
            },
        };
    } catch (error) {
        console.error('Error Fetching Category:', error);
        return { props: { categoryId: null, categoryName: 'Unknown' } };
    }
}
