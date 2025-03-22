import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            {/* Website Title */}
            <div className={styles.siteTitle}>
                <h1>NewsState24</h1>
            </div>

            {/* Navigation Menu */}
            <nav className={styles.nav}>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}
