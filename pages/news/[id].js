import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/Article.module.css';
import Header from '@/components/Header';

export default function ArticlePage() {
    const router = useRouter();
    const { id } = router.query;
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function fetchArticle() {
            try {
                const response = await fetch(`https://lalluram.com/wp-json/wp/v2/posts/${id}?_embed`);
                if (!response.ok) throw new Error('Failed to fetch article');

                const data = await response.json();
                setArticle({
                    title: data.title.rendered,
                    content: data.content.rendered,
                    image: data._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback-image.jpg',
                    date: new Date(data.date).toLocaleDateString(),
                    author: data._embedded?.author?.[0]?.name || 'Unknown',
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [id]);

    if (loading) return <p>Loading article...</p>;
    if (error) return <p className={styles.error}>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <Header />
            <article className={styles.article}>
                <h1 className={styles.title}>{article.title}</h1>
                <p className={styles.meta}>By {article.author} | {article.date}</p>
                <img src={article.image} alt={article.title} className={styles.image} />
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>
        </div>
    );
}
