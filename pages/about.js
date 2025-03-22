import Header from '@/components/Header';
import styles from '@/styles/Page.module.css';

export default function About() {
    return (
        <div className={styles.container}>
            <Header />
            <h1>About Us</h1>
            <p>NewsState24 is a trusted platform delivering the latest news with accuracy and speed.</p>
        </div>
    );
}
