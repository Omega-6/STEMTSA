# Downingtown STEM TSA

The chapter website. Next.js App Router, TypeScript, Tailwind CSS v4. Every page is
statically generated, so it can be hosted anywhere that serves a Next.js build.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the static site to out/, 56 pages
npm run preview    # serve out/ locally to check the built site
npm run typecheck  # tsc --noEmit, catches bad content edits
```

## Hosting

The site is deployed to GitHub Pages at <https://omega-6.github.io/STEMTSA/>.

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. There
is nothing to run by hand. The Actions tab shows each deploy, and the workflow can
be rerun from there if one fails.

The build is a static export, so there is no server and no runtime cost. Fonts are
self hosted at build time, which means the published site makes no third party
requests at all.

Two settings this depends on, both one time:

1. Settings, Pages, Source is set to **GitHub Actions**.
2. `PAGES_BASE_PATH` in the workflow is `/STEMTSA`, because Pages serves the repo
   from a subfolder. It is only set in CI, so `npm run dev` still runs at `/`.

To move to a custom domain later: add a `public/CNAME` file containing the domain,
delete the `PAGES_BASE_PATH` line from the workflow, and set the domain under
Settings, Pages.

## What is where

```
app/                    one folder per route
  page.tsx              home
  compete/              event directory and [slug] event pages
  resources/            competition, chapter and learning resources
  calendar/             calendar, list and deadlines only views
  chapter/              officer team and announcements
  projects/             project archive and [slug] write ups
  pa-tsa/               state conference, committees, state office
  hub/                  FAQ accordion and the ask a question form
components/             reusable UI, no content of its own
data/                   all site content lives here
lib/types.ts            the shape every data file has to match
lib/search.ts           static search index built from the data files
```

Content and UI are kept apart on purpose. Officers should only ever need to edit
`data/`. If a change requires touching `components/`, that is a signal the data
model is missing a field.

## Updating content

Read [ContentGuide.md](ContentGuide.md). Short version:

| To change | Edit |
| --- | --- |
| The four tiles under the hero | `data/whats-happening.ts` |
| Dates and deadlines | `data/calendar.ts` |
| Events, categories, status | `data/events.ts` |
| Officer roster | `data/officers.ts` |
| Announcements | `data/announcements.ts` |
| Project write ups | `data/projects.ts` |
| FAQ | `data/faqs.ts` |
| Resource and learning links | `data/resources.ts` |
| Chapter email, season label, official links | `data/site.ts` |

Run `npm run typecheck` after editing. A missing field or a typo in a category
name fails there rather than breaking a page in production.

## Content rules this site follows

The site never states a TSA or PA-TSA rule as if it were ours. Requirements,
rubrics, themes, team sizes and official deadlines are left empty in the data
files, and the event pages render a visible pointer at the official guide instead.
Fill them in only by copying from the current guide, and recheck them every August.

Anything still awaiting real information renders with a red rule and a "needs
input" or "date not confirmed" marker. Those markers are the launch checklist: the
site is ready when they are gone.

## Before launch

1. Replace `contactEmail` in `data/site.ts`.
2. Replace the three example announcements in `data/announcements.ts`.
3. Replace the two template projects in `data/projects.ts` with real write ups.
4. Confirm every date in `data/calendar.ts` and remove its `unconfirmed` flag.
5. Add real photos to `public/` and swap `PhotoPlaceholder` for `next/image`.
6. Confirm the adviser entry in `data/officers.ts`.
7. Verify event categories and individual or team values against the current
   competition regulations.
