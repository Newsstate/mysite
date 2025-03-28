import Header from '@/components/Header';
import styles from '@/styles/Page.module.css';

export default function Categories() {
    return (
        <div className={styles.container}>
            <Header />
            <h1>Disclaimer</h1>
            <p>Disclaimer
The content on Newsstate.com is published for informational purposes only. While we strive to ensure that all information provided is accurate and up-to-date, we do not guarantee the completeness, accuracy, or reliability of any content on this website. Readers are advised to verify information independently before making any decisions based on the content.

General Disclaimed
No Liability: NewsState.com and its team are not responsible for any losses, damages, or consequences arising from the use of the content provided on this website.
Accuracy of Information: News and updates on this site are subject to change. While we endeavor to provide the most accurate and timely information, errors or omissions may occur.
Third-Party Links
This website may contain links to third-party websites for additional information or reference. We are not responsible for the content, accuracy, or policies of these external websites. Accessing third-party links is at the user’s discretion and risk.

Opinions and Editorial Content

The opinions expressed in articles, blogs, or editorials are those of the respective authors and do not necessarily reflect the views of NewsState.com or its management.

Content and Copyright
All content on NewsState.com is the intellectual property of the website unless otherwise stated. Unauthorized reproduction, distribution, or use of the content is prohibited.

User Responsibility
Readers are encouraged to use their discretion and judgment when consuming news or making decisions based on the content of this website.

By using NewsState.com, you agree to the terms of this disclaimer and acknowledge that the website holds no liability for any actions taken based on its content.</p>
        </div>
    );
}
