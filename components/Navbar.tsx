"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchDialog from "./SearchDialog";
import { site } from "@/data/site";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Compete", href: "/compete" },
  { label: "Resources", href: "/resources" },
  { label: "Calendar", href: "/calendar" },
  { label: "Our Chapter", href: "/chapter" },
  { label: "PA-TSA", href: "/pa-tsa" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Cmd/Ctrl-K and "/" open search, the way a tool would.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing && !searchOpen)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink bg-paper/95 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-[86rem] items-stretch justify-between gap-3 px-4 sm:px-6">
          {/* Wordmark */}
          <Link href="/" className="flex min-w-0 items-center gap-3 py-3" aria-label={`${site.shortName} — home`}>
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center border border-ink bg-navy text-[0.7rem] font-bold tracking-tight text-white"
            >
              DS
            </span>
            <span className="min-w-0 leading-none">
              <span className="display block truncate text-[0.8rem] uppercase tracking-tight sm:text-[0.95rem]">
                Downingtown STEM
              </span>
              <span className="label block truncate text-[0.6rem] text-navy sm:text-[0.6875rem]">
                Technology Student Association
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-stretch lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`label flex items-center border-l border-rule px-4 transition-colors duration-150 hover:bg-paper-2 ${
                  isActive(item.href) ? "text-navy" : "text-ink-2"
                }`}
              >
                <span className={isActive(item.href) ? "border-b-2 border-navy pb-0.5" : ""}>{item.label}</span>
              </Link>
            ))}
            <Link
              href="/hub"
              className={`label flex items-center border-l border-rule px-4 hover:bg-paper-2 ${
                isActive("/hub") ? "text-navy" : "text-ink-2"
              }`}
            >
              TSA Hub
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="label flex items-center gap-2 border-l border-rule px-4 text-ink-2 hover:bg-paper-2"
              aria-label="Open search"
            >
              <span aria-hidden>⌕</span> Search
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex shrink-0 items-stretch lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="label border-l border-rule px-4 text-ink-2"
              aria-label="Open search"
            >
              <span aria-hidden className="text-base">⌕</span>
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="label flex items-center gap-2 border-l border-rule px-4 text-ink-2"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Mobile menu: full-width single column, large touch targets. */}
        {menuOpen && (
          <nav id="mobile-menu" aria-label="Mobile" className="border-t border-rule lg:hidden">
            {[...NAV, { label: "TSA Hub", href: "/hub" }, { label: "Past Projects", href: "/projects" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between border-b border-rule px-5 py-4 text-lg ${
                  isActive(item.href) ? "text-navy" : ""
                }`}
              >
                {item.label}
                <span aria-hidden className="text-ink-3">→</span>
              </Link>
            ))}
          </nav>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
