import Link from 'next/link';
import createSlug from '@/utils/createSlug';
import styles from '@/styles/Home.module.css';

const CategoryNewsList = ({ title, newsList }) => {
  return (
    <div>
      <div className={styles.categorytop}><p>{title}</p></div>
      {newsList.map((news) => (
        <Link key={news.id} href={`/post/${createSlug(news.title)}-${news.id}`} className={styles.leftColumnCard}>
          <img src={news.image} alt={news.title} className={styles.leftColumnCardImage} />
          <div className={styles.leftColumnCardContent}>
            <h3 className={styles.leftColumnCardTitle}>{news.title}</h3>
            <div className={styles.metaInfo}>
              <span className={styles.postDate}>{news.publishedAt}</span>
              <span className={styles.categoryLabel}>{news.category}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryNewsList;
