import Head from "next/head";
import Script from "next/script";  
import "@/styles/global.css";  
import "@/styles/Header.module.css";  
import "@/styles/NewsCard.module.css";  

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/logo.png" type="image/x-icon" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
            </Head>

            

            <Component {...pageProps} />
        </>
    );
}
