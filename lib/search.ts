import { events } from "@/data/events";
import { calendar } from "@/data/calendar";
import { officers } from "@/data/officers";
import { projects } from "@/data/projects";
import { announcements } from "@/data/announcements";
import { faqs } from "@/data/faqs";
import { competitionResources, chapterResources, learningTracks } from "@/data/resources";

/* ---------------------------------------------------------------------------
   A flat, statically built search index. No backend, no third-party service.
   Everything the site knows about becomes one row here; the search UI ranks
   rows client-side. If a full search service is added later, the shape below
   is what it should ingest.
   --------------------------------------------------------------------------- */

export type SearchKind =
  | "Event"
  | "Page"
  | "Calendar"
  | "Project"
  | "Officer"
  | "Announcement"
  | "FAQ"
  | "Resource";

export interface SearchDoc {
  id: string;
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  /** Extra terms that should match but do not need to be displayed. */
  keywords: string[];
}

const pages: SearchDoc[] = [
  { id: "page-home", kind: "Page", title: "Home", description: "Season overview, what's happening now and the year at a glance.", href: "/", keywords: ["home", "start", "season"] },
  { id: "page-compete", kind: "Page", title: "Compete", description: "Every TSA event, filterable by category and by individual or team.", href: "/compete", keywords: ["events", "competitions", "directory", "filter"] },
  { id: "page-resources", kind: "Page", title: "Resources", description: "Event guides, rubrics, templates, chapter documents and learning tracks.", href: "/resources", keywords: ["rubric", "guide", "template", "learn", "tutorial"] },
  { id: "page-calendar", kind: "Page", title: "Calendar", description: "Chapter, PA-TSA and national dates, with a deadlines-only view.", href: "/calendar", keywords: ["dates", "deadlines", "due", "schedule"] },
  { id: "page-chapter", kind: "Page", title: "Our Chapter", description: "Officer team, advisers and chapter announcements.", href: "/chapter", keywords: ["officers", "leadership", "news", "contact"] },
  { id: "page-projects", kind: "Page", title: "Past Projects", description: "Archive of what previous Downingtown STEM teams designed and built.", href: "/projects", keywords: ["archive", "portfolio", "past", "built"] },
  { id: "page-patsa", kind: "Page", title: "PA-TSA", description: "State conference, state committees, state office and state resources.", href: "/pa-tsa", keywords: ["states", "pennsylvania", "conference", "state officer"] },
  { id: "page-hub", kind: "Page", title: "TSA Hub", description: "Frequently asked questions and a direct line to the officer team.", href: "/hub", keywords: ["faq", "help", "questions", "ask"] },
];

export const searchIndex: SearchDoc[] = [
  ...pages,
  ...events.map<SearchDoc>((e) => ({
    id: `event-${e.slug}`,
    kind: "Event",
    title: e.name,
    description: e.summary,
    href: `/compete/${e.slug}`,
    keywords: [e.category, e.participation, e.level, "event", "competition", "rubric", "requirements"],
  })),
  ...calendar.map<SearchDoc>((c) => ({
    id: `cal-${c.id}`,
    kind: "Calendar",
    title: c.title,
    description: c.description ?? c.category,
    href: c.category === "Deadline" ? "/calendar?view=deadlines" : "/calendar",
    keywords: [c.category, c.date, "date", "deadline", "due"],
  })),
  ...projects.map<SearchDoc>((p) => ({
    id: `project-${p.slug}`,
    kind: "Project",
    title: p.title,
    description: `${p.event} · ${p.year}`,
    href: `/projects/${p.slug}`,
    keywords: [p.event, p.year, p.placement, "project", "past"],
  })),
  ...officers.map<SearchDoc>((o) => ({
    id: `officer-${o.name}`,
    kind: "Officer",
    title: o.name,
    description: o.position,
    href: "/chapter#officers",
    keywords: [o.position, o.tier, "officer", "contact", "leadership"],
  })),
  ...announcements.map<SearchDoc>((a) => ({
    id: `announcement-${a.slug}`,
    kind: "Announcement",
    title: a.title,
    description: a.excerpt,
    href: `/chapter#announcements`,
    keywords: [a.category, "news", "announcement", "update"],
  })),
  ...faqs.map<SearchDoc>((f, i) => ({
    id: `faq-${i}`,
    kind: "FAQ",
    title: f.question,
    description: f.answer[0] ?? "",
    href: "/hub",
    keywords: ["faq", "question", "help"],
  })),
  ...[...competitionResources, ...chapterResources].flatMap<SearchDoc>((g) =>
    g.links.map((l, i) => ({
      id: `resource-${g.title}-${i}`,
      kind: "Resource" as const,
      title: l.label,
      description: `${g.title} · ${l.note ?? g.blurb}`,
      href: "/resources",
      keywords: [g.title, l.official ? "official" : "chapter", "resource"],
    })),
  ),
  ...learningTracks.flatMap<SearchDoc>((t) =>
    t.skills.map((s) => ({
      id: `learn-${t.field}-${s.name}`,
      kind: "Resource" as const,
      title: `Learn ${s.name}`,
      description: `${t.field} · ${s.why}`,
      href: "/resources#learning",
      keywords: [t.field, "learning", "tutorial", "skill", s.name],
    })),
  ),
];

/** Small deterministic ranker: title prefix > title contains > body contains. */
export function searchDocs(query: string, limit = 30): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);

  const scored = searchIndex
    .map((doc) => {
      const title = doc.title.toLowerCase();
      const haystack = `${title} ${doc.description} ${doc.keywords.join(" ")}`.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (!haystack.includes(term)) return { doc, score: -1 };
        if (title.startsWith(term)) score += 6;
        else if (title.includes(term)) score += 4;
        else if (doc.keywords.some((k) => k.toLowerCase().includes(term))) score += 2;
        else score += 1;
      }
      if (doc.kind === "Event" || doc.kind === "Page") score += 1;
      return { doc, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title));

  return scored.slice(0, limit).map((r) => r.doc);
}
