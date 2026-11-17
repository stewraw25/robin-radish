export function parseISODate(iso: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) throw new Error(`Invalid date: ${iso}`);
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
}

export function isMonday(iso: string): boolean {
  return parseISODate(iso).getUTCDay() === 1;
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Calendar date in Europe/London as YYYY-MM-DD. */
export function londonToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function formatLongDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseISODate(iso));
}

/** Monday–Sunday label, for example "16–22 November 2026". */
export function weekRangeLabel(weekOf: string): string {
  const start = parseISODate(weekOf);
  const end = parseISODate(addDays(weekOf, 6));
  const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", timeZone: "UTC" });
  const month = new Intl.DateTimeFormat("en-GB", { month: "long", timeZone: "UTC" });
  const year = start.getUTCFullYear();
  if (start.getUTCMonth() === end.getUTCMonth()) {
    return `${day.format(start)}–${day.format(end)} ${month.format(start)} ${year}`;
  }
  return `${day.format(start)} ${month.format(start)} – ${day.format(end)} ${month.format(end)} ${year}`;
}

export function isWithinWeek(weekOf: string, todayIso: string): boolean {
  return todayIso >= weekOf && todayIso <= addDays(weekOf, 6);
}
