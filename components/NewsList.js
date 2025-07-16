import PostCard from '@/components/PostCard';
import styles from '@/styles/Home.module.css';
import createSlug from '@/utils/createSlug';

const NewsList = ({ newsData }) => {
    return (
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
    );
};

export default NewsList;
