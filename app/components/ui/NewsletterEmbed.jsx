"use client";

import { useEffect, useState } from "react";

const NewsletterEmbed = ({ mobile = false, theme = "light" }) => {
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(encodeURIComponent(window.location.href));
  }, []);

  const src = `https://scaleengineer.com/embed/subscribe?theme=${theme}&utm_campaign=dsa_visualizer&utm_source=${pageUrl}`;
  const wrapperClasses = mobile
    ? "block md:hidden w-full"
    : "max-w-full hidden md:block";
  const height = mobile ? 340 : 360;

  return (
    <div className={wrapperClasses}>
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
