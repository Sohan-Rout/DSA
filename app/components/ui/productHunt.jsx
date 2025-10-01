"use client";
import React, { useEffect, useState } from "react";

const ProductHuntBadge = () => {
  const [showBadge, setShowBadge] = useState(true);
  const [isDark, setIsDark] = useState(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBadge(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(darkQuery.matches);

    const handleChange = (e) => setIsDark(e.matches);
    darkQuery.addEventListener("change", handleChange);

    return () => {
      if (footer) observer.unobserve(footer);
      observer.disconnect();
      darkQuery.removeEventListener("change", handleChange);
    };
  }, []);

  if (!showBadge || isDark === null) return null;

  const badgeTheme = isDark ? "light" : "dark";

  return (
    <a
      href="https://www.producthunt.com/products/dsa-visualizer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-dsa&#0045;visualizer"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <img
        src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=974127&theme=${badgeTheme}&t=1749182745821`}
        alt="DSA&#0032;Visualizer - Visualize&#0032;&#0038;&#0032;learn&#0032;dsa&#0032;the&#0032;smart&#0032;way | Product Hunt"
        style={{ width: 250, height: 54 }}
        width="250"
        height="54"
      />
    </a>
  );
};

export default ProductHuntBadge;