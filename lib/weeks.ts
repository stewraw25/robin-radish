import fs from "node:fs";
import path from "node:path";
import { isMonday, isWithinWeek, londonToday } from "@/lib/dates";

export type WeekTask = {
  name: string;
  detail: string;
};

export type GardenWeek = {
  weekOf: string;
  title: string;
  intro: string;
  sow: WeekTask[];
  harvest: WeekTask[];
  birds: WeekTask[];
  food: WeekTask[];
  also: string[];
};

const WEEKS_DIR = path.join(process.cwd(), "content", "weeks");

function isTask(value: unknown): value is WeekTask {
  if (!value || typeof value !== "object") return false;
  const task = value as WeekTask;
  return typeof task.name === "string" && task.name.trim().length > 0 && typeof task.detail === "string" && task.detail.trim().length > 0;
}

function parseWeek(file: string, raw: string): GardenWeek {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new Error(`${file} is not valid JSON: ${error instanceof Error ? error.message : "parse error"}`);
  }
  if (!data || typeof data !== "object") throw new Error(`${file} must be a JSON object`);
  const week = data as Partial<GardenWeek>;
  if (typeof week.weekOf !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(week.weekOf)) {
    throw new Error(`${file} needs weekOf as YYYY-MM-DD`);
  }
  if (!isMonday(week.weekOf)) {
    throw new Error(`${file} weekOf ${week.weekOf} is not a Monday`);
  }
  const expectedName = `${week.weekOf}.json`;
  if (path.basename(file) !== expectedName) {
    throw new Error(`${file} should be named ${expectedName}`);
  }
  for (const key of ["title", "intro"] as const) {
    if (typeof week[key] !== "string" || !week[key].trim()) {
      throw new Error(`${file} is missing ${key}`);
    }
  }
  for (const key of ["sow", "harvest", "birds", "food"] as const) {
    if (!Array.isArray(week[key]) || week[key].length === 0 || !week[key].every(isTask)) {
      throw new Error(`${file} needs a non-empty ${key} list of { name, detail }`);
    }
  }
  if (!Array.isArray(week.also) || week.also.some((item) => typeof item !== "string" || !item.trim())) {
    throw new Error(`${file} needs an also list of strings`);
  }
  return week as GardenWeek;
}

export function getWeeks(): GardenWeek[] {
  if (!fs.existsSync(WEEKS_DIR)) return [];
  return fs
    .readdirSync(WEEKS_DIR)
    .filter((name) => name.endsWith(".json"))
    .map((name) => {
      const file = path.join(WEEKS_DIR, name);
      return parseWeek(file, fs.readFileSync(file, "utf8"));
    })
    .sort((a, b) => b.weekOf.localeCompare(a.weekOf));
}

export function getWeek(weekOf: string): GardenWeek | undefined {
  return getWeeks().find((week) => week.weekOf === weekOf);
}

/**
 * Latest note dated on or before today (London).
 * If every file is in the future, the earliest one is used so the page is not empty.
 */
export function pickCurrentWeek(weeks: GardenWeek[], today = londonToday()): GardenWeek | undefined {
  if (weeks.length === 0) return undefined;
  const chronological = [...weeks].sort((a, b) => a.weekOf.localeCompare(b.weekOf));
  const started = chronological.filter((week) => week.weekOf <= today);
  return started.at(-1) ?? chronological[0];
}

export function weekIsLive(week: GardenWeek, today = londonToday()): boolean {
  return isWithinWeek(week.weekOf, today);
}
