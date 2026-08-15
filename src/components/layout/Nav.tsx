"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";
import { IconClose, IconMenu } from "@/components/ui/icons";

const NAV_LINKS = [
  { label: "Approach", href: "/#approach" },
  { label: "Systems", href: "/#systems" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Lab", href: "/#lab" },
  { label: "Contact", href: "/#contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Escape closes the menu; focus moves back to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line/70 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/#top"
          className="group flex items-center gap-2 font-mono text-sm text-foreground"
          onClick={close}
        >
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-md border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-hover:rotate-[-8deg]"
          >
            <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" aria-hidden fill="currentColor">
              <circle cx="6" cy="6" r="2.2" />
              <circle cx="2.4" cy="3" r="1.1" opacity="0.6" />
              <circle cx="9.6" cy="9" r="1.1" opacity="0.6" />
            </svg>
          </span>
          <span className="text-mute">~/</span>
          <span className="font-semibold">{siteConfig.handle}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex" ref={menuRef}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 font-mono text-[13px] tracking-tight text-dim transition-colors hover:bg-surface hover:text-foreground"
              >
                <span className="text-mute">/</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 font-mono text-[13px] text-accent transition-colors hover:bg-accent/15 md:inline-flex"
          >
            <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-ok" />
            Send signal
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-foreground transition-colors hover:bg-surface md:hidden"
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-b border-line bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4 sm:px-8">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className="flex items-center justify-between rounded-lg px-3 py-3 font-mono text-sm text-foreground transition-colors hover:bg-surface"
              >
                <span>
                  <span className="text-mute">0{i + 1}</span> {link.label}
                </span>
                <span aria-hidden className="text-mute">
                  →
                </span>
              </Link>
            </li>
          ))}
          <li className="mt-2 border-t border-line-soft pt-3">
            <a
              href="#contact"
              onClick={close}
              className="flex items-center gap-2 px-3 py-2 font-mono text-sm text-accent"
            >
              <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-ok" />
              Send signal
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}