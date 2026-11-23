import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PrintGuideButton } from "@/components/print-guide-button";
import { MONTHS, REGION_NOTE } from "@/lib/crops";
import { monthNotes } from "@/lib/month-notes";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "What to sow by month",
  description:
    "A UK month-by-month sowing calendar for vegetables and herbs, with separate notes for the north and the south, plus garden birds.",
  path: "/what-to-sow",
});

export default function WhatToSowIndex() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "What to sow", path: "/what-to-sow" }]} />
      <header className="max-w-3xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-robin">UK sowing calendar</p>
            <h1 className="mt-2 font-heading text-4xl">What to sow by month</h1>
          </div>
          <PrintGuideButton className="mt-0.5 shrink-0" />
        </div>
        <p className="mt-3 text-lg text-muted-foreground">
          Twelve pages from the same crop list as the sowing planner. Each one shows what to sow indoors, sow outdoors, plant and harvest, then a note on garden birds.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{REGION_NOTE}</p>
      </header>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MONTHS.map((month) => (
          <li key={month.slug}>
            <Link href={`/what-to-sow/${month.slug}`} className="block h-full rounded-xl border border-border bg-card p-4 hover:border-primary">
              <h2 className="font-heading text-2xl">{month.label}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{monthNotes[month.value]?.hook}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm">
        <Link href="/planner" className="font-medium underline decoration-soil/60 underline-offset-2">
          Open the sowing planner
        </Link>
        <span className="text-muted-foreground"> · </span>
        <Link href="/sowing-calendar-2027" className="font-medium underline decoration-soil/60 underline-offset-2">
          2027 sowing calendar
        </Link>
        <span className="text-muted-foreground"> · </span>
        <Link href="/grow" className="font-medium underline decoration-soil/60 underline-offset-2">
          Browse crops
        </Link>
      </p>
    </div>
  );
}
