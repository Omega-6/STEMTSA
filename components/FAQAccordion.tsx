"use client";

import { useState } from "react";
import Link from "next/link";
import type { Faq } from "@/lib/types";

export default function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-ink">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="border-b border-rule">
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className="flex w-full items-baseline gap-4 py-5 text-left transition-colors duration-150 hover:text-navy"
              >
                <span className="label shrink-0 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="display flex-1 text-lg leading-snug sm:text-xl">{faq.question}</span>
                <span aria-hidden className="label shrink-0 text-ink-3">{isOpen ? "−" : "+"}</span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
              className="pb-6 sm:pl-[3.25rem]"
            >
              <div className="max-w-2xl space-y-3 text-ink-2">
                {faq.answer.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              {faq.links && faq.links.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {faq.links.map((l) =>
                    l.href.startsWith("http") ? (
                      <li key={l.href}>
                        <a href={l.href} target="_blank" rel="noreferrer noopener" className="label link-underline">
                          {l.label} <span aria-hidden>↗</span>
                        </a>
                      </li>
                    ) : (
                      <li key={l.href}>
                        <Link href={l.href} className="label link-underline">
                          {l.label} <span aria-hidden>→</span>
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
