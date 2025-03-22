import Link from "next/link";
import styles from "@/styles/NewsCard.module.css";

// Function to generate a slug from a Hindi title
const generateSlug = (title, id) => {
    const slug = title
        .normalize("NFD") // Normalize Hindi characters
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^a-zA-Z0-9\u0900-\u097F\s]/g, "") // Keep Hindi & English letters, numbers, and spaces
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .toLowerCase();
    
    return `${slug}-${id}`;
};

const NewsCard = ({ title, excerpt, image, id }) => {
    const slug = generateSlug(title, id);

    return (
        <Link href={`/post/${slug}`} className={styles.card}>
            <div>
                <img src={image} alt={title} className={styles.image} />
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.excerpt}>{excerpt}</p>
            </div>
        </Link>
    );
};

export default NewsCard;
