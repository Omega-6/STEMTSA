/* ---------------------------------------------------------------------------
   Shared content types.
   Every file in /data is typed against this file, so a bad edit fails
   `npm run typecheck` instead of silently breaking a page.
   --------------------------------------------------------------------------- */

export type EventCategory =
  | "STEM"
  | "Engineering"
  | "Computer Science"
  | "Design"
  | "Communications"
  | "Leadership";

export type Participation = "Individual" | "Team" | "Individual / Team";

/** Which organisation runs the event. PA-only events do not exist at nationals. */
export type EventLevel = "National + PA" | "PA only";

/** Where the chapter currently stands on an event this season. */
export type EventStatus =
  | "Open — accepting members"
  | "Team forming"
  | "Team full"
  | "Not running this year"
  | "Status TBD";

export interface RubricRow {
  criterion: string;
  points: string;
  notes?: string;
}

export interface CompetitionEvent {
  slug: string;
  name: string;
  category: EventCategory;
  participation: Participation;
  level: EventLevel;
  /** Chapter-written one-line summary. Never a quote from the official guide. */
  summary: string;
  status: EventStatus;

  /* --- Event detail template. Anything left as null renders as a visible
     "needs to be filled in" block rather than as invented information. --- */
  overview: string | null;
  whoCanCompete: string | null;
  teamSize: string | null;
  eventType: string | null;
  currentTheme: string | null;
  requirements: string[] | null;
  deliverables: string[] | null;
  deadlines: { label: string; date: string }[] | null;
  rubric: RubricRow[] | null;
  preliminaryRequirements: string[] | null;
  semifinalRequirements: string[] | null;
  whatToBring: string[] | null;
  helpfulResources: { label: string; href: string }[] | null;
  /** Slugs from data/projects.ts. */
  pastProjects: string[];
  commonMistakes: string[] | null;
  /** Official guide link. Always points at TSA or PA-TSA, never at us. */
  officialGuideUrl: string;
}

export type CalendarCategory =
  | "Chapter"
  | "PA-TSA"
  | "National TSA"
  | "Competition"
  | "Deadline";

export interface CalendarEntry {
  id: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Optional end date for multi-day entries. */
  endDate?: string;
  time?: string;
  title: string;
  description?: string;
  category: CalendarCategory;
  /** Slug from data/events.ts, if this entry belongs to one competition. */
  relatedEvent?: string;
  location?: string;
  link?: string;
  /** True while the date is a placeholder awaiting the real one. */
  unconfirmed?: boolean;
}

export interface Officer {
  name: string;
  position: string;
  /** Grouping used to order the roster. */
  tier: "Presidents" | "Vice Presidents" | "Executive" | "Grade Representatives";
  responsibilities: string | null;
  email: string | null;
  photo: string | null;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  event: string;
  eventSlug?: string;
  teamMembers: string[];
  placement: string;
  problem: string | null;
  solution: string | null;
  whatWeBuilt: string | null;
  results: string | null;
  whatWeLearned: string | null;
  images: { src: string | null; alt: string; caption: string }[];
  /** Template rows are visibly marked in the UI until real projects replace them. */
  isTemplate: boolean;
}

export interface Announcement {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: "Chapter" | "Competition" | "PA-TSA" | "Deadline";
  excerpt: string;
  body: string[];
  isTemplate: boolean;
}

export interface Faq {
  question: string;
  answer: string[];
  links?: { label: string; href: string }[];
}

export interface ResourceLink {
  label: string;
  href: string | null;
  note?: string;
  /** Official = maintained by TSA or PA-TSA, not by our chapter. */
  official?: boolean;
}

export interface ResourceGroup {
  title: string;
  blurb: string;
  links: ResourceLink[];
}

export interface LearningTrack {
  field: string;
  blurb: string;
  skills: { name: string; why: string; href: string | null }[];
}

export interface Achievement {
  event: string;
  places: number[];
}

export interface TimelinePhase {
  month: string;
  /** Real dates go here once known; until then the month is all we claim. */
  dateRange: string | null;
  items: string[];
  emphasis?: boolean;
}
