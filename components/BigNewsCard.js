import Link from 'next/link';
import createSlug from '@/utils/createSlug';
import styles from '@/styles/Home.module.css';

const BigNewsCard = ({ news }) => {
  return (
    <Link
      key={news.id}
      href={`/post/${createSlug(news.title)}-${news.id}`}
      className={styles.leftColumnCardbig}
    >
      <img
        src={news.image}
        alt={news.title}
        className={styles.leftColumnCardbigImage}
      />
      <div className={styles.leftColumnCardContentbig}>
        <h3 className={styles.leftColumnCardTitlebig}>{news.title}</h3>
        <div className={styles.metaInfo}>
          <span className={styles.postDate}>{news.publishedAt}</span>
          <span className={styles.categoryLabel}>{news.category}</span>
        </div>
      </div>
    </Link>
  );
};

export default BigNewsCard;