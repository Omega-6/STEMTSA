import type { Faq } from "@/lib/types";
import { officialLinks, site } from "./site";

/* ---------------------------------------------------------------------------
   TSA HUB — frequently asked questions.
   Answers deliberately do NOT restate TSA rules. Where a rule decides the
   answer, we say so and link to the official source, because those rules
   change from season to season and we do not control them.
   --------------------------------------------------------------------------- */

export const faqs: Faq[] = [
  {
    question: "What event should I choose?",
    answer: [
      "Start from what you actually want to spend a season doing, not from which event looks easiest to place in. A build event means shop time and iteration. A documentation-heavy event means writing and revising. An on-site event means showing up cold and solving a problem in a few hours.",
      "Open the Compete page, filter by the category closest to your interests, and read three or four event summaries end to end. Then ask a VP of Competitions which of those the chapter is actually running this year.",
    ],
    links: [
      { label: "Browse every event", href: "/compete" },
      { label: "Ask an officer", href: site.askAQuestionForm },
    ],
  },
  {
    question: "Can I compete in multiple events?",
    answer: [
      "Usually yes, but there is a cap, and the real constraint is the conference schedule: two events scheduled in the same block cannot both be entered.",
      "The number of entries allowed per student is set by the current competition regulations and by PA-TSA, not by our chapter. Check the official regulations and confirm your specific combination with a VP of Competitions before you commit.",
    ],
    links: [
      { label: officialLinks.competitions.label, href: officialLinks.competitions.href },
      { label: officialLinks.paTsa.label, href: officialLinks.paTsa.href },
    ],
  },
  {
    question: "How do teams work?",
    answer: [
      "Team size is set per event by the official event guide, so it varies. Some events are strictly individual, some are strictly team, and some allow either.",
      "Within the chapter, teams are formed after the event selection form closes. Bring a group if you already have one — but expect the officer team to balance rosters so no event goes unfilled.",
    ],
    links: [{ label: "Check your event's page", href: "/compete" }],
  },
  {
    question: "Where are the rubrics?",
    answer: [
      "Rubrics are published by TSA inside each official event guide, and PA-TSA sometimes issues state-level modifications on top of them. We link to both rather than hosting our own copy, because an out-of-date rubric is worse than no rubric.",
      "Every event page on this site has a link straight to the official guide for that event.",
    ],
    links: [
      { label: officialLinks.competitions.label, href: officialLinks.competitions.href },
      { label: "Resources — rubrics", href: "/resources#competition" },
    ],
  },
  {
    question: "When are projects due?",
    answer: [
      "There are two different sets of dates and students routinely confuse them. Official TSA and PA-TSA submission deadlines come from the state and national organisations. Chapter checkpoints are set by our officer team and land earlier on purpose.",
      "The Deadlines view on the calendar shows both in one list, and marks anything whose date is not yet confirmed.",
    ],
    links: [{ label: "Deadlines only view", href: "/calendar?view=deadlines" }],
  },
  {
    question: "How does PA-TSA States work?",
    answer: [
      "The PA-TSA State Conference is the state-level competition. Students register through the chapter, compete in their entered events, and top finishers in qualifying events advance to the National Conference.",
      "Registration windows, venue, schedule and any state-specific rule modifications are published by PA-TSA. We link to them rather than restating them.",
    ],
    links: [
      { label: "Our PA-TSA page", href: "/pa-tsa" },
      { label: officialLinks.paTsaConference.label, href: officialLinks.paTsaConference.href },
    ],
  },
  {
    question: "How do I join TSA?",
    answer: [
      "Come to a chapter meeting, fill in the membership form, and pay national and state dues. You do not need prior experience, and you do not need to already know which event you want.",
      "Exact dues, deadlines and the membership form link are set each year by the officer team — see the announcements feed for the current ones.",
    ],
    links: [
      { label: "Chapter announcements", href: "/chapter#announcements" },
      { label: "Ask an officer", href: site.askAQuestionForm },
    ],
  },
  {
    question: "How do I get involved beyond my chapter?",
    answer: [
      "PA-TSA runs state committees and elects state officers, and both are open to members from any chapter. Committee work is the low-commitment way in; running for state office is the larger one.",
      "National TSA has its own officer team and programmes on top of that. Our PA-TSA page explains what each path involves and where the applications are posted.",
    ],
    links: [{ label: "Getting involved in PA-TSA", href: "/pa-tsa" }],
  },
];
