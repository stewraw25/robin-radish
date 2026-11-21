import Link from "next/link";
import { AffiliateNotice } from "@/components/affiliate-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AmazonSearchList } from "@/components/amazon-search-list";
import { ShopList } from "@/components/shop-list";
import { SowingPlanner } from "@/components/sowing-planner";
import { londonToday } from "@/lib/dates";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sowing planner",
  description:
    "Choose a month and a rough UK region to see what to sow indoors, sow outdoors, plant and harvest. General ranges for common vegetables and herbs.",
  path: "/planner",
});

export default function PlannerPage() {
  const month = Number(londonToday().slice(5, 7));

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Sowing planner", path: "/planner" }]} />
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold text-robin">Growing food</p>
        <h1 className="mt-2 font-heading text-4xl">Sowing planner</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Pick a month. Say whether the garden is roughly in the north or the south of the UK if you want the dates nudged. The list covers common vegetables and herbs, with general month ranges, not a forecast for your postcode. In Ireland, start from the north list and read{" "}
          <Link href="/ie/sowing" className="font-medium text-foreground underline decoration-soil/60 underline-offset-2">
            sowing times in Ireland
          </Link>
          . The same months are on the{" "}
          <Link href="/sowing-calendar-2027" className="font-medium text-foreground underline decoration-soil/60 underline-offset-2">
            2027 sowing calendar
          </Link>
          .
        </p>
      </header>
      <SowingPlanner initialMonth={month} />
      <section className="mt-12 space-y-4">
        <h2 className="font-heading text-2xl">Seed and plants</h2>
        <AffiliateNotice />
        <AmazonSearchList ids={["vegetable-seeds", "seed-trays", "seed-compost"]} />
        <ShopList ids={["thompson-morgan", "crocus"]} />
      </section>
    </div>
  );
}
