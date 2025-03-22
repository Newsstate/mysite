import '@/styles/global.css'; 
import "@/styles/Header.module.css";   // ✅ Move global imports here
import "@/styles/NewsCard.module.css"; // ✅ Move global imports here

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
