/* ---------------------------------------------------------------------------
   "WHAT'S HAPPENING" — the four tiles under the hero.
   This is the most time-sensitive block on the site. Update it whenever
   something changes; anything left as null renders as "not set yet" rather
   than as a made-up date.
   --------------------------------------------------------------------------- */

export interface HappeningTile {
  kind: "Next deadline" | "Next competition" | "Latest announcement" | "Next chapter meeting";
  headline: string | null;
  date: string | null;
  detail: string | null;
  href: string | null;
}

export const whatsHappening: HappeningTile[] = [
  {
    kind: "Next deadline",
    headline: null,
    date: null,
    detail: "Officers: set the next submission or sign-up deadline in data/whats-happening.ts.",
    href: "/calendar?view=deadlines",
  },
  {
    kind: "Next competition",
    headline: null,
    date: null,
    detail: "Add the next conference or competition date once PA-TSA publishes it.",
    href: "/calendar",
  },
  {
    kind: "Latest announcement",
    headline: null,
    date: null,
    detail: "Pulls from data/announcements.ts once a real announcement is posted.",
    href: "/chapter#announcements",
  },
  {
    kind: "Next chapter meeting",
    headline: null,
    date: null,
    detail: "Add the recurring meeting day, time and room number.",
    href: "/calendar",
  },
];
