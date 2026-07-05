"use client";
import { useEffect, useState } from "react";

const DailyDSAEmbed = ({ mobile = false, theme = "light" }) => {
  const src = `https://scaleengineer.com/embed/daily/dsa?theme=${theme}`;
  const wrapperClasses = mobile
    ? "block md:hidden w-full"
    : "max-w-full hidden md:block";
  const height = mobile ? 200 : 280;

  return (
    <div className={wrapperClasses}>
      <div className="max-w-full mb-4">
        <a
          href="https://scaleengineer.com/daily"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 inline-block text-[#737373] no-underline"
          style={{
            font: "500 12px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
          }}
        >
          Daily DSA Challenge by{" "}
          <span className="text-[#0a0a0a] underline underline-offset-[3px]">
            Scale Engineer
          </span>
        </a>
        <iframe
          src={src}
          width="100%"
          height={height}
          className="border border-black border-dashed rounded-none overflow-hidden"
          title="Daily DSA Challenge"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default DailyDSAEmbed;
