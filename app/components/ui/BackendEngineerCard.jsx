"use client";

import { useEffect, useRef } from "react";

const SRC = "https://www.backendengineer.in/embed/card.js";

/**
 * Backend Engineer partner card.
 *
 * The script is appended into this component's own div rather than loaded via
 * next/script. It reads its config from `document.currentScript.dataset` and
 * returns immediately when that is null, so a hoisted tag renders nothing at
 * all. Mounting is resolved as:
 *
 *   data-target -> document.getElementById(target)
 *   otherwise   -> inserted after the script tag itself
 *
 * Both paths land inside this div: the script lives here, and `targetId` is
 * this div's id. `targetId` must stay unique per page — the default assumes a
 * single card, so pass an explicit one if a page ever renders two.
 *
 * Desktop-only by default, matching the sibling sidebar embeds — on mobile the
 * grid collapses to one column and the sidebar sits *above* the article, so an
 * unguarded card would push the content the reader came for below the fold.
 */
export default function BackendEngineerCard({
  utmSource = "dsavisualizer",
  utmCampaign = "launch-partner",
  utmContent = "right-sidebar",
  targetId = "be-sidebar-ad",
  // The embed styles itself dark unless told otherwise, which reads as a hole
  // in a light page — so the site theme is forwarded rather than hard-coded.
  theme = "light",
  className = "mb-4 hidden md:block",
}) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Injection is deferred by a tick, which is what keeps this to one card.
    // Because the embed mounts via getElementById(data-target), it lands on
    // the target whether or not its own <script> is still in the document —
    // so removing the tag during React's Strict Mode mount/cleanup/mount
    // cycle does NOT stop an already in-flight script, and a second one then
    // appends a duplicate. Scheduling instead means Strict Mode's cleanup
    // cancels the first attempt before any script element exists. It also
    // coalesces rapid theme flips into a single load.
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      script.setAttribute("data-utm-source", utmSource);
      script.setAttribute("data-utm-campaign", utmCampaign);
      script.setAttribute("data-utm-content", utmContent);
      script.setAttribute("data-target", targetId);
      script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");

      // Drop anything from a previous run before adding the new script.
      host.replaceChildren();
      host.appendChild(script);
    }, 0);

    return () => {
      clearTimeout(timer);
      // Clear whatever the embed rendered so a remount can't stack cards.
      host.replaceChildren();
    };
  }, [utmSource, utmCampaign, utmContent, targetId, theme]);

  return <div id={targetId} ref={hostRef} className={className} />;
}
