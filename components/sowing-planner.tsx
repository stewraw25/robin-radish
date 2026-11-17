"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  crops,
  JOB_LABELS,
  jobsInMonth,
  MONTHS,
  monthLabel,
  type Job,
  type Region,
} from "@/lib/crops";

const JOBS: Job[] = ["sow-indoors", "sow-outdoors", "plant", "harvest"];

export function SowingPlanner({ initialMonth }: { initialMonth: number }) {
  const [month, setMonth] = useState(initialMonth);
  const [region, setRegion] = useState<Region>("south");

  const grouped = useMemo(() => {
    const result = Object.fromEntries(JOBS.map((job) => [job, [] as typeof crops])) as Record<Job, typeof crops>;
    for (const crop of crops) {
      for (const job of jobsInMonth(crop, month, region)) {
        result[job].push(crop);
      }
    }
    return result;
  }, [month, region]);

  const total = new Set(JOBS.flatMap((job) => grouped[job].map((crop) => crop.slug))).size;
  const regionName = region === "south" ? "the south" : "the north";

  return (
    <form className="space-y-8" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-6 rounded-xl border border-border bg-card p-4 sm:p-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="month">Month</Label>
          <select
            id="month"
            name="month"
            value={month}
            onChange={(event) => setMonth(Number(event.target.value))}
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-base"
          >
            {MONTHS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Rough region</legend>
          <div className="grid gap-2">
            {(
              [
                ["south", "South", "Southern England, the Midlands and much of Wales."],
                ["north", "North", "Northern England and Scotland. Spring is often later."],
              ] as const
            ).map(([value, label, hint]) => (
              <label
                key={value}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-border px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-secondary"
              >
                <input
                  type="radio"
                  name="region"
                  value={value}
                  checked={region === value}
                  onChange={() => setRegion(value)}
                  className="mt-1 size-4 accent-primary"
                />
                <span>
                  <span className="block font-medium">{label}</span>
                  <span className="block text-sm text-muted-foreground">{hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="text-sm text-muted-foreground">
        {total} {total === 1 ? "crop" : "crops"} to sow, plant or pick in {monthLabel(month)} in {regionName}. These are general ranges, not a forecast for your garden.
      </p>

      {JOBS.map((job) => (
        <section key={job} aria-labelledby={`job-${job}`}>
          <h2 id={`job-${job}`} className="font-heading text-2xl">
            {JOB_LABELS[job]}
          </h2>
          {grouped[job].length === 0 ? (
            <p className="mt-3 text-muted-foreground">Nothing in this list for {JOB_LABELS[job].toLowerCase()} in {monthLabel(month)}.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
              {grouped[job].map((crop) => (
                <li key={crop.slug} className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-lg">
                      <Link href={`/grow/${crop.slug}`} className="underline decoration-soil/40 underline-offset-2 hover:decoration-robin">
                        {crop.name}
                      </Link>
                    </h3>
                    <Badge variant="secondary">{crop.kind === "herb" ? "Herb" : "Vegetable"}</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{crop.note}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </form>
  );
}
