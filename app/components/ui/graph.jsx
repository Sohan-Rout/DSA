"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// recharts is ~370 KiB and the graph sits far below the fold, so it is code
// split and only fetched once the placeholder scrolls near the viewport.
const ComplexityChart = dynamic(() => import("./graphChart"), {
  ssr: false,
  loading: () => null,
});

const ComplexityGraph = (props) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Reserve the same box the chart occupies so nothing shifts when it loads.
  return (
    <div ref={ref} className="w-full">
      {visible ? (
        <ComplexityChart {...props} />
      ) : (
        <div className="w-full h-64 sm:h-100 my-1 p-1 sm:p-2 bg-neutral-50 dark:bg-neutral-900 rounded-2xl" />
      )}
    </div>
  );
};

export default ComplexityGraph;
