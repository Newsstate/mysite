import { useEffect } from "react";
import Script from "next/script";

export default function GoogleAd({ adSlot, width, height }) {
  useEffect(() => {
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <>
      {/* Load Google Ads script once (globally) */}
      <Script
        strategy="lazyOnload"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6466761575770733"
        crossOrigin="anonymous"
      />

      {/* Ad container */}
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: `${width}px`, height: `${height}px` }}
        data-ad-client="ca-pub-6466761575770733"
        data-ad-slot={adSlot}
      ></ins>
    </>
  );
}
