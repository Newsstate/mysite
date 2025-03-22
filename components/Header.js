import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.siteTitle}>
                <h1>NewsState24</h1>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/categories">Categories</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}
