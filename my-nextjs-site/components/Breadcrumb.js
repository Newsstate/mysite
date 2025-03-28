import React from "react";
import Link from "next/link";
import styles from "@/styles/Breadcrumb.module.css";

const Breadcrumb = ({ breadcrumbs }) => {
    // Generate breadcrumb schema.org JSON-LD structured data
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": breadcrumb.name,
            "item": breadcrumb.url,
        })),
    };

    return (
        <div className={styles.breadcrumbContainer}>
            {/* Injecting structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Display breadcrumb navigation */}
            <nav aria-label="breadcrumb">
                <ul className={styles.breadcrumbList}>
                    {breadcrumbs.map((breadcrumb, index) => (
                        <li key={index} className={styles.breadcrumbItem}>
                            {index < breadcrumbs.length - 1 ? (
                                <Link href={breadcrumb.url}>{breadcrumb.name}</Link>
                            ) : (
                                <span className={styles.current}>{breadcrumb.name}</span>
                            )}
                            {index < breadcrumbs.length - 1 && <span className={styles.separator}> &gt; </span>}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Breadcrumb;
