import type { Project } from "@/lib/types";

/* ---------------------------------------------------------------------------
   PROJECT ARCHIVE
   ---------------------------------------------------------------------------
   The two entries below are TEMPLATES, not real projects. They exist so the
   layout can be checked before real work is added, and they are flagged with
   `isTemplate: true` so the site labels them as such.

   To add a real project: copy a template, set `isTemplate: false`, fill in
   every field, and drop photos into /public/projects/. Delete the templates
   once two real projects exist.
   --------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: "template-software-development",
    title: "PROJECT TITLE GOES HERE",
    year: "20XX–XX",
    event: "Software Development",
    eventSlug: "software-development",
    teamMembers: ["TEAM MEMBER 1", "TEAM MEMBER 2", "TEAM MEMBER 3"],
    placement: "PLACEMENT TBD",
    problem: null,
    solution: null,
    whatWeBuilt: null,
    results: null,
    whatWeLearned: null,
    images: [
      { src: null, alt: "Placeholder for a photo of the team's project", caption: "Hero shot — the finished build" },
      { src: null, alt: "Placeholder for a work-in-progress photo", caption: "Work in progress" },
      { src: null, alt: "Placeholder for a photo of the team at the conference", caption: "The team at states" },
    ],
    isTemplate: true,
  },
  {
    slug: "template-engineering-design",
    title: "PROJECT TITLE GOES HERE",
    year: "20XX–XX",
    event: "Engineering Design",
    eventSlug: "engineering-design",
    teamMembers: ["TEAM MEMBER 1", "TEAM MEMBER 2"],
    placement: "PLACEMENT TBD",
    problem: null,
    solution: null,
    whatWeBuilt: null,
    results: null,
    whatWeLearned: null,
    images: [
      { src: null, alt: "Placeholder for a photo of the prototype", caption: "Prototype" },
      { src: null, alt: "Placeholder for a documentation spread", caption: "Documentation spread" },
    ],
    isTemplate: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectYears = Array.from(new Set(projects.map((p) => p.year))).sort().reverse();
export const projectEvents = Array.from(new Set(projects.map((p) => p.event))).sort();
export const projectPlacements = Array.from(new Set(projects.map((p) => p.placement))).sort();
