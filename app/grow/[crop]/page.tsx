import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateNotice } from "@/components/affiliate-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PrintGuideButton } from "@/components/print-guide-button";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { AmazonSearchList } from "@/components/amazon-search-list";
import { ShopList } from "@/components/shop-list";
import { amazonSearchesForCrop } from "@/lib/affiliates";
import { cropFaqs, cropSearchTitle, getCropCare, guidesForCrop, relatedCrops, whenToSowLead } from "@/lib/crop-care";
import {
  activeMonths,
  crops,
  formatMonthList,
  getCrop,
  JOB_LABELS,
  monthLabel,
  monthSlug,
  REGION_NOTE,
  type Job,
} from "@/lib/crops";
import { getGuide } from "@/lib/guides";
import { articleJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { EVERGREEN_DATE } from "@/lib/site";

const JOBS: { job: Job; field: "sowIndoors" | "sowOutdoors" | "plant" | "harvest" }[] = [
  { job: "sow-indoors", field: "sowIndoors" },
  { job: "sow-outdoors", field: "sowOutdoors" },
  { job: "plant", field: "plant" },
  { job: "harvest", field: "harvest" },
];

type Params = { crop: string };

export function generateStaticParams() {
  return crops.map((crop) => ({ crop: crop.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { crop: slug } = await params;
  const crop = getCrop(slug);
  if (!crop) return {};
  const question = cropSearchTitle(crop);
  const shorter = `Sow ${crop.name.toLowerCase()} in the UK`;
  const title = `${question} | Robin & Radish`.length <= 60 ? question : shorter;
  return pageMeta({
    title,
    description: `When to sow, plant and harvest ${crop.name.toLowerCase()} in the UK, plus spacing, position and common problems. General guidance for home gardens.`,
    path: `/grow/${crop.slug}`,
    type: "article",
  });
}

export default async function CropPage({ params }: { params: Promise<Params> }) {
  const { crop: slug } = await params;
  const crop = getCrop(slug);
  if (!crop) notFound();
  const care = getCropCare(crop.slug);
  const faqs = cropFaqs(crop);
  const path = `/grow/${crop.slug}`;
  const related = relatedCrops(crop.slug);
  const months = activeMonths(crop);
  const title = cropSearchTitle(crop);
  const guides = guidesForCrop(crop)
    .map((item) => getGuide(item))
    .filter((guide): guide is NonNullable<ReturnType<typeof getGuide>> => Boolean(guide));

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Crops", path: "/grow" },
          { name: crop.name, path },
        ]}
      />
      <header>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-robin">{crop.kind === "herb" ? "Herb" : "Vegetable"}</p>
            <h1 className="mt-2 font-heading text-4xl sm:text-5xl">{crop.name}</h1>
          </div>
          <PrintGuideButton className="mt-0.5 shrink-0" />
        </div>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{crop.note}</p>
      </header>

      <section className="mt-8">
        <h2 className="font-heading text-2xl">{title}</h2>
        <p className="mt-3 leading-relaxed">{whenToSowLead(crop)}</p>
        <p className="mt-3 text-sm leading-relaxed">
          <Link href="/planner" className="font-medium underline decoration-soil/60 underline-offset-2">
            Open the sowing planner
          </Link>
          <span className="text-muted-foreground"> and pick the month and the south or the north. The same months are on the </span>
          <Link href="/sowing-calendar-2027" className="font-medium underline decoration-soil/60 underline-offset-2">
            2027 sowing calendar
          </Link>
          <span className="text-muted-foreground">. The month pages below list the other crops in those weeks.</span>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{REGION_NOTE}</p>
        <ul className="mt-4 grid gap-3 md:hidden" aria-label={`Months for ${crop.name} in the south and the north of the UK`}>
          {JOBS.map(({ job, field }) => (
            <li key={job} className="rounded-xl border border-border bg-card p-4">
              <p className="font-semibold">{JOB_LABELS[job]}</p>
              <p className="mt-2 leading-relaxed"><span className="font-medium">South. </span>{formatMonthList(crop[field].south)}</p>
              <p className="mt-1 leading-relaxed"><span className="font-medium">North. </span>{formatMonthList(crop[field].north)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border md:block">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <caption className="sr-only">Months for {crop.name} in the south and the north of the UK</caption>
            <thead className="bg-secondary text-foreground">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">Job</th>
                <th scope="col" className="px-3 py-2 font-semibold">South</th>
                <th scope="col" className="px-3 py-2 font-semibold">North</th>
              </tr>
            </thead>
            <tbody>
              {JOBS.map(({ job, field }) => (
                <tr key={job} className="border-t border-border bg-card">
                  <th scope="row" className="px-3 py-3 font-medium">{JOB_LABELS[job]}</th>
                  <td className="px-3 py-3">{formatMonthList(crop[field].south)}</td>
                  <td className="px-3 py-3">{formatMonthList(crop[field].north)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-heading text-2xl">Position, spacing and care</h2>
        <p className="leading-relaxed">{care.position}</p>
        <p className="leading-relaxed">{care.spacing}</p>
        <p className="leading-relaxed">{care.care}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-2xl">Common problems</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          {care.problems.map((problem) => (
            <li key={problem}>{problem}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 print:hidden">
        <h2 className="font-heading text-2xl">Seeds and plants</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Seed and young plants for the vegetable garden. This is not a ranking, and it does not cover every shop.
        </p>
        <div className="mt-3">
          <AffiliateNotice />
        </div>
        <div className="mt-4 space-y-4">
          <AmazonSearchList items={amazonSearchesForCrop(crop)} />
          <ShopList ids={["thompson-morgan", "crocus"]} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-2xl">In the month pages</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {months.map((month) => (
            <li key={month}>
              <Link
                href={`/what-to-sow/${monthSlug(month)}`}
                className="inline-block rounded-full border border-border bg-card px-3 py-1 text-sm underline-offset-2 hover:border-primary"
              >
                {monthLabel(month)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-heading text-2xl">Related crops</h2>
          <ul className="mt-3 space-y-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/grow/${item.slug}`} className="underline decoration-soil/60 underline-offset-2">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {guides.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-heading text-2xl">Guides</h2>
          <ul className="mt-3 space-y-2">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`} className="underline decoration-soil/60 underline-offset-2">
                  {guide.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/planner" className="underline decoration-soil/60 underline-offset-2">
                Sowing planner
              </Link>
            </li>
            <li>
              <Link href="/sowing-calendar-2027" className="underline decoration-soil/60 underline-offset-2">
                UK sowing calendar 2027
              </Link>
            </li>
          </ul>
        </section>
      ) : null}

      <FaqList faqs={faqs} />
      <JsonLd
        data={articleJsonLd({
          title,
          description: crop.note,
          path,
          datePublished: EVERGREEN_DATE,
        })}
      />
    </article>
  );
}
