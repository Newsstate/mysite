import Head from 'next/head';
import styles from '@/styles/Author.module.css';

export default function KapilSharma() {
    // Static data for Kapil Sharma
    const author = {
        name: "Kapil Sharma",
        bio: "कपिल शर्मा डिजिटल मीडिया मैनेजमेंट के क्षेत्र में एक मजबूत स्तंभ हैं और मल्टीमीडिया जर्नलिस्ट के तौर पर काम करते हैं। उन्होंने माखनलाल चतुर्वेदी राष्ट्रीय पत्रकारिता एवं संचार विश्वविद्यालय, भोपाल से पत्रकारिता में मास्टर्स (पीजी) किया है। मीडिया इंडस्ट्री में डेस्क और ग्राउंड रिपोर्टिंग दोनों में उन्हें चार साल का अनुभव है। अगस्त 2023 से वे जागरण न्यू मीडिया और नईदुनिया I की डिजिटल टीम का हिस्सा हैं। इससे पहले वे अमर उजाला में भी अपनी सेवाएं दे चुके हैं। कपिल को लिंक्डइन पर फॉलो करें .",
        photo: "/kapil-sharma.jpg", // Ensure image is placed in the public folder
        socialMedia: {
            linkedin: "https://www.linkedin.com/in/kapil-sharma-056a591bb",
            twitter: "https://twitter.com/kapilsharma",
            instagram: "https://instagram.com/kapilsharma",
        }
    };

    return (
        <>
            <Head>
                <title>{author.name} - Author</title>
                <meta name="description" content={`Learn more about ${author.name}`} />
                {/* Add fontawesome link for icons */}
                <link 
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" 
                    rel="stylesheet" 
                />
            </Head>

            <div className={styles.container}>
                <div className={styles.profileCard}>
                    <img src={author.photo} alt={author.name} className={styles.photo} />
                    <h1 className={styles.title}>{author.name}</h1>
                    <p className={styles.bio}>{author.bio}</p>
                    
                    {/* Social Media Links */}
                    <div className={styles.socialMedia}>
                        <a href={author.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href={author.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href={author.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
