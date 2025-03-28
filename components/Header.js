import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi"; // ✅ Import icons
import styles from "@/styles/Header.module.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.header}>
            {/* Logo & Toggle Button */}
            <div className={styles.topBar}>
                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logoLink}>
                        <Image 
                            src="/site-logo.png" 
                            alt="newsstate24 Logo" 
                            width={150} 
                            height={50} 
                            priority 
                        />
                    </Link>
                </div>
                
                {/* Toggle Button */}
                <button className={styles.menuToggle} onClick={toggleMenu} aria-label="Toggle Menu">
                    {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
                <ul>
                    <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
                    <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                    <li><Link href="/disclaimer" onClick={() => setMenuOpen(false)}>Disclaimer</Link></li>
                    <li><Link href="/privacy" onClick={() => setMenuOpen(false)}>Privacy</Link></li>
                </ul>
            </nav>
        </header>
    );
}
