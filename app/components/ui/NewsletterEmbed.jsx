"use client";

import { useEffect, useState } from "react";

const NewsletterEmbed = ({ mobile = false, theme = "light" }) => {
  const [pageUrl, setPageUrl] = useState("");
  // Only mount the iframe on desktop. Hiding it with CSS still downloads it on
  // phones, which hurts the mobile performance/SEO score.
  const [isDesktop, setIsDesktop] = useState(false);

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

  // The mobile variant is retired; the desktop variant is desktop-only.
  if (mobile || !isDesktop) return null;

  const src = `https://scaleengineer.com/embed/subscribe?theme=${theme}&utm_campaign=dsa_visualizer&utm_source=${pageUrl}`;
  const height = 360;

  return (
    <div className="max-w-full">
      <div className="max-w-full mb-4">
        <iframe
          src={src}
          width="100%"
          height={height}
          className="border border-black border-dashed rounded-none overflow-hidden"
          title="Newsletter Subscribe"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default NewsletterEmbed;
