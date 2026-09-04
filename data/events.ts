import type { CompetitionEvent, EventCategory, EventLevel, Participation } from "@/lib/types";
import { officialLinks } from "./site";

/* ---------------------------------------------------------------------------
   EVENT DIRECTORY
   ---------------------------------------------------------------------------
   What is safe to edit here: name, category, participation, level, summary,
   status, helpfulResources, pastProjects.

   What must NOT be invented here: requirements, deliverables, rubrics,
   deadlines, themes. Those live in the official event guide, which changes
   every season. Leave them `null` and the event page will show a link to the
   official guide instead of made-up rules. Fill them in only by copying from
   the guide, and re-check them every August.

   Categories, team/individual and event status below are a chapter-maintained
   starting point, NOT official data. Confirm against the current TSA
   competition regulations before a student relies on them.
   --------------------------------------------------------------------------- */

export const EVENT_CATEGORIES: EventCategory[] = [
  "STEM",
  "Engineering",
  "Computer Science",
  "Design",
  "Communications",
  "Leadership",
];

type EventSeed = {
  name: string;
  category: EventCategory;
  participation: Participation;
  summary: string;
  level?: EventLevel;
  helpfulResources?: { label: string; href: string }[];
};

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[(),.]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Every unfilled field defaults to null so the UI can flag it honestly. */
const build = (seed: EventSeed): CompetitionEvent => {
  const level = seed.level ?? "National + PA";
  return {
    slug: slugify(seed.name),
    name: seed.name,
    category: seed.category,
    participation: seed.participation,
    level,
    summary: seed.summary,
    status: "Status TBD",
    overview: null,
    whoCanCompete: null,
    teamSize: null,
    eventType: null,
    currentTheme: null,
    requirements: null,
    deliverables: null,
    deadlines: null,
    rubric: null,
    preliminaryRequirements: null,
    semifinalRequirements: null,
    whatToBring: null,
    helpfulResources: seed.helpfulResources ?? null,
    pastProjects: [],
    commonMistakes: null,
    officialGuideUrl:
      level === "PA only" ? officialLinks.paTsa.href : officialLinks.competitions.href,
  };
};

const seeds: EventSeed[] = [
  { name: "Animatronics", category: "Engineering", participation: "Team", summary: "Design, build and program an animatronic device that performs to a scripted scene." },
  { name: "Architectural Design", category: "Design", participation: "Team", summary: "Produce architectural drawings and a physical or digital model for a building problem." },
  { name: "Audio Podcasting", category: "Communications", participation: "Team", summary: "Research, script, record and edit an original podcast episode." },
  { name: "Biotechnology Design", category: "STEM", participation: "Individual / Team", summary: "Research a biotechnology problem and present a documented solution with a display." },
  { name: "Board Game Design", category: "Design", participation: "Team", summary: "Design, prototype and playtest an original board game around a given theme." },
  { name: "Chapter Team", category: "Leadership", participation: "Team", summary: "Demonstrate parliamentary procedure and chapter leadership in a written test and live meeting." },
  { name: "Children's Stories", category: "Communications", participation: "Team", summary: "Write and illustrate an original children's book on a technology theme." },
  { name: "Coding", category: "Computer Science", participation: "Team", summary: "Solve timed programming problems on site under contest conditions." },
  { name: "Computer-Aided Design (CAD), Architecture", category: "Design", participation: "Individual", summary: "Produce architectural CAD drawings against an on-site problem." },
  { name: "Computer-Aided Design (CAD), Engineering", category: "Engineering", participation: "Individual", summary: "Produce mechanical CAD drawings and models against an on-site problem." },
  { name: "Cybersecurity", category: "Computer Science", participation: "Team", level: "PA only", summary: "Work through defensive and offensive security challenges in a proctored environment." },
  { name: "Data Science and Analytics", category: "Computer Science", participation: "Team", summary: "Analyse a supplied dataset and present findings, visualisations and conclusions." },
  { name: "Debating Technological Issues", category: "Communications", participation: "Individual / Team", summary: "Argue an assigned side of a current technology issue in a structured debate." },
  { name: "Digital Video Production", category: "Communications", participation: "Team", summary: "Plan, shoot and edit a short film responding to the season's video theme." },
  { name: "Dragster Design", category: "Engineering", participation: "Individual", summary: "Design, CAD and manufacture a CO2 dragster, then race it on a timed track." },
  { name: "Drone Challenge (UAV)", category: "Engineering", participation: "Team", summary: "Build and fly a UAV through a timed and scored flight course." },
  { name: "Engineering Design", category: "Engineering", participation: "Team", summary: "Apply the full engineering design process to a season-long problem and defend the result." },
  { name: "Essays on Technology", category: "Communications", participation: "Individual", summary: "Write an on-site essay in response to a technology prompt." },
  { name: "Extemporaneous Speech", category: "Communications", participation: "Individual", summary: "Deliver a short speech on a drawn technology topic after limited preparation time." },
  { name: "Fashion Design and Technology", category: "Design", participation: "Individual / Team", summary: "Design and construct a garment that applies technology to the season's theme." },
  { name: "Flight Endurance", category: "Engineering", participation: "Individual", summary: "Build a rubber-band powered aircraft and fly it for maximum duration." },
  { name: "Forensic Science", category: "STEM", participation: "Team", summary: "Work a simulated crime scene using forensic laboratory techniques and report findings." },
  { name: "Future Technology and Engineering Teacher", category: "Leadership", participation: "Individual", summary: "Prepare and teach a technology lesson, then defend your instructional choices." },
  { name: "Geospatial Technology", category: "STEM", participation: "Team", summary: "Use GIS and remote sensing data to analyse and present a geographic problem." },
  { name: "Manufacturing Prototype", category: "Engineering", participation: "Team", summary: "Take a product from design through a manufactured prototype with full documentation." },
  { name: "Music Production", category: "Design", participation: "Individual / Team", summary: "Compose, record and mix an original track to the season's production brief." },
  { name: "On Demand Video", category: "Communications", participation: "Team", summary: "Produce a complete short video on site within a fixed time limit." },
  { name: "Photographic Technology", category: "Communications", participation: "Individual", summary: "Build a photographic portfolio and complete an on-site shooting challenge." },
  { name: "Prepared Presentation", category: "Communications", participation: "Individual", summary: "Deliver a rehearsed presentation on the season's assigned topic." },
  { name: "Promotional Design", category: "Design", participation: "Individual", summary: "Create promotional graphics for a given client brief and defend the design." },
  { name: "Robotics", category: "Engineering", participation: "Team", summary: "Design, build, program and drive a competition robot against the season's game." },
  { name: "Scientific Visualization (SciVis)", category: "Design", participation: "Team", summary: "Produce an animated visualisation that explains a scientific concept." },
  { name: "Senior Solar Sprint", category: "Engineering", participation: "Team", summary: "Engineer a solar-powered model vehicle and race it over a measured course." },
  { name: "Software Development", category: "Computer Science", participation: "Team", summary: "Ship a working software product with documentation, then demo and defend it." },
  { name: "Structural Design and Engineering", category: "Engineering", participation: "Team", summary: "Design and build a structure that carries load efficiently, with supporting analysis." },
  { name: "System Control Technology", category: "Engineering", participation: "Team", summary: "Build and program a working control system that solves an on-site automation problem." },
  { name: "Technology Bowl", category: "STEM", participation: "Team", summary: "Answer technology and TSA knowledge questions in a written test and head-to-head rounds." },
  { name: "Technology Problem Solving", category: "STEM", participation: "Team", summary: "Solve a surprise on-site engineering problem with limited materials and time." },
  { name: "Transportation Modeling", category: "Design", participation: "Individual / Team", summary: "Research, design and build a scale transportation model with documentation." },
  { name: "Virtual Reality Simulation (VR)", category: "Computer Science", participation: "Team", summary: "Build an interactive VR experience around the season's simulation theme." },
  { name: "Webmaster", category: "Computer Science", participation: "Team", summary: "Build and maintain a website to the season's brief and defend it in an interview." },
  { name: "Medical Technology", category: "STEM", participation: "Individual / Team", level: "PA only", summary: "Research a medical technology problem and present a documented solution." },
  { name: "Safety Illustration", category: "Design", participation: "Individual", level: "PA only", summary: "Produce a safety-focused illustration that communicates a hazard clearly." },
];

export const events: CompetitionEvent[] = seeds.map(build).sort((a, b) => a.name.localeCompare(b.name));

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
