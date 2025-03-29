import styles from '@/styles/NewsCarousel.module.css';
import NewsCard from '@/components/NewsCard';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NewsCarousel = ({ newsItems }) => {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <button className={styles.navButton} onClick={scrollLeft}><ChevronLeft /></button>
            <div className={styles.carousel} ref={carouselRef}>
                {newsItems.map(news => (
                    <div key={news.id} className={styles.carouselItem}>
                        <NewsCard {...news} />
                    </div>
                ))}
            </div>
            <button className={styles.navButton} onClick={scrollRight}><ChevronRight /></button>
        </div>
    );
};

export default NewsCarousel;
