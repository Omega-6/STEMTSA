import type { TimelinePhase } from "@/lib/types";

/* ---------------------------------------------------------------------------
   TSA YEAR AT A GLANCE
   The months below describe the shape of a normal season. They are NOT
   Downingtown STEM's confirmed dates. Put real dates in `dateRange` as the
   officer team locks them in; until then the component shows "dates TBD".
   --------------------------------------------------------------------------- */

export const timeline: TimelinePhase[] = [
  { month: "Aug", dateRange: null, items: ["Recruitment", "Event selection"] },
  { month: "Sep", dateRange: null, items: ["Teams formed", "Project planning"] },
  { month: "Oct", dateRange: null, items: ["Research", "Prototyping"] },
  { month: "Nov", dateRange: null, items: ["Documentation"] },
  { month: "Dec", dateRange: null, items: ["Progress review"] },
  { month: "Jan", dateRange: null, items: ["Competition preparation"] },
  { month: "Feb", dateRange: null, items: ["Final preparation"] },
  { month: "Mar", dateRange: null, items: ["Submissions"] },
  { month: "Apr", dateRange: null, items: ["PA-TSA States"], emphasis: true },
  { month: "Jun", dateRange: null, items: ["Nationals"], emphasis: true },
];
