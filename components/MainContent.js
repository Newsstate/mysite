import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import PostCard from '@/components/PostCard';

const MainContent = ({ newsData, createSlug }) => {
    return (
        <section className={styles.mainContent}>
            {newsData.length > 10 && (
                <div className={styles.featuredNews}>
                    <Link href={`/post/${createSlug(newsData[0].title)}-${newsData[0].id}`}>
                        <img src={newsData[0]?.image || '/fallback-image.jpg'} alt={newsData[0]?.title || 'News'} className={styles.featuredImage} />
                        <p>{newsData[0]?.title || 'No Title Available'}</p>
                    </Link>
                </div>
             )}
             <div className={styles.newsList}>
                {newsData.slice(1, 10).map((post) => (
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
    );
};

export default MainContent;
