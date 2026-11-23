import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AffiliateNotice } from "@/components/affiliate-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PrintGuideButton } from "@/components/print-guide-button";
import { JsonLd } from "@/components/json-ld";
import { AmazonSearchList } from "@/components/amazon-search-list";
import { ShopList } from "@/components/shop-list";
import { WeekPanel } from "@/components/week-panel";
import { isWithinWeek, londonToday, weekRangeLabel } from "@/lib/dates";
import { articleJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { getWeek, getWeeks } from "@/lib/weeks";

type Params = { week: string };

export function generateStaticParams() {
  return getWeeks().map((week) => ({ week: week.weekOf }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { week: weekOf } = await params;
  const week = getWeek(weekOf);
  if (!week) return {};
  const range = weekRangeLabel(week.weekOf);
  return pageMeta({
    title: `Garden jobs, ${range}`,
    description: week.intro,
    path: `/this-week/${week.weekOf}`,
    type: "article",
  });
}

export default async function WeekPage({ params }: { params: Promise<Params> }) {
  const { week: weekOf } = await params;
  const week = getWeek(weekOf);
  if (!week) notFound();
  const path = `/this-week/${week.weekOf}`;
  const range = weekRangeLabel(week.weekOf);

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "This week", path: "/this-week" },
              { name: range, path },
            ]}
          />
          <PrintGuideButton className="shrink-0" />
        </div>
      </div>
      <WeekPanel week={week} live={isWithinWeek(week.weekOf, londonToday())} heading="h1" />
      <div className="mx-auto w-full max-w-5xl space-y-4 px-4 py-10 sm:px-6 print:hidden">
        <h2 className="font-heading text-2xl">If you need to buy seed or food</h2>
        <AffiliateNotice />
        <AmazonSearchList ids={["vegetable-seeds", "sunflower-hearts"]} />
        <ShopList />
      </div>
      <JsonLd
        data={articleJsonLd({
          title: `This week in the garden: ${range}`,
          description: week.intro,
          path,
          datePublished: week.weekOf,
        })}
      />
    </>
  );
}
