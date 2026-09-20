"use client";

import { useEffect, useRef, useState } from "react";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import BackendEngineerCard from "@/app/components/ui/BackendEngineerCard";

/**
 * Phone-only carousel for the partner embeds.
 *
 * On desktop these sit stacked in the sidebar. On a phone the grid collapses to
 * one column and stacking them means a long scroll past content the reader did
 * not come for, so instead one slot cycles through them on its own.
 *
 * The newsletter embed is deliberately not in here — it stays desktop-only.
 *
 * Slides are stacked in a single CSS grid cell rather than laid side by side.
 * That makes the container as tall as the tallest slide, so swapping slides
 * never changes the page height — important when one slide is an iframe that
 * reports its own height after load.
 */

// How long each slide stays up. One number, change it here.
const ROTATE_MS = 5000;

const SLIDES = [
  {
    id: "daily-dsa",
    label: "Daily DSA challenge",
    // eager: a lazy iframe that is scrolled past while it is the hidden slide
    // never leaves about:blank, which shows up as an empty box.
    // bordered={false}: matches the desktop sidebar, no dashed frame.
    render: (theme) => (
      <DailyDSAEmbed mobile eager bordered={false} theme={theme} />
    ),
  },
  {
    id: "backend-engineer",
    label: "Backend Engineer",
    render: (theme) => (
      <BackendEngineerCard
        theme={theme}
        utmContent="mobile-carousel"
        // Must not collide with the sidebar card's default id on the same page.
        targetId="be-mobile-carousel"
        // No bottom margin: it would throw off the vertical centring, and the
        // carousel supplies the spacing below the slide itself.
        className=""
      />
    ),
  },
];

export default function MobileEmbedCarousel({ theme = "light" }) {
  const [index, setIndex] = useState(0);
  // Hiding with CSS alone still downloads the iframe on desktop, so the slides
  // are not mounted at all until we know this is a phone.
  const [isPhone, setIsPhone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsPhone(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // A backgrounded tab should not keep cycling.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!isPhone || paused || SLIDES.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      ROTATE_MS
    );
    return () => clearInterval(timer);
  }, [isPhone, paused]);

  if (!isPhone) return null;

  return (
    <section
      className="block w-full md:hidden"
      aria-roledescription="carousel"
      aria-label="Partner embeds"
      // Stop rotating while the reader is actually interacting with a slide,
      // otherwise it can swap out from under a tap.
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* A sliding track, not a stack of faded layers. Stacking the slides and
          fading between them left the hidden one's cross-origin iframe parked
          on about:blank — it never navigated, so the slide came back as an
          empty box. Here every slide stays in normal flow and is merely
          clipped, so each one loads and paints exactly as it would on its own.

          `items-center` keeps the shorter card centred against the taller
          slide, and the track's height is the tallest slide's, so nothing
          below it moves when the slide changes. */}
      <div className="overflow-hidden">
        <div
          className={`flex items-center ${
            reducedMotion ? "" : "transition-transform duration-500 ease-out"
          }`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div key={slide.id} className="w-full min-w-0 shrink-0">
              {slide.render(theme)}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-center gap-1">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${slide.label}`}
            aria-current={i === index}
            // 44px touch target around a small visual dot.
            className="flex h-11 w-11 items-center justify-center focus-visible:outline-none"
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index
                  ? "w-5 bg-blue-500"
                  : "w-1.5 bg-gray-300 dark:bg-gray-600"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
