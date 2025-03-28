import Link from "next/link";
import styles from "@/styles/NewsCard.module.css";

// Function to generate a slug from a Hindi title
const generateSlug = (title, id) => {
    if (!title || typeof title !== "string") return `news-${id}`;
    return title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\u0900-\u097F\s]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase() + `-${id}`;
};

// ✅ Prevent SSR error by checking if window exists
const decodeEntities = (str) => {
    if (!str) return "";
    if (typeof window === "undefined") return str; // ✅ Prevent SSR crash

    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
};

// ✅ Clean excerpt and remove "Read More"
const cleanExcerpt = (html) => {
    if (!html) return "No summary available.";

    let text = decodeEntities(html.replace(/<[^>]+>/g, "").trim());

    // ✅ Remove "Read More", "Continue reading", or similar phrases
    text = text.replace(/(Read More|Continue reading|Click here to read more|और पढ़ें).*/i, "").trim();

    return text;
};

const NewsCard = ({ title, excerpt, image, id, categories = [] }) => {
    const safeTitle = title?.rendered ?? title ?? "No Title";

    // ✅ Ensure excerpt is properly retrieved & sanitized
    const safeExcerpt = excerpt?.rendered
        ? cleanExcerpt(excerpt.rendered) 
        : typeof excerpt === "string"
        ? cleanExcerpt(excerpt) 
        : "No summary available."; 

    const imageUrl = image?.startsWith("http") ? image : "/fallback-image.jpg";
    const slug = generateSlug(safeTitle, id);

    return (
        <div className={styles.card}>
            <Link href={`/post/${slug}`} className={styles.cardLink}>
                <div>
                    {/* ✅ Category Label (Above Title) */}
                    {categories.length > 0 && (
                        <div className={styles.categoryLabel}>
                            <span>{categories[0].name}</span>
                        </div>
                    )}

                    <img src={imageUrl} alt={safeTitle} className={styles.image} loading="lazy" />
                    <h2 className={styles.title}>{safeTitle}</h2>
                    <p className={styles.excerpt}>{safeExcerpt}</p>
                </div>
            </Link>

            {/* ✅ Keep Read More Button */}
            <Link href={`/post/${slug}`} className={styles.readMore}>
                Read More →
            </Link>
        </div>
    );
};

export default NewsCard;
