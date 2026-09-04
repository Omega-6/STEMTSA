# Content Guide

Written for officers. No React knowledge required. Everything below happens in
`data/`, and every file in there is a plain list of objects.

After any edit, run `npm run typecheck`. If it prints nothing, the edit is valid.

## The placeholder system

Three markers appear across the site:

* **Needs input** with a red rule. A chapter written field nobody has filled in.
* **Not documented yet**. A field that has to be copied out of the official TSA
  event guide. Never guess at these.
* **Date not confirmed**. A calendar entry seeded so the views could be tested.

Clearing all three is the launch checklist.

## What's happening tiles

`data/whats-happening.ts`. Four tiles under the hero. Set `headline`, `date` and
`detail`. A tile with a null headline renders as "Not set yet" rather than as an
empty box, so a stale tile is visible rather than invisible.

## Calendar

`data/calendar.ts`. One object per entry:

```ts
{
  id: "state-registration-deadline",  // unique, any string
  date: "2027-02-12",                 // always YYYY-MM-DD
  endDate: "2027-02-14",              // optional, for multi day entries
  time: "3:00 PM",                    // optional
  title: "PA-TSA State Conference registration deadline",
  description: "Registration and payment must be in before this date.",
  category: "Deadline",               // Chapter | PA-TSA | National TSA | Competition | Deadline
  relatedEvent: "software-development",  // optional, a slug from data/events.ts
  location: "VENUE TBD",              // optional
  link: "https://patsa.org",          // optional, prefer the official source
  unconfirmed: true,                  // delete this line once verified
}
```

Anything with `category: "Deadline"` also appears in the Deadlines only view,
which is the view most members use.

## Events

`data/events.ts`. Events are defined as short seeds near the bottom of the file.
Adding one is a single object:

```ts
{ name: "Event Name", category: "Engineering", participation: "Team", summary: "One line." }
```

Categories must be one of: STEM, Engineering, Computer Science, Design,
Communications, Leadership. Participation must be Individual, Team, or
Individual / Team. Add `level: "PA only"` for state only events.

The slug is generated from the name, so renaming an event changes its URL.

To fill in the detail sections for one event, find it in the generated list and
set the fields listed in `lib/types.ts` (`requirements`, `deliverables`, `rubric`
and so on). Copy them from the official guide. Leaving them null is the correct
choice until someone has read the guide.

`status` is the chapter's own field: whether that event is open, forming, full or
not running this year.

## Officers

`data/officers.ts`. Name, position, tier, a one line responsibility, and optional
email and photo. Tier controls the grouping on the page. Only add an email once
that officer has agreed to it being public; the card falls back to the officer
question form otherwise.

## Announcements

`data/announcements.ts`. Newest first. Set `isTemplate: false` on real posts so
the "example post" marker disappears. Written like a school paper: what is
happening, what the member has to do, when it is due, who to ask.

## Projects

`data/projects.ts`. Copy a template, set `isTemplate: false`, fill in the problem,
the solution, what the team built, the results, and what they learned. The last
one is the most valuable section for the next team and the only one no official
document can provide.

Photos go in `public/projects/` and get referenced through `images[].src`.

## Resources and learning tracks

`data/resources.ts`. A link with `href: null` renders as "Link needed" rather than
as a dead link. Mark anything maintained by TSA or PA-TSA with `official: true` so
readers know it is not ours.

Learning tracks are grouped by field. Adding a field is one object; adding a skill
is one line. Every skill says what it is for, not just where to click.

## FAQ

`data/faqs.ts`. Question, an array of paragraphs, and optional links. Where a rule
decides the answer, say so and link the official source instead of paraphrasing
it. Rules change every season; a paraphrase goes stale silently.

## Search

`lib/search.ts` builds its index from the data files automatically. New events,
projects, officers, announcements, FAQs and resources become searchable with no
extra work.
