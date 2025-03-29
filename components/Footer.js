import { useEffect, useState } from "react";
import styles from '@/styles/Footer.module.css';

export default function Footer() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error("AdSense error:", e);
            }
        }
    }, [isMobile]);

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Khabar24live. All rights reserved.
                    </p>
                    <div className={styles.links}>
                        <a href="/about" className={styles.link}>About Us</a>
                        <a href="/contact" className={styles.link}>Contact</a>
                        <a href="/privacy" className={styles.link}>Privacy</a>
                    </div>
                </div>
            </footer>

            {isMobile && (
                <div className={styles.mobileAd}>
                    <ins className="adsbygoogle"
                        style={{ display: "inline-block", width: "320px", height: "50px" }}
                        data-ad-client="ca-pub-6466761575770733"
                        data-ad-slot="8246126457">
                    </ins>
                </div>
            )}
        </>
    );
}
