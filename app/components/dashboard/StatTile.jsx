import React from "react";

/**
 * One number, one label, one icon. Tone controls only the icon chip so the
 * numbers themselves stay in the primary text colour and read as a set.
 */
function StatTile({ icon: Icon, value, label, hint, tone = "neutral" }) {
  const toneClass = {
    neutral: "bg-inset text-fg-muted",
    accent: "bg-accent-soft text-accent",
    streak: "bg-streak-soft text-streak",
  }[tone];

  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toneClass}`}
          aria-hidden="true"
        >
          <Icon size={16} strokeWidth={2.25} />
        </span>
        <span className="text-xs font-medium tracking-wide text-fg-muted uppercase">
          {label}
        </span>
      </div>
      <p className="mt-3 text-3xl leading-none font-semibold tabular-nums text-fg">
        {value}
      </p>
      {hint && <p className="mt-1.5 text-xs text-fg-subtle">{hint}</p>}
    </div>
  );
}

export default StatTile;
