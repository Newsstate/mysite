import { useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaRss } from "react-icons/fa";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  
  useEffect(() => {
    window.atOptions = {
      key: "858b1cafc16ff2f2a9d7c019966229ea",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
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
            <Link href="https://www.facebook.com/hindinewsliveupdates/" target="_blank"><FaFacebook className={styles.icon} /></Link>
            <Link href="https://x.com/newsstate244" target="_blank"><FaTwitter className={styles.icon} /></Link>
            <Link href="https://www.facebook.com/hindicover" target="_blank"><FaInstagram className={styles.icon} /></Link>
            <Link href="https://newsstate24.com/api/sitemap.xml" target="_blank"><FaRss className={styles.icon} /></Link>
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

     
      
     

      {/* Load the Ad Script Correctly */}
       <div className={styles.mobileAdContainer}>
      <Script 
        strategy="lazyOnload"
        src="//www.highperformanceformat.com/858b1cafc16ff2f2a9d7c019966229ea/invoke.js"
      /></div>
    </footer>
  );
}
