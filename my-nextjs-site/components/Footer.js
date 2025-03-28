// components/Footer.js

import styles from '@/styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()}  Khabar24live. All rights reserved.
                </p>
                <div className={styles.links}>
                    <a href="/about" className={styles.link}>About Us</a>
                    <a href="/contact" className={styles.link}>Contact</a>
		    <a href="/privacy" className={styles.link}>Privacy</a>              
                </div>
            </div>
        </footer>
    );
}
