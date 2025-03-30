import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaRss } from "react-icons/fa";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6466761575770733";
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);

        script.onload = () => {
            if (window.adsbygoogle) {
                window.adsbygoogle.push({});
            }
        };
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Left Section: Logo and Social Links */}
                <div className={styles.section}>
                    <Image src="/site-logo.png" alt="News State 24" width={150} height={50} />
                    <p className={styles.description}>
                        Newsstate24.com पर पढ़ें ताज़ा और ब्रेकिंग हिंदी समाचार। भारत और दुनिया की राजनीति, खेल, बॉलीवुड, व्यापार, शहर, जीवनशैली, ज्योतिष, अध्यात्म, नौकरी और बहुत कुछ।
                    </p>
                    <div className={styles.socialIcons}>
                        <Link href="#" target="_blank"><FaFacebook className={styles.icon} /></Link>
                        <Link href="#" target="_blank"><FaTwitter className={styles.icon} /></Link>
                        <Link href="#" target="_blank"><FaInstagram className={styles.icon} /></Link>
                        <Link href="#" target="_blank"><FaRss className={styles.icon} /></Link>
                    </div>
                </div>
                
                {/* Middle Section: Important Links */}
                <div className={styles.section}>
                    <Link href="/Privacy" className={styles.button}>Privacy</Link>
                    <Link href="/about" className={styles.button}>About Us</Link>
                    <Link href="/contact" className={styles.button}>Contact Us</Link>
                    <Link href="/disclaimer" className={styles.button}>Disclaimer</Link>
                    <Link href="/rss" className={styles.button}>RSS Feed</Link>
                    <Link href="/api/sitemap.xml" className={styles.button}>Sitemap</Link>
                </div>
                
                {/* Right Section: Tag Cloud */}
                <div className={styles.section}>
                    <p>
                        <Link href="/category/horoscope">आज का राशिफल</Link> 
                        <Link href="/category/vrat-tyohar">आस्था</Link> 
                        <Link href="/category/auto">ऑटो</Link>
                    </p>
                    <p>
                        <Link href="/category/business">कारोबार</Link> 
                        <Link href="/category/cricket">क्रिकेट</Link> 
                        <Link href="/category/technology">टेक्नोलॉजी</Link> 
                        <Link href="/category/india">देश</Link>
                    </p>
                    <p>
                        <Link href="/category/entertainment">मनोरंजन</Link> 
                        <Link href="/category/lifestyle">लाइफस्टाइल</Link> 
                        <Link href="/category/articles">लेख</Link>
                    </p>
                    <p className={styles.highlight}>
                        <Link href="/category/local">शहर और राज्य</Link> 
                        <Link href="/category/education">शिक्षा</Link>
                    </p>
                </div>
            </div>

            {/* Floating Mobile Ad */}
            <div className={styles.mobileAdContainer}>
                <ins className="adsbygoogle"
                    style={{ display: 'inline-block', width: '320px', height: '50px' }}
                    data-ad-client="ca-pub-6466761575770733"
                    data-ad-slot="8246126457">
                </ins>
            </div>
        </footer>
    );
}
