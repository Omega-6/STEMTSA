/* Dates are stored as plain YYYY-MM-DD strings and formatted without the
   Date constructor's timezone behaviour, so server and client always agree. */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = MONTHS.map((m) => m.slice(0, 3));
const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const parseISO = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
};

export function formatDate(iso: string, style: "long" | "short" = "long") {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const { y, m, d } = parseISO(iso);
  const month = style === "long" ? MONTHS[m - 1] : MONTHS_SHORT[m - 1];
  return `${month} ${d}, ${y}`;
}

export function formatRange(start: string, end?: string) {
  if (!end) return formatDate(start);
  const a = parseISO(start);
  const b = parseISO(end);
  if (a.y === b.y && a.m === b.m) return `${MONTHS[a.m - 1]} ${a.d}–${b.d}, ${a.y}`;
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export const weekdayLabels = DAYS_SHORT;
export const monthName = (m: number) => MONTHS[m - 1];
export const monthShort = (m: number) => MONTHS_SHORT[m - 1];

/** Days in a month, 1-indexed month. */
export const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();

/** Weekday index (0 = Sunday) of the first of the month. */
export const firstWeekday = (y: number, m: number) => new Date(Date.UTC(y, m - 1, 1)).getUTCDay();

export const pad = (n: number) => String(n).padStart(2, "0");
export const isoOf = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

/** "3rd", "1st" — used for placements. */
export function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
