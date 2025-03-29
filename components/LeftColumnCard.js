// components/LeftColumnCard.js
import styles from '@/styles/Home.module.css';

export default function LeftColumnCard({ title, image, link }) {
    return (
        <div className={styles.leftColumnCard}>
            <a href={link} target="_blank" rel="noopener noreferrer">
                <img src={image} alt={title} className={styles.leftColumnCardImage} />
                <h3 className={styles.leftColumnCardTitle}>{title}</h3>
            </a>
        </div>
    );
}
							