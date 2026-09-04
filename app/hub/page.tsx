import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import { SectionHead } from "@/components/Primitives";
import { faqs } from "@/data/faqs";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "TSA Hub",
  description: "Answers to the questions Downingtown STEM TSA members ask most, plus a direct line to the officers.",
};

export default function HubPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
      <header className="py-10 lg:py-14">
        <p className="label text-navy">Help</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4rem)] uppercase">TSA Hub</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-2">
          The questions members actually ask, answered. Where the answer depends on a TSA or PA-TSA rule, we say so and
          link the official source rather than paraphrasing it — those rules change every season.
        </p>
      </header>

      <section className="py-6">
        <SectionHead index="01" title="Frequently asked questions" />
        <div className="mt-6">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <section id="ask" className="scroll-mt-24 py-10 pb-16">
        <SectionHead index="02" title="Ask a question" />
        <div className="mt-6 grid gap-8 border border-ink p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h3 className="display text-2xl sm:text-3xl">Can&apos;t find what you&apos;re looking for?</h3>
            <p className="mt-3 max-w-xl text-ink-2">
              Ask the TSA officers. Questions go to the officer team through the form below — include your event if the
              question is about one, and you will get a straight answer.
            </p>
            <p className="mt-3 text-sm text-ink-2">
              Answers that keep coming up get added to this page, so asking helps the next person too.
            </p>
          </div>
          <a href={site.askAQuestionForm} target="_blank" rel="noreferrer noopener" className="btn btn-primary">
            Ask a question <span aria-hidden>→</span>
          </a>
        </div>

        <p className="mt-6 text-sm text-ink-2">
          Looking for a specific event, deadline or resource instead? Press{" "}
          <kbd className="label border border-rule-strong px-1.5 py-0.5">/</kbd> anywhere to search, or start from the{" "}
          <Link href="/compete" className="link-underline">
            event directory
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
