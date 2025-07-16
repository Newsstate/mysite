import Link from 'next/link';
import createSlug from '@/utils/createSlug';
import styles from '@/styles/Home.module.css';
import BigNewsCard from '@/components/BigNewsCard';
import NewsList from '@/components/NewsList';

const MainContent = ({ newsData }) => {
  return (
    <section className={styles.mainContent}>
      {newsData.length > 10 && (
        <div className={styles.featuredNews}>
          <BigNewsCard news={newsData[0]} />
        </div>
      )}
      <NewsList newsData={newsData} />
    </section>
  );
};

export default MainContent;
