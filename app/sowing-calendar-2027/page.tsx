import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { BASE_PATH } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

const download = `${BASE_PATH}/sowing-calendar-2027-a4.pdf`;

export const metadata = pageMeta({
  title: "UK sowing calendar 2027",
  description: "A free A4 sowing calendar for 2027, drawn from the same UK crop months as the planner. South and north are shown separately.",
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
          One sheet of the 32 crops already on this site. Filled bars are southern England, the Midlands and much of Wales. Hollow bars are northern England and Scotland where that list differs. It is a range, not a forecast for the year.
        </p>
      </header>
      <p className="mt-6">
        <a href={download} className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-base")} download>
          Download free A4 PDF
        </a>
      </p>
      <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <Image
          src="/sowing-calendar-2027-a4.png"
          alt="Preview of the Robin and Radish UK sowing calendar for 2027, A4 landscape."
          width={1638}
          height={1158}
          unoptimized
          className="h-auto w-full"
        />
        <figcaption className="px-4 py-3 text-sm text-muted-foreground">
          A4 landscape. The same months as the{" "}
          <Link href="/planner" className="underline decoration-soil/60 underline-offset-2">
            sowing planner
          </Link>
          . Open a crop from{" "}
          <Link href="/grow" className="underline decoration-soil/60 underline-offset-2">
            the crop list
          </Link>{" "}
          for spacing and problems.
        </figcaption>
      </figure>
      <section className="mt-10 rounded-xl border border-border bg-secondary/60 p-5">
        <h2 className="font-heading text-2xl">Glossy A3 poster coming soon</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A larger print of this calendar is in preparation. There is no price and nothing to buy here. The A4 PDF above is the free download.
        </p>
      </section>
    </article>
  );
}
