import Link from 'next/link';
import styles from '@/styles/PostCard.module.css';

// Utility function to create a slug from the Hindi title
const createSlug = (title) => {
    return encodeURIComponent(title.replace(/\s+/g, '-')); // Convert spaces to hyphens and encode URL
};

const PostCard = ({ id, title, image, category, categoryLink, tags = [], date }) => {
    console.log("PostCard Received Data:", { id, title, image, category, categoryLink, tags, date });

    const postSlug = `/post/${createSlug(title)}-${id}`; 

    return (
        <div className={styles.postCard}>
            <Link href={postSlug} passHref>
                <img src={image} alt={title} className={styles.postImage} style={{ cursor: 'pointer' }} />
            </Link>

            <div className={styles.postContent}>
                <div className={styles.postMeta}>
                    <Link href={categoryLink} className={styles.category}>
                        {category}
                    </Link>
                    <span className={styles.date}>{date}</span>
                </div>

                <h2 className={styles.postTitle}>
                    <Link href={postSlug} passHref legacyBehavior>
                        <a>{title}</a>
                    </Link>
                </h2>

                {tags.length > 0 && (
                    <div className={styles.tags}>
                        {tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


const PostList = ({ posts = [] }) => {  // Ensure posts is always an array
    return (
        <div className={styles.postList}>
            {posts.slice(0, 60).map((post) => (
                <PostCard key={post.id} {...post} />
            ))}
        </div>
    );
};

export default PostList;
