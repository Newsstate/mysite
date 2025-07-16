import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '@/styles/Navbar.module.css'; // Ensure CSS is imported

export default function Navbar() {
    const [categories, setCategories] = useState([]);

    // Manually added categories with full URLs
    const manualCategories = [
        { id: "a", name: "आस्था", slug: "vrat-tyohar", url: "https://www.www.newsstate24.com/category/vrat-tyohar" },
        { id: "b", name: "ऑटो", slug: "auto", url: "https://www.www.newsstate24.com/category/auto" },
        { id: "c", name: "कारोबार", slug: "business", url: "https://www.www.newsstate24.com/category/business" },
        { id: "d", name: "क्रिकेट", slug: "cricket", url: "https://www.newsstate24.com/category/cricket" },
        { id: "e", name: "टेक्नोलॉजी", slug: "technology", url: "https://www.newsstate24.com/category/technology" },
        { id: "f", name: "देश", slug: "national", url: "https://www.newsstate24.com/category/national" },
        { id: "g", name: "मनोरंजन", slug: "entertainment", url: "https://www.newsstate24.com/category/entertainment" },
        { id: "h", name: "लाइफस्टाइल", slug: "lifestyle", url: "https://www.newsstate24.com/category/lifestyle" },
        { id: "i", name: "लेटेस्ट", slug: "latest-news", url: "https://www.newsstate24.com/category/latest-news" },
        { id: "j", name: "शहर और राज्य", slug: "local", url: "https://www.newsstate24.com/category/local" },
        { id: "k", name: "शिक्षा", slug: "education", url: "https://www.newsstate24.com/category/education" },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <ul className={styles.navList}>
                    {/* Static Links */}
                    <li className={styles.navItem}>
                        <Link href="/" className={styles.navLink}>होम</Link>
                    </li>  
                    <li className={styles.navItem}>
                        <Link href="https://www.newsstate24.com/category/horoscope" className={styles.navLink} target="_blank">
                            आज का राशिफल
                        </Link>
                    </li>

                    {/* Manually Added Categories with Full URL */}
                    {manualCategories.map(category => (
                        <li key={category.id} className={styles.navItem}>
                            <Link href={category.url} className={styles.navLink} target="_blank">
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
