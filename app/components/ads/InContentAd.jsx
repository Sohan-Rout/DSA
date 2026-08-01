"use client";
import { useEffect } from "react";

const AD_SCRIPT_ID = "adsbygoogle-js";
const AD_CLIENT = "ca-pub-4311738896428559";
const DEFAULT_SLOT = "1111111111";

function loadAdSenseScript() {
  if (typeof window === "undefined") return;
  if (document.getElementById(AD_SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = AD_SCRIPT_ID;
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

const InContentAd = ({ slot = DEFAULT_SLOT }) => {
  useEffect(() => {
    loadAdSenseScript();
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense error:", e);
    }
  }, []);

  return (
    <div className="my-8 flex flex-col items-center">
      <span className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default InContentAd;
