import Header from '@/components/Header';
import styles from '@/styles/Page.module.css';

export default function Categories() {
    return (
        <div className={styles.container}>
            <Header />
            <h1>Categories</h1>
            <p>Explore news categories like Politics, Sports, Technology, and more.</p>
        </div>
    );
}
