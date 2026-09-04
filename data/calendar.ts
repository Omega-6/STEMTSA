import type { CalendarCategory, CalendarEntry } from "@/lib/types";

/* ---------------------------------------------------------------------------
   CHAPTER CALENDAR
   ---------------------------------------------------------------------------
   Every entry below is seeded with `unconfirmed: true`, which makes the site
   render a "DATE NOT CONFIRMED" marker next to it. Replace the date, drop the
   `unconfirmed` flag, and the marker disappears.

   Do not copy PA-TSA or National TSA dates from memory — take them from the
   official sites and link the entry back to the source with `link`.
   --------------------------------------------------------------------------- */

export const CALENDAR_CATEGORIES: CalendarCategory[] = [
  "Chapter",
  "PA-TSA",
  "National TSA",
  "Competition",
  "Deadline",
];

export const calendar: CalendarEntry[] = [
  {
    id: "chapter-interest-meeting",
    date: "2026-09-16",
    time: "3:00 PM",
    title: "Chapter interest meeting",
    description: "Overview of TSA, the event list and how to sign up. Open to every grade.",
    category: "Chapter",
    location: "ROOM TBD",
    unconfirmed: true,
  },
  {
    id: "event-selection-deadline",
    date: "2026-09-30",
    title: "Event selection form due",
    description: "Members submit first and second choice events so teams can be formed.",
    category: "Deadline",
    unconfirmed: true,
  },
  {
    id: "teams-posted",
    date: "2026-10-07",
    title: "Team rosters posted",
    description: "VPs of Competitions publish the roster for every event the chapter is running.",
    category: "Chapter",
    unconfirmed: true,
  },
  {
    id: "national-dues-deadline",
    date: "2026-10-15",
    title: "National TSA membership dues due",
    description: "Confirm the real deadline against the national site before relying on this.",
    category: "Deadline",
    link: "https://tsaweb.org",
    unconfirmed: true,
  },
  {
    id: "progress-review-1",
    date: "2026-12-09",
    time: "3:00 PM",
    title: "Mid-season progress review",
    description: "Each team shows current state of work to the officer team.",
    category: "Chapter",
    location: "ROOM TBD",
    unconfirmed: true,
  },
  {
    id: "state-registration-deadline",
    date: "2027-02-12",
    title: "PA-TSA State Conference registration deadline",
    description: "Registration and payment must be in before this date. Verify on patsa.org.",
    category: "Deadline",
    link: "https://patsa.org",
    unconfirmed: true,
  },
  {
    id: "submission-window",
    date: "2027-03-06",
    title: "Online submission window opens",
    description: "Events with pre-submitted work upload through the official portal.",
    category: "Competition",
    unconfirmed: true,
  },
  {
    id: "pa-tsa-states",
    date: "2027-04-14",
    endDate: "2027-04-16",
    title: "PA-TSA State Conference",
    description: "State-level competition. Dates, venue and schedule are published by PA-TSA.",
    category: "PA-TSA",
    location: "VENUE TBD",
    link: "https://patsa.org",
    unconfirmed: true,
  },
  {
    id: "nationals",
    date: "2027-06-24",
    endDate: "2027-06-28",
    title: "TSA National Conference",
    description: "National competition for students who qualify at states.",
    category: "National TSA",
    location: "VENUE TBD",
    link: "https://tsaweb.org",
    unconfirmed: true,
  },
];

export const upcoming = (from: Date, limit?: number) => {
  const iso = from.toISOString().slice(0, 10);
  const next = calendar
    .filter((e) => (e.endDate ?? e.date) >= iso)
    .sort((a, b) => a.date.localeCompare(b.date));
  return typeof limit === "number" ? next.slice(0, limit) : next;
};
