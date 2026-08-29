"use client";

import { useEffect, useRef, useState } from "react";

const EMBED_ORIGIN = "https://scaleengineer.com";
// Used until the embed reports its real height, and if the message never lands.
const FALLBACK_HEIGHT = 360;

const NewsletterEmbed = ({ mobile = false, theme = "light" }) => {
  const [pageUrl, setPageUrl] = useState("");
  // Only mount the iframe on desktop. Hiding it with CSS still downloads it on
  // phones, which hurts the mobile performance/SEO score.
  const [isDesktop, setIsDesktop] = useState(false);
  const [height, setHeight] = useState(FALLBACK_HEIGHT);
  const iframeRef = useRef(null);

  useEffect(() => {
    setPageUrl(encodeURIComponent(window.location.href));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // The embed posts its document height on load and on every resize. Growing
  // the iframe to match keeps the frame from getting its own scrollbar, which
  // looked broken next to the article on narrow viewports.
  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== EMBED_ORIGIN) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type !== "se-embed-resize") return;

      const reported = Number(event.data.height);
      if (Number.isFinite(reported) && reported > 0) {
        setHeight(Math.ceil(reported));
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [isDesktop]);

  // The mobile variant is retired; the desktop variant is desktop-only.
  if (mobile || !isDesktop) return null;

  const src = `${EMBED_ORIGIN}/embed/subscribe?theme=${theme}&utm_campaign=dsa_visualizer&utm_source=${pageUrl}`;

  return (
    <div className="max-w-full">
      <div className="max-w-full mb-4">
        <iframe
          ref={iframeRef}
          src={src}
          width="100%"
          scrolling="no"
          style={{ height: `${height}px` }}
          className="block w-full border border-black border-dashed rounded-none overflow-hidden"
          title="Newsletter Subscribe"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default NewsletterEmbed;
