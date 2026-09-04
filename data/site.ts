/* ---------------------------------------------------------------------------
   Chapter-wide constants. Edit here first when the season rolls over.
   --------------------------------------------------------------------------- */

export const site = {
  chapterName: "Downingtown STEM Academy TSA",
  shortName: "Downingtown STEM TSA",
  school: "Downingtown STEM Academy",
  location: "Downingtown, Pennsylvania",
  season: "2026–27 Season",
  tagline: "Build. Compete. Lead.",

  /* PLACEHOLDER — replace with the real chapter inbox before launch. */
  contactEmail: "REPLACE-ME@dasd.org",
  contactNote: "Placeholder address. Swap in the real chapter inbox in data/site.ts.",

  /* Real link, given to us by the officer team. */
  askAQuestionForm: "https://forms.gle/7pBqNy7eKJoV6Vk19",

  /* Logo files. Put them in /public/logos/ and set the paths here, e.g.
     school: "/logos/downingtown-stem.svg". SVG is best; a transparent PNG at
     roughly 240px tall also works. While these are null every logo slot on the
     site falls back to a designed monogram, so nothing looks broken.
     Write them as plain root paths starting with a slash. The GitHub Pages
     base path is added for you at build time. */
  logos: {
    school: null as string | null,
    tsa: null as string | null,
  },
} as const;

/* Official sites. We link out rather than restating rules we do not control.
   Deep links move between seasons, so these intentionally stay near the root. */
export const officialLinks = {
  nationalTsa: {
    label: "National TSA",
    href: "https://tsaweb.org",
    note: "Official national organisation site.",
  },
  competitions: {
    label: "TSA Competitions",
    href: "https://tsaweb.org/competitions",
    note: "Event lists, competition regulations and updates.",
  },
  themesAndProblems: {
    label: "TSA Themes & Problems",
    href: "https://tsaweb.org/competitions",
    note: "Annual themes and problems are published here each season.",
  },
  paTsa: {
    label: "PA-TSA",
    href: "https://patsa.org",
    note: "Official Pennsylvania TSA site.",
  },
  paTsaConference: {
    label: "PA-TSA State Conference",
    href: "https://patsa.org",
    note: "Conference dates, registration and state-level modifications.",
  },
} as const;

export type OfficialLinkKey = keyof typeof officialLinks;
