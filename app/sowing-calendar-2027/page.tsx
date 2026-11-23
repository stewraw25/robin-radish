import { statSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { AffiliateNotice } from "@/components/affiliate-notice";
import { AmazonSearchList } from "@/components/amazon-search-list";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PrintGuideButton } from "@/components/print-guide-button";
import { ShopList } from "@/components/shop-list";
import { buttonVariants } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";
import { publicAsset } from "@/lib/site";
import { cn } from "@/lib/utils";

const downloads = [
  {
    file: "robin-radish-sowing-calendar-2027-A3.pdf",
    title: "Full A3 calendar",
    detail: "14 pages",
  },
  {
    file: "robin-radish-plotting-chart-2027-A3.pdf",
    title: "A3 plotting wallchart",
    detail: "1 page",
  },
  {
    file: "robin-radish-sowing-calendar-2027-march-A4-sample.pdf",
    title: "A4 March sample",
    detail: "1 page",
  },
] as const;

/** Decimal megabytes of a file in public/, read at build time. */
function fileSize(file: string): string {
  const bytes = statSync(path.join(process.cwd(), "public", file)).size;
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

export const metadata = pageMeta({
  title: "UK sowing calendar 2027",
  description:
    "Free A3 sowing calendar (14 pages), A3 plotting chart and A4 March sample for 2027. Crop months match the planner.",
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
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-robin">Free downloads</p>
            <h1 className="mt-2 font-heading text-4xl sm:text-5xl">UK sowing calendar 2027</h1>
          </div>
          <PrintGuideButton className="mt-0.5 shrink-0" />
        </div>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Three free PDFs. The full calendar is A3 and 14 pages. The plotting wallchart is one A3 sheet. March is also an A4 page for a home printer. Crop months are the same list as the{" "}
          <Link href="/planner" className="underline decoration-soil/60 underline-offset-2">
            sowing planner
          </Link>
          . South is southern England, the Midlands and much of Wales. North is northern England and Scotland, where that list differs. Bank holidays on the sheet are England and Wales. In Ireland, read{" "}
          <Link href="/ie/sowing" className="underline decoration-soil/60 underline-offset-2">
            sowing times in Ireland
          </Link>{" "}
          before treating these months as local.
        </p>
      </header>
      <ul className="mt-6 grid gap-3">
        {downloads.map((item) => {
          const size = fileSize(item.file);
          return (
            <li key={item.file}>
              <a
                href={publicAsset(item.file)}
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-auto min-h-11 w-full justify-start px-5 py-3 text-left text-base whitespace-normal")}
                download
              >
                <span>
                  {item.title}
                  <span className="mt-0.5 block text-sm font-normal text-muted-foreground">
                    {item.detail}. Free. {size}.
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Jobs are written for the whole month. The list does not pin a sowing to one day, or to early, mid or late. The plates are drawings made for this calendar. They are not photographs.
      </p>
      <p className="mt-4 text-sm leading-relaxed">
        <Link href="/what-to-sow" className="underline decoration-soil/60 underline-offset-2">
          What to sow by month
        </Link>
        <span className="text-muted-foreground">, </span>
        <Link href="/guides/hardening-off" className="underline decoration-soil/60 underline-offset-2">
          hardening off
        </Link>
        <span className="text-muted-foreground"> and </span>
        <Link href="/guides/successional-sowing" className="underline decoration-soil/60 underline-offset-2">
          sowing little and often
        </Link>
        <span className="text-muted-foreground"> use the same months.</span>
      </p>
      <div className="mt-8 space-y-8">
        <figure className="overflow-hidden rounded-xl border border-border bg-card">
          <Image
            src={publicAsset("calendar/cover.webp")}
            alt="Cover of the Robin and Radish UK sowing calendar for 2027, with a radish and robin plate."
            width={1131}
            height={1600}
            unoptimized
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">Cover of the full A3 calendar.</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-xl border border-border bg-card">
          <Image
            src={publicAsset("calendar/march.webp")}
            alt="March 2027 page, with a carrot and robin plate above the date grid."
            width={1131}
            height={1600}
            unoptimized
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            March, also the free A4 sample. Open a crop from{" "}
            <Link href="/grow" className="underline decoration-soil/60 underline-offset-2">
              the crop list
            </Link>{" "}
            for spacing and problems.
          </figcaption>
        </figure>
      </div>
      <section className="mt-10 space-y-4 print:hidden">
        <h2 className="font-heading text-2xl">Seed and sowing kit</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          If you are buying seed or trays to use with the calendar, these are searches and shops, not a ranking or a particular product.
        </p>
        <AffiliateNotice />
        <AmazonSearchList ids={["vegetable-seeds", "seed-trays", "seed-compost"]} />
        <ShopList ids={["thompson-morgan", "crocus"]} />
      </section>
      <section className="mt-10 rounded-xl border border-border bg-secondary/60 p-5">
        <h2 className="font-heading text-2xl">Glossy printed A3 poster coming soon</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A glossy printed poster of the plotting chart is in preparation. There is no price and nothing to buy. The PDF of the chart is one of the free downloads above.
        </p>
        <figure className="mt-5 overflow-hidden rounded-lg border border-border bg-card">
          <Image
            src={publicAsset("calendar/plotting-chart.webp")}
            alt="2027 sowing plotting chart. Filled bars are the south list. An outline is a month on the north list only."
            width={1600}
            height={1131}
            unoptimized
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            Each bar fills the whole month. It is not split into thirds.
          </figcaption>
        </figure>
      </section>
      <section className="mt-10 rounded-xl border border-border bg-card p-5" aria-labelledby="calendar-signup-heading">
        <h2 id="calendar-signup-heading" className="font-heading text-2xl">
          Email sign-up coming soon
        </h2>
        <p id="calendar-signup-note" className="mt-3 leading-relaxed text-muted-foreground">
          Coming soon. This box is a placeholder. It is switched off, so it does not collect an address and it sends nothing. There is no mailing list on this site yet. The note on{" "}
          <Link href="/privacy" className="underline decoration-soil/60 underline-offset-2">
            privacy
          </Link>{" "}
          says the same.
        </p>
        <fieldset disabled className="mt-4 min-w-0 border-0 p-0">
          <legend className="sr-only">Email sign-up, coming soon and switched off</legend>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="grid min-w-0 flex-1 gap-1.5">
              <label htmlFor="calendar-signup-email" className="text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="calendar-signup-email"
                type="email"
                inputMode="email"
                autoComplete="off"
                aria-describedby="calendar-signup-note"
                className="h-11 w-full rounded-lg border border-border bg-muted px-3 text-base text-foreground"
              />
            </div>
            <button
              type="button"
              className="h-11 shrink-0 rounded-lg border border-border bg-muted px-4 text-base font-medium text-foreground"
            >
              Sign up coming soon
            </button>
          </div>
        </fieldset>
      </section>
    </article>
  );
}
