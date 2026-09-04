import type { Officer } from "@/lib/types";

/* ---------------------------------------------------------------------------
   OFFICER TEAM — names and positions supplied by the chapter.
   Photos and emails are intentionally null. Add them here once officers have
   agreed to have them published; the cards handle the missing values already.
   The `responsibilities` lines are chapter-written role summaries — officers
   should reword their own.
   --------------------------------------------------------------------------- */

export const officers: Officer[] = [
  {
    name: "Shreyasse Nanda",
    position: "Senior President",
    tier: "Presidents",
    responsibilities: "Sets chapter direction, runs general meetings and oversees competitive events.",
    email: null,
    photo: null,
  },
  {
    name: "Sneha Talluri",
    position: "Senior President",
    tier: "Presidents",
    responsibilities: "Sets chapter direction, runs general meetings and oversees competitive events.",
    email: null,
    photo: null,
  },
  {
    name: "Ajay Prem",
    position: "Junior President",
    tier: "Presidents",
    responsibilities: "Supports chapter operations and leads the transition into next season.",
    email: null,
    photo: null,
  },
  {
    name: "Euchang Kim",
    position: "Junior President",
    tier: "Presidents",
    responsibilities: "Supports chapter operations and leads the transition into next season.",
    email: null,
    photo: null,
  },

  {
    name: "Troy Gaitanopoulos",
    position: "VP of Membership",
    tier: "Vice Presidents",
    responsibilities: "Recruits new members and runs onboarding for first-year students.",
    email: null,
    photo: null,
  },
  {
    name: "Swarit Choudhari",
    position: "VP of Membership",
    tier: "Vice Presidents",
    responsibilities: "Recruits new members and runs onboarding for first-year students.",
    email: null,
    photo: null,
  },
  {
    name: "Diya Saravanarajan",
    position: "VP of Competitions",
    tier: "Vice Presidents",
    responsibilities: "Tracks event sign-ups, team rosters and submission deadlines.",
    email: null,
    photo: null,
  },
  {
    name: "Devanshi Agarwal",
    position: "VP of Competitions",
    tier: "Vice Presidents",
    responsibilities: "Tracks event sign-ups, team rosters and submission deadlines.",
    email: null,
    photo: null,
  },

  {
    name: "Arsha Malhotra",
    position: "Corresponding Secretary",
    tier: "Executive",
    responsibilities: "Handles chapter communications, announcements and outside correspondence.",
    email: null,
    photo: null,
  },
  {
    name: "Walter Kan",
    position: "Tech Secretary",
    tier: "Executive",
    responsibilities: "Maintains chapter records, the website and shared digital resources.",
    email: null,
    photo: null,
  },
  {
    name: "Parker Nguyen",
    position: "Treasurer",
    tier: "Executive",
    responsibilities: "Manages dues, the chapter budget and competition-related expenses.",
    email: null,
    photo: null,
  },
  {
    name: "Ashutosh Pandey",
    position: "Treasurer",
    tier: "Executive",
    responsibilities: "Manages dues, the chapter budget and competition-related expenses.",
    email: null,
    photo: null,
  },

  { name: "Sukriti Yadav", position: "12th Grade Representative", tier: "Grade Representatives", responsibilities: "Represents the senior class and relays questions to the officer team.", email: null, photo: null },
  { name: "Ben Schifter", position: "11th Grade Representative", tier: "Grade Representatives", responsibilities: "Represents the junior class and relays questions to the officer team.", email: null, photo: null },
  { name: "Nate Schifter", position: "11th Grade Representative", tier: "Grade Representatives", responsibilities: "Represents the junior class and relays questions to the officer team.", email: null, photo: null },
  { name: "Akshay Karri", position: "11th Grade Representative", tier: "Grade Representatives", responsibilities: "Represents the junior class and relays questions to the officer team.", email: null, photo: null },
  { name: "Yogi Patel", position: "10th Grade Representative", tier: "Grade Representatives", responsibilities: "Represents the sophomore class and relays questions to the officer team.", email: null, photo: null },
  { name: "Suvir Bhatla", position: "10th Grade Representative", tier: "Grade Representatives", responsibilities: "Represents the sophomore class and relays questions to the officer team.", email: null, photo: null },
  { name: "Abhinav Deepak", position: "9th Grade Representative", tier: "Grade Representatives", responsibilities: "Represents the freshman class and relays questions to the officer team.", email: null, photo: null },
];

export const OFFICER_TIERS: Officer["tier"][] = [
  "Presidents",
  "Vice Presidents",
  "Executive",
  "Grade Representatives",
];

/* PLACEHOLDER — add the chapter adviser once confirmed. */
export const advisers: { name: string; role: string; email: string | null }[] = [
  { name: "ADVISER NAME TBD", role: "Chapter Adviser", email: null },
];
