// components/AdComponent.js
import { useEffect } from 'react';

const AdComponent = ({ adSlot }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: 'block', width: '300px', height: '250px' }}
            data-ad-client="ca-pub-6466761575770733"
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
    );
};

export default AdComponent;
