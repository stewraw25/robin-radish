import Link from "next/link";
import { connection } from "next/server";
import { AffiliateNotice } from "@/components/affiliate-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ShopList } from "@/components/shop-list";
import { SowingPlanner } from "@/components/sowing-planner";
import { monthLabel, monthSlug } from "@/lib/crops";
import { londonToday } from "@/lib/dates";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sowing planner",
  description:
    "Choose a month and a rough UK region to see what to sow indoors, sow outdoors, plant and harvest. General ranges for common vegetables and herbs.",
  path: "/planner",
});

export default async function PlannerPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  await connection();
  const query = await searchParams;
  const requested = Number(query.month);
  const month = requested >= 1 && requested <= 12 ? requested : Number(londonToday().slice(5, 7));

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Sowing planner", path: "/planner" }]} />
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold text-robin">Growing food</p>
        <h1 className="mt-2 font-heading text-4xl">Sowing planner</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Pick a month. Say whether the garden is roughly in the north or the south of the UK if you want the dates nudged. The list covers common vegetables and herbs, with general month ranges, not a forecast for your postcode.
        </p>
      </header>
      <SowingPlanner initialMonth={month} />
      <p className="mt-8 text-sm">
        <Link href={`/what-to-sow/${monthSlug(month)}`} className="font-medium underline decoration-soil/60 underline-offset-2">
          Read the {monthLabel(month)} sowing page
        </Link>
        <span className="text-muted-foreground">, including garden birds and common questions.</span>
      </p>
      <section className="mt-12 space-y-4">
        <h2 className="font-heading text-2xl">Seed and plants</h2>
        <AffiliateNotice />
        <ShopList ids={["thompson-morgan", "crocus"]} />
      </section>
    </div>
  );
}
