import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { REGION_NOTE } from "@/lib/crops";
import { articleJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { EVERGREEN_DATE } from "@/lib/site";

const title = "Sowing times in Ireland";
const description =
  "Most Irish gardens start from this site's UK north list. No Irish month per crop, and no fixed number of weeks later.";
const path = "/ie/sowing";

export const metadata: Metadata = pageMeta({
  title,
  description,
  path,
});

const faqs = [
  {
    q: "Can I move every UK date by two weeks for Ireland?",
    a: "No. This site does not use a fixed shift in Britain, and it does not use one in Ireland. The north list is already a range of months. Frost, wet soil and a cold spring move a garden inside that range. They do not add a set number of days.",
  },
  {
    q: "What if the garden is on the south or east coast?",
    a: "It can be earlier than an inland or western garden, especially in a mild spring. Met Éireann’s climate figures show coastal stations have far fewer nights below freezing than inland stations. That is not a licence to copy the UK south list for every crop. Sow when the soil is workable, and keep the north list as the cautious start.",
  },
];

export default function IrelandSowingPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Ireland", path: "/ie" },
          { name: "Sowing times", path },
        ]}
      />
      <header>
        <p className="text-sm font-semibold text-robin">Ireland</p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Sowing times in Ireland</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          How the UK south and north ranges on this site compare with a garden in Ireland. Ranges, not a forecast, and not a new month for each crop.
        </p>
      </header>

      <div className="mt-8 space-y-4 leading-relaxed">
        <p>{REGION_NOTE}</p>
        <p>
          Open the{" "}
          <Link href="/planner" className="underline decoration-soil/60 underline-offset-2">
            sowing planner
          </Link>{" "}
          and choose North. That is the cautious start for most of Ireland: closer to the cooler, wetter end of the UK ranges than to the south-east of England. The south list is southern England, the Midlands and much of Wales. It is not a description of the south of Ireland. The{" "}
          <Link href="/ie" className="underline decoration-soil/60 underline-offset-2">
            Ireland hub
          </Link>{" "}
          says why, including the Met Éireann and Teagasc notes this reading rests on.
        </p>
        <p>
          Where the two lists differ, follow the north months. Where they are the same, that shared month is the range for both. Do not invent an earlier or later week inside the month. The list was never split into early, mid and late.
        </p>
        <p>
          A wet, cold soil is a reason to wait. Teagasc notes that waterlogged ground is slow to warm, and that soils are generally coldest in January and February. An early month on the UK south list is not a reason to sow into mud. Under cover, on a bright windowsill or in a greenhouse, is a different job from sowing outdoors. The crop page says which of those the UK lists include.
        </p>
        <p>
          The{" "}
          <Link href="/sowing-calendar-2027" className="underline decoration-soil/60 underline-offset-2">
            2027 sowing calendar
          </Link>{" "}
          uses the same crop months. The bank holidays printed on the sheets are England and Wales. They are not Irish public holidays. Use the sheets for the crop ranges, not for a day off.
        </p>
        <p>
          <Link href="/what-to-sow" className="underline decoration-soil/60 underline-offset-2">
            Month pages
          </Link>{" "}
          and the{" "}
          <Link href="/grow" className="underline decoration-soil/60 underline-offset-2">
            crop pages
          </Link>{" "}
          stay in the UK voice. Read the north column, then the note on the crop for spacing and what usually goes wrong. Nothing on those pages has been rewritten as an Irish date.
        </p>
      </div>

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
