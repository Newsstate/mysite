import Link from 'next/link';
import styles from '@/styles/PostCard.module.css';

// Function to create a slug from the title
const createSlug = (title) => {
    return encodeURIComponent(title.trim().replace(/\s+/g, '-')); // Convert spaces to hyphens
};

const PostCard = ({ id, title, image, category, categoryLink, date }) => {
    if (!id || !title) return null; // Prevent rendering if data is missing

    const postSlug = `/post/${createSlug(title)}-${id}`; // Example: /post/your-news-title-12345

    return (
        <div className={styles.postCard}>
            {/* Clickable Image */}
            <Link href={postSlug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image || '/fallback-image.jpg'} alt={title} className={styles.postImage} />
            </Link>

            <div className={styles.postContent}>
                <div className={styles.postMeta}>
                    <Link href={categoryLink || "#"} className={styles.category}>
                        {category || "अन्य"}
                    </Link>
                    <span className={styles.date}>{date || "No Date"}</span>
                </div>

                {/* Clickable Title */}
                <h2 className={styles.postTitle}>
                    <Link href={postSlug}>
                        {title}
                    </Link>
                </h2>
            </div>
        </div>
    );
};

export default PostCard;
