"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { searchDocs, type SearchDoc } from "@/lib/search";

const SUGGESTIONS = ["biotech", "states", "rubric", "software", "deadlines", "CAD"];

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchDocs(query, 24), [query]);

  useEffect(() => {
    if (open) {
      setActive(0);
      // Let the dialog paint before grabbing focus.
      const t = window.setTimeout(() => inputRef.current?.focus(), 20);
      return () => window.clearTimeout(t);
    }
    setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      const link = document.getElementById(`search-result-${active}`) as HTMLAnchorElement | null;
      link?.click();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search this site"
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-[10vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div className="w-full max-w-2xl border border-ink bg-paper">
        <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
          <span aria-hidden className="text-ink-3">
            ⌕
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            type="search"
            placeholder="Search events, deadlines, resources…"
            aria-label="Search query"
            aria-controls="search-results"
            className="w-full bg-transparent py-1 text-lg outline-none placeholder:text-ink-3"
          />
          <button onClick={onClose} className="label border border-rule-strong px-2 py-1 text-ink-2 hover:bg-paper-2">
            Esc
          </button>
        </div>

        <div id="search-results" className="max-h-[55vh] overflow-y-auto" role="listbox">
          {query.trim().length < 2 ? (
            <div className="px-4 py-5">
              <p className="label text-ink-3">Try</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="label border border-rule-strong px-2 py-1 text-ink-2 hover:border-ink hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="px-4 py-6 text-sm text-ink-2">
              Nothing matched “{query}”. Try a shorter term, or{" "}
              <Link href="/hub" onClick={onClose} className="link-underline">
                ask the officers
              </Link>
              .
            </p>
          ) : (
            <ul>
              {results.map((doc: SearchDoc, i) => (
                <li key={doc.id}>
                  <Link
                    id={`search-result-${i}`}
                    href={doc.href}
                    onClick={onClose}
                    onMouseEnter={() => setActive(i)}
                    role="option"
                    aria-selected={i === active}
                    className={`flex items-baseline gap-4 border-b border-rule px-4 py-3 ${
                      i === active ? "bg-paper-2" : ""
                    }`}
                  >
                    <span className="label w-24 shrink-0 text-ink-3">{doc.kind}</span>
                    <span className="min-w-0">
                      <span className="block font-medium">{doc.title}</span>
                      <span className="block truncate text-sm text-ink-2">{doc.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="border-t border-rule px-4 py-2 text-xs text-ink-3">
          <span className="label">↑ ↓ to move · Enter to open</span>
        </p>
      </div>
    </div>
  );
}
