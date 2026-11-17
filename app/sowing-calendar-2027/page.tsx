import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { BASE_PATH } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

const download = `${BASE_PATH}/sowing-calendar-2027-sample.pdf`;

export const metadata = pageMeta({
  title: "UK sowing calendar 2027",
  description:
    "Free A4 sample of the 2027 wall calendar: March, with England and Wales bank holidays. Crop months match the sowing planner.",
  path: "/sowing-calendar-2027",
});

export default function SowingCalendarPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Sowing calendar 2027", path: "/sowing-calendar-2027" },
        ]}
      />
      <header>
        <p className="text-sm font-semibold text-robin">Free download</p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl">UK sowing calendar 2027</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          A month to a sheet: a plate drawing on the top half, and the 2027 dates underneath. The free file is March, for a home printer. Crop months are the same list as the{" "}
          <Link href="/planner" className="underline decoration-soil/60 underline-offset-2">
            sowing planner
          </Link>
          . South is southern England, the Midlands and much of Wales. North is northern England and Scotland, where that list differs. Bank holidays on the sheet are England and Wales.
        </p>
      </header>
      <p className="mt-6">
        <a href={download} className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-base")} download>
          Download free A4 sample
        </a>
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Jobs are written for the whole month. The list does not pin a sowing to one day, or to early, mid or late. The plates are drawings made for this calendar. They are not photographs.
      </p>
      <div className="mt-8 space-y-8">
        <figure className="overflow-hidden rounded-xl border border-border bg-card">
          <Image
            src="/sowing-calendar-2027-cover.png"
            alt="Cover of the Robin and Radish UK sowing calendar for 2027, with a tomato and robin plate."
            width={1287}
            height={1820}
            unoptimized
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">Cover.</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-xl border border-border bg-card">
          <Image
            src="/sowing-calendar-2027-spread.png"
            alt="March 2027 page, with a carrot and robin plate above a Monday-start calendar. Good Friday and Easter Monday are marked."
            width={1287}
            height={1820}
            unoptimized
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            March, the free sample. Open a crop from{" "}
            <Link href="/grow" className="underline decoration-soil/60 underline-offset-2">
              the crop list
            </Link>{" "}
            for spacing and problems.
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-xl border border-border bg-card">
          <Image
            src="/sowing-calendar-2027-overview.png"
            alt="Year at a glance for 32 crops, with whole-month bars for sowing, planting and harvest."
            width={1287}
            height={1820}
            unoptimized
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            Year at a glance. A bar fills the month. It is not split into thirds.
          </figcaption>
        </figure>
      </div>
      <section className="mt-10 rounded-xl border border-border bg-secondary/60 p-5">
        <h2 className="font-heading text-2xl">Glossy A3 poster coming soon</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A larger timeline poster is in preparation. There is no price and nothing to buy here. The March PDF above is the free download.
        </p>
        <figure className="mt-5 overflow-hidden rounded-lg border border-border bg-card">
          <Image
            src="/sowing-calendar-2027-timeline.png"
            alt="Timeline poster preview: crop rows across the twelve months, with separate colours for sowing under cover, sowing outside, planting and harvest."
            width={1638}
            height={1158}
            unoptimized
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            The poster marks early, mid and late only as a ruler. Each pill still fills the whole month.
          </figcaption>
        </figure>
      </section>
    </article>
  );
}
