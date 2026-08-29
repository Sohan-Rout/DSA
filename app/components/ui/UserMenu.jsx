"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LayoutDashboard, LogOut } from "lucide-react";

/**
 * Avatar dropdown. Controlled by the parent so the navbar can close it when
 * another menu opens — the reason the previous version could sit open
 * underneath the hover dropdowns.
 */
export default function UserMenu({
  user,
  open,
  onOpenChange,
  onLogout,
  onNavigate,
}) {
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const name = user?.user_metadata?.name || user?.email?.split("@")[0] || "Account";
  const avatar = `https://api.dicebear.com/8.x/initials/png?seed=${encodeURIComponent(
    user?.email ?? ""
  )}`;

  useEffect(() => {
    if (!open) return;

    // pointerdown, not click: fires before the target's own handler, so the
    // menu is already closing when the user taps something behind it.
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) onOpenChange(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onOpenChange(false);
        triggerRef.current?.focus();
      }
    };

    // A resize can move the anchor out from under the panel.
    const onResize = () => onOpenChange(false);

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onOpenChange]);

  const close = () => {
    onOpenChange(false);
    onNavigate?.();
  };

  const itemClass =
    "flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors duration-150 focus-visible:outline-none";

  return (
    <div className="relative" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="block rounded-full ring-offset-2 ring-offset-canvas transition-shadow duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        <Image
          src={avatar}
          alt=""
          width={32}
          height={32}
          className={`h-8 w-8 rounded-full border transition-colors duration-150 ${
            open ? "border-accent" : "border-line-strong hover:border-accent"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Account"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-line bg-card shadow-lg shadow-black/5 dark:shadow-black/40"
          >
            <div className="flex items-center gap-3 border-b border-line px-3 py-3">
              <Image
                src={avatar}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-full border border-line"
              />
              {/* min-w-0 lets the truncate below actually engage inside flex. */}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg">{name}</p>
                <p className="truncate text-xs text-fg-muted">{user?.email}</p>
              </div>
            </div>

            <div className="p-1">
              <Link
                href="/dashboard"
                role="menuitem"
                onClick={close}
                className={`${itemClass} rounded-lg text-fg hover:bg-card-hover focus-visible:bg-card-hover`}
              >
                <LayoutDashboard size={16} className="text-fg-subtle" />
                Dashboard
              </Link>
            </div>

            <div className="border-t border-line p-1">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  onLogout();
                }}
                className={`${itemClass} rounded-lg text-danger hover:bg-danger-soft focus-visible:bg-danger-soft`}
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
