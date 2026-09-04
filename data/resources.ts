import type { LearningTrack, ResourceGroup } from "@/lib/types";
import { officialLinks } from "./site";

/* ---------------------------------------------------------------------------
   RESOURCES
   `href: null` renders as a visible "link needed" row instead of a dead link.
   `official: true` marks anything maintained by TSA or PA-TSA rather than by
   our chapter — the UI labels those separately on purpose.
   --------------------------------------------------------------------------- */

export const competitionResources: ResourceGroup[] = [
  {
    title: "Event guides & rules",
    blurb: "Published by TSA. These are the documents that actually decide your score.",
    links: [
      { label: "Official competition regulations & event guides", href: officialLinks.competitions.href, official: true },
      { label: "Themes & problems for the current season", href: officialLinks.themesAndProblems.href, official: true },
      { label: "PA-TSA state modifications", href: officialLinks.paTsa.href, official: true, note: "State-level changes layered on top of the national guide." },
      { label: "Submission requirements & upload portal", href: null, note: "Add the current season's submission portal link." },
    ],
  },
  {
    title: "Rubrics",
    blurb: "We link rather than host. A stale rubric costs points.",
    links: [
      { label: "Rubrics inside the official event guides", href: officialLinks.competitions.href, official: true },
      { label: "Chapter rubric-reading walkthrough", href: null, note: "Officer-written guide to reading a TSA rubric. Not written yet." },
    ],
  },
  {
    title: "Templates",
    blurb: "Chapter-made starting points. Always check them against the current guide.",
    links: [
      { label: "Documentation template", href: null, note: "Add Drive link." },
      { label: "Presentation template", href: null, note: "Add Drive link." },
      { label: "Engineering notebook template", href: null, note: "Add Drive link." },
      { label: "Example documentation from past teams", href: null, note: "Add once past teams give permission to share." },
    ],
  },
];

export const chapterResources: ResourceGroup[] = [
  {
    title: "Chapter resources",
    blurb: "Everything a member needs that lives inside our chapter.",
    links: [
      { label: "Meeting materials & slides", href: null, note: "Add Drive folder link." },
      { label: "New member guide", href: null, note: "Add Drive link." },
      { label: "Chapter forms (membership, event selection)", href: null, note: "Add form links." },
      { label: "Chapter Google Drive", href: null, note: "Add Drive link." },
      { label: "Officer documents", href: null, note: "Officer-only. Add restricted Drive link." },
    ],
  },
];

export const learningTracks: LearningTrack[] = [
  {
    field: "Computer Science",
    blurb: "For Software Development, Coding, Webmaster, VR Simulation and Cybersecurity.",
    skills: [
      { name: "Python", why: "The fastest language to get a working prototype in.", href: "https://docs.python.org/3/tutorial/" },
      { name: "JavaScript", why: "Needed for anything that runs in a browser.", href: "https://javascript.info" },
      { name: "React", why: "The standard way to build a multi-screen web interface.", href: "https://react.dev/learn" },
      { name: "Git & GitHub", why: "How a team of four edits the same project without losing work.", href: "https://docs.github.com/en/get-started/start-your-journey" },
      { name: "UI/UX", why: "Judges use your interface before they read your documentation.", href: "https://www.nngroup.com/articles/" },
    ],
  },
  {
    field: "Data Science",
    blurb: "For Data Science and Analytics, and any event with a dataset behind it.",
    skills: [
      { name: "Python for data", why: "The working language of the event.", href: "https://www.py4e.com/" },
      { name: "pandas", why: "Loading, cleaning and reshaping the supplied dataset.", href: "https://pandas.pydata.org/docs/user_guide/10min.html" },
      { name: "Statistics", why: "Knowing which claim your data actually supports.", href: "https://www.khanacademy.org/math/statistics-probability" },
      { name: "Data visualisation", why: "Most of the score is in whether the chart communicates.", href: "https://clauswilke.com/dataviz/" },
      { name: "Finding datasets", why: "Practice on real, messy data before the competition set arrives.", href: "https://archive.ics.uci.edu/" },
    ],
  },
  {
    field: "Engineering",
    blurb: "For Engineering Design, Manufacturing Prototype, Structural Design, Robotics and the vehicle events.",
    skills: [
      { name: "CAD", why: "Every build event wants dimensioned drawings.", href: "https://learn.onshape.com/" },
      { name: "Electronics", why: "Sensors, motors and wiring for control and robotics events.", href: "https://learn.sparkfun.com/tutorials" },
      { name: "Microcontrollers", why: "Arduino-class boards drive most chapter builds.", href: "https://docs.arduino.cc/" },
      { name: "Prototyping", why: "Getting to a rough working version early, then iterating.", href: "https://learn.adafruit.com/" },
      { name: "3D printing", why: "Fast custom parts, if you design for the printer.", href: "https://help.prusa3d.com/" },
    ],
  },
  {
    field: "Design & Media",
    blurb: "For Digital Video Production, Promotional Design, SciVis, Music Production and Photographic Technology.",
    skills: [
      { name: "Typography & layout", why: "The difference between a board that reads and one that does not.", href: "https://practicaltypography.com/" },
      { name: "Colour", why: "Contrast and legibility get judged even when nobody names them.", href: "https://www.nngroup.com/articles/color-contrast/" },
      { name: "Video editing", why: "Pacing and sound carry a short film more than the camera does.", href: "https://www.blackmagicdesign.com/products/davinciresolve/training" },
      { name: "Audio", why: "Bad audio sinks an otherwise strong video entry.", href: "https://manual.audacityteam.org/" },
    ],
  },
];
