import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PrintGuideButton } from "@/components/print-guide-button";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { REGION_NOTE } from "@/lib/crops";
import { articleJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { EVERGREEN_DATE } from "@/lib/site";

const title = "Gardening in Ireland";
const description =
  "How to read this site's UK south and north sowing ranges from Ireland. Most gardens start from the north list. Not a forecast.";
const path = "/ie";

export const metadata: Metadata = pageMeta({
  title,
  description,
  path,
});

const faqs = [
  {
    q: "Which UK list should I use in Ireland?",
    a: "Start with the north list for most gardens. On this site that list is northern England and Scotland, and it is the cautious match for a mild, wet, oceanic climate. It is not an Irish sowing calendar, and it is not a forecast for your garden. A sheltered spot on the south or east coast can be earlier in a mild spring. A cold, wet spring can hold any garden back.",
  },
  {
    q: "Do you publish an Irish month for each crop?",
    a: "No. The crop pages keep the UK south and north ranges. This section only says how to read those ranges from Ireland. It does not add a third column.",
  },
];

export default function IrelandPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Ireland", path },
        ]}
      />
      <header>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-robin">Ireland</p>
            <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Gardening in Ireland</h1>
          </div>
          <PrintGuideButton className="mt-0.5 shrink-0" />
        </div>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          This is the first country note outside Britain. The crop months on the rest of the site are UK ranges. Ireland does not have its own month for each crop here.
        </p>
      </header>

      <div className="mt-8 space-y-4 leading-relaxed">
        <p>{REGION_NOTE}</p>
        <p>
          <a className="underline decoration-soil/60 underline-offset-2" href="https://www.met.ie/climate/what-we-measure/temperature">
            Met Éireann
          </a>{" "}
          describes the Atlantic as moderating temperatures across Ireland: relatively mild winters and cool summers, rather than continental extremes. Excluding upland areas, mean annual temperatures generally range between 9°C and 12°C, from the northeast to the southwest. Inland stations vary more than coastal ones, and are colder in winter. Minimum air temperature falls below zero on about 40 days a year at inland stations, and on less than 10 days a year in most coastal areas. Those are climate figures, not sowing dates.
        </p>
        <p>
          <a
            className="underline decoration-soil/60 underline-offset-2"
            href="https://teagasc.ie/wp-content/uploads/media/website/publications/2020/A-Guide-to-Vegetable-Growing---9th-Edition.pdf"
          >
            Teagasc’s vegetable guide
          </a>{" "}
          describes a cool, damp climate, and notes that a soil which holds a lot of water is slow to warm. Soils are generally coldest in January and February. If the ground is wet and cold, wait, even when a month on the UK list has started.
        </p>
        <p>
          The cautious reading used here: most of Ireland follows roughly the cooler, wetter end of the UK ranges. On these pages that is the north list. The planner has no separate west column. Wales sits in the south definition, so do not treat “west” as a third set of months. A sheltered garden in the south or east of Ireland may move toward the south list in a mild spring. This site will not say which crop, or by how many weeks. There is no fixed shift.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-heading text-2xl">Where to go next</h2>
        <ul className="mt-3 space-y-2">
          <li>
            <Link href="/ie/sowing" className="underline decoration-soil/60 underline-offset-2">
              Sowing times in Ireland
            </Link>
            <span className="text-muted-foreground">, and how they compare with the two UK lists.</span>
          </li>
          <li>
            <Link href="/planner" className="underline decoration-soil/60 underline-offset-2">
              Sowing planner
            </Link>
            <span className="text-muted-foreground">. Choose the north list unless you have a reason not to.</span>
          </li>
          <li>
            <Link href="/what-to-sow" className="underline decoration-soil/60 underline-offset-2">
              What to sow by month
            </Link>
            <span className="text-muted-foreground">, still written as UK south and north.</span>
          </li>
          <li>
            <Link href="/sowing-calendar-2027" className="underline decoration-soil/60 underline-offset-2">
              UK sowing calendar 2027
            </Link>
            <span className="text-muted-foreground">. The bank holidays printed on it are England and Wales, not Ireland.</span>
          </li>
          <li>
            <Link href="/grow" className="underline decoration-soil/60 underline-offset-2">
              Crop pages
            </Link>
            <span className="text-muted-foreground">. Spacing and problems, with the same UK months.</span>
          </li>
        </ul>
      </section>

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        The bird notes are written for Britain. This section does not add a separate Irish bird list. More countries are coming. They are not here yet.
      </p>

      <FaqList faqs={faqs} />
      <JsonLd
        data={articleJsonLd({
          title,
          description,
          path,
          datePublished: EVERGREEN_DATE,
          inLanguage: "en-IE",
        })}
      />
    </article>
  );
}
