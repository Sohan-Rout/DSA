"use client";
import { useEffect, useRef, useState } from "react";

const EMBED_ORIGIN = "https://scaleengineer.com";
// Used until the embed reports its real height, and if the message never lands.
const FALLBACK_HEIGHT = 350;

// `bordered` mirrors NewsletterEmbed: defaults to true so existing placements
// are untouched, opt out per usage.
// `eager` opts out of lazy loading. Inside the mobile carousel the iframe can
// be scrolled past while it is the inactive slide, and a lazy iframe that never
// intersected the viewport stays on about:blank — an empty dashed box.
const DailyDSAEmbed = ({
  mobile = false,
  theme = "light",
  bordered = true,
  eager = false,
}) => {
  const [height, setHeight] = useState(FALLBACK_HEIGHT);
  const iframeRef = useRef(null);

  const src = `${EMBED_ORIGIN}/embed/daily/dsa?theme=${theme}`;
  const wrapperClasses = mobile
    ? "block md:hidden w-full"
    : "max-w-full hidden md:block";

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
  }, []);

  return (
    <div className={wrapperClasses}>
      <div className="max-w-full mb-4">
        <iframe
          ref={iframeRef}
          src={src}
          width="100%"
          scrolling="no"
          style={{ height: `${height}px` }}
          className={`block w-full overflow-hidden ${
            bordered ? "rounded-none border border-dashed border-black" : "border-0"
          }`}
          title="Daily DSA Challenge"
          loading={eager ? "eager" : "lazy"}
        ></iframe>
      </div>
    </div>
  );
};

export default DailyDSAEmbed;
