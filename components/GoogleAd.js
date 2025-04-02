import { useEffect } from "react";

const GoogleAd = ({ adSlot, adFormat = "auto", adStyle = {} }) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center", ...adStyle }}
      data-ad-client="ca-pub-6466761575770733"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
    />
  );
};

export default GoogleAd;
