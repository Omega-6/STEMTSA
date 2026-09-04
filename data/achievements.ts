import type { Achievement } from "@/lib/types";

/* ---------------------------------------------------------------------------
   Results reported by the chapter. Numbers are placements, not point totals.
   Add the conference year in `stateResultsYear` when it is confirmed.
   --------------------------------------------------------------------------- */

export const stateResultsYear = "Most recent PA-TSA State Conference";
export const nationalResultsYear = "Most recent TSA National Conference";

export const stateAchievements: Achievement[] = [
  { event: "Animatronics", places: [3] },
  { event: "Biotechnology Design", places: [9] },
  { event: "Chapter Team", places: [8] },
  { event: "Chapter Team — Written", places: [4] },
  { event: "Computer-Aided Design (CAD), Architecture", places: [8] },
  { event: "Computer-Aided Design (CAD), Engineering", places: [3] },
  { event: "Data Science and Analytics", places: [5] },
  { event: "Digital Video Production", places: [3] },
  { event: "Drone Challenge (UAV)", places: [8] },
  { event: "Engineering Design", places: [5] },
  { event: "Extemporaneous Speech", places: [8] },
  { event: "Fashion Design and Technology", places: [9] },
  { event: "Future Technology & Engineering Teacher", places: [3, 8] },
  { event: "Manufacturing Prototype", places: [8] },
  { event: "Music Production", places: [2, 8] },
  { event: "Robotics", places: [6] },
  { event: "Senior Solar Sprint", places: [4, 10] },
  { event: "Software Development", places: [4, 10] },
  { event: "System Control Technology", places: [5] },
  { event: "Technology Problem Solving", places: [2] },
  { event: "Transportation Modeling", places: [9] },
  { event: "Virtual Reality Simulation (VR)", places: [5] },
  { event: "Webmaster", places: [8] },
  { event: "PA — Cybersecurity", places: [10] },
  { event: "PA — Medical Technology", places: [1, 7] },
  { event: "PA — Safety Illustration", places: [1] },
];

export const nationalAchievements: Achievement[] = [
  { event: "Forensic Science", places: [1] },
  { event: "Future Technology and Engineering Teacher", places: [3] },
  { event: "Geospatial Technology", places: [3] },
  { event: "Digital Video Production", places: [5] },
  { event: "Biotechnology", places: [6] },
  { event: "Software Development", places: [7] },
  { event: "Transportation Modeling", places: [8] },
];
