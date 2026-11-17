import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BirdSilhouette } from "@/components/bird-silhouette";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { getBird, type BirdSlug } from "@/lib/birds";
import {
  cropsInJob,
  JOB_LABELS,
  MONTHS,
  monthBySlug,
  monthLabel,
  monthSlug,
  REGION_NOTE,
  type Job,
  type Region,
} from "@/lib/crops";
import { monthNotes } from "@/lib/month-notes";
import { articleJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { EVERGREEN_DATE } from "@/lib/site";

const JOBS: Job[] = ["sow-indoors", "sow-outdoors", "plant", "harvest"];

type Params = { month: string };

export function generateStaticParams() {
  return MONTHS.map((month) => ({ month: month.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { month: slug } = await params;
  const month = monthBySlug(slug);
  if (!month) return {};
  const note = monthNotes[month.value];
  if (!note) return {};
  return pageMeta({
    title: `What to sow in ${month.label}`,
    description: `What to sow, plant and harvest in a UK garden in ${month.label}, with a north and south split. ${note.hook}`,
    path: `/what-to-sow/${month.slug}`,
    type: "article",
  });
}

export default async function MonthPage({ params }: { params: Promise<Params> }) {
  const { month: slug } = await params;
  const month = monthBySlug(slug);
  if (!month) notFound();
  const note = monthNotes[month.value];
  if (!note) notFound();

  const path = `/what-to-sow/${month.slug}`;
  const previous = month.value === 1 ? 12 : month.value - 1;
  const next = month.value === 12 ? 1 : month.value + 1;
  const southCount = new Set(JOBS.flatMap((job) => cropsInJob(month.value, "south", job).map((crop) => crop.slug))).size;
  const northCount = new Set(JOBS.flatMap((job) => cropsInJob(month.value, "north", job).map((crop) => crop.slug))).size;
  const birdLinks = note.birdSlugs
    .map((item) => getBird(item))
    .filter((bird): bird is NonNullable<ReturnType<typeof getBird>> => Boolean(bird));

  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "What to sow", path: "/what-to-sow" },
          { name: month.label, path },
        ]}
      />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold text-robin">UK sowing calendar</p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl">What to sow in {month.label}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{note.intro}</p>
      </header>

      <p className="mt-6 max-w-3xl rounded-xl border border-border bg-card px-4 py-3 text-sm leading-relaxed">{REGION_NOTE}</p>
      <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
        In the south, {southCount} {southCount === 1 ? "crop has" : "crops have"} a sowing, planting or harvest job this month. In the north, {northCount}. The lists are the same crops as the{" "}
        <Link href={`/planner?month=${month.value}`} className="font-medium text-foreground underline decoration-soil/60 underline-offset-2">
          sowing planner
        </Link>
        .
      </p>

      <div className="mt-10 space-y-10">
        {JOBS.map((job) => (
          <section key={job} aria-labelledby={`job-${job}`}>
            <h2 id={`job-${job}`} className="font-heading text-2xl">
              {JOB_LABELS[job]}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <RegionColumn month={month.value} region="south" job={job} />
              <RegionColumn month={month.value} region="north" job={job} />
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-2xl">Garden birds this month</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{note.birds}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {birdLinks.map((bird) => (
            <li key={bird.slug}>
              <Link href={`/birds/${bird.slug}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:border-primary">
                <BirdSilhouette slug={bird.slug as BirdSlug} className="h-14 w-20 shrink-0 text-leaf" />
                <span>
                  <span className="block font-heading text-lg">{bird.name}</span>
                  <span className="block text-sm text-muted-foreground">{bird.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/quiz" className="font-medium underline decoration-soil/60 underline-offset-2">
            Bird food quiz
          </Link>
          <span className="text-muted-foreground"> · </span>
          <Link href="/birds" className="font-medium underline decoration-soil/60 underline-offset-2">
            All garden birds
          </Link>
          <span className="text-muted-foreground"> · </span>
          <Link href="/guides/bird-food-for-winter" className="font-medium underline decoration-soil/60 underline-offset-2">
            Bird food for winter
          </Link>
        </p>
      </section>

      <nav className="mt-10 flex flex-wrap gap-4 text-sm" aria-label="Other months">
        <Link href={`/what-to-sow/${monthSlug(previous)}`} className="underline decoration-soil/60 underline-offset-2">
          {monthLabel(previous)}
        </Link>
        <Link href="/what-to-sow" className="underline decoration-soil/60 underline-offset-2">
          All months
        </Link>
        <Link href={`/what-to-sow/${monthSlug(next)}`} className="underline decoration-soil/60 underline-offset-2">
          {monthLabel(next)}
        </Link>
      </nav>

      <FaqList faqs={note.faqs} />
      <JsonLd
        data={articleJsonLd({
          title: `What to sow in ${month.label}`,
          description: note.intro,
          path,
          datePublished: EVERGREEN_DATE,
        })}
      />
    </article>
  );
}

function RegionColumn({ month, region, job }: { month: number; region: Region; job: Job }) {
  const list = cropsInJob(month, region, job);
  const label = region === "south" ? "South" : "North";
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="font-heading text-lg">{label}</h3>
      {list.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">Nothing in this list for the {label.toLowerCase()}.</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {list.map((crop) => (
            <li key={crop.slug}>
              <Link href={`/grow/${crop.slug}`} className="underline decoration-soil/60 underline-offset-2 hover:decoration-robin">
                {crop.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
