import Header from '@/components/Header';
import styles from '@/styles/Page.module.css';

export default function Contact() {
    return (
        <div className={styles.container}>
            <Header />
            <h1>Contact Us</h1>
            <p>Email: support@newsstate24.com</p>
            <p>Phone: +91-1234567890</p>
        </div>
    );
}
