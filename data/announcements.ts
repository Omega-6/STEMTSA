import type { Announcement } from "@/lib/types";

/* ---------------------------------------------------------------------------
   ANNOUNCEMENTS
   Written like a school publication: headline, date, author, short body.
   All three entries below are marked `isTemplate: true` and are labelled as
   examples on the site. Replace them with real posts.
   --------------------------------------------------------------------------- */

export const announcements: Announcement[] = [
  {
    slug: "state-conference-registration-open",
    title: "State conference registration open",
    date: "2026-XX-XX",
    author: "OFFICER NAME",
    category: "PA-TSA",
    excerpt:
      "Example post. Replace with the real registration window, cost and who to pay, and link the PA-TSA source.",
    body: [
      "This is a template announcement. Write the real one in data/announcements.ts.",
      "A good chapter announcement answers four things: what is happening, what the student has to do, when it is due, and who to ask if they are stuck.",
    ],
    isTemplate: true,
  },
  {
    slug: "event-selection-deadline-approaching",
    title: "Event selection deadline approaching",
    date: "2026-XX-XX",
    author: "OFFICER NAME",
    category: "Deadline",
    excerpt:
      "Example post. Replace with the real event selection deadline and a link to the form members need to fill in.",
    body: [
      "This is a template announcement. Write the real one in data/announcements.ts.",
      "Link the sign-up form directly. Do not make members search for it.",
    ],
    isTemplate: true,
  },
  {
    slug: "meet-the-officer-team",
    title: "Meet the 2026–27 officer team",
    date: "2026-XX-XX",
    author: "OFFICER NAME",
    category: "Chapter",
    excerpt:
      "Example post. Introduce the officer team, what each role actually does, and how members should contact them.",
    body: [
      "This is a template announcement. Write the real one in data/announcements.ts.",
      "The full roster already lives on the Our Chapter page — this post is the place to add context and photos.",
    ],
    isTemplate: true,
  },
];

export const getAnnouncement = (slug: string) => announcements.find((a) => a.slug === slug);
