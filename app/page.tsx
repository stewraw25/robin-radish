import Link from "next/link";
import { AffiliateNotice } from "@/components/affiliate-notice";
import { BirdSilhouette } from "@/components/bird-silhouette";
import { JsonLd } from "@/components/json-ld";
import { FeederMark, RadishMark, RobinMark, TrayMark } from "@/components/marks";
import { ShopList } from "@/components/shop-list";
import { WeekPanel } from "@/components/week-panel";
import { buttonVariants } from "@/components/ui/button";
import { birds } from "@/lib/birds";
import { MONTHS } from "@/lib/crops";
import { londonToday, weekRangeLabel } from "@/lib/dates";
import { CATEGORY_LABELS, getGuides } from "@/lib/guides";
import { monthNotes } from "@/lib/month-notes";
import { faqJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getWeeks, pickCurrentWeek, weekIsLive } from "@/lib/weeks";

export const metadata = pageMeta({
  title: "Robin & Radish | Grow food and feed garden birds",
  description:
    "A UK garden guide for growing vegetables and herbs at home and feeding garden birds. Weekly jobs, a sowing planner and starter guides.",
  path: "/",
  absoluteTitle: true,
});

const homeFaqs = [
  {
    q: "Is Robin & Radish a shop?",
    a: "No. It is a UK garden guide. Some links go to seed and bird-food shops. If an affiliate ID is set, the site may earn a commission when you buy. You do not pay extra.",
  },
  {
    q: "Will the sowing months suit my garden?",
    a: "They are general ranges for the north and south of the UK. Frost, soil and a cold spring all move the dates. Use them as a shortlist, then look at the weather you actually have.",
  },
  {
    q: "Do I have to feed birds all year?",
    a: "No. Winter is when natural food is harder to find and nights are long. If you do feed, keep the food fresh and the feeder clean.",
  },
];

export default function HomePage() {
  const weeks = getWeeks();
  const week = pickCurrentWeek(weeks);
  const upcoming = weeks.filter((item) => week && item.weekOf > week.weekOf).sort((a, b) => a.weekOf.localeCompare(b.weekOf)).slice(0, 2);
  const guides = getGuides();
  const monthNumber = Number(londonToday().slice(5, 7));
  const featuredBirds = ["robin", "blue-tit", "goldfinch", "blackbird"]
    .map((slug) => birds.find((bird) => bird.slug === slug))
    .filter((bird) => bird !== undefined);

  return (
    <>
      <section className="mx-auto grid w-full max-w-5xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-[1.3fr_0.7fr]">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-robin">UK gardens</p>
          <h1 className="mt-2 font-heading text-4xl leading-tight sm:text-5xl">Grow food. Feed the birds.</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Robin & Radish is one notebook for both jobs: what to sow and pick, and what to put in the feeder. Written for ordinary UK plots, not show gardens.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/this-week" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-base")}>
              This week in the garden
            </Link>
            <Link href="/planner" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-5 text-base")}>
              Open the sowing planner
            </Link>
            <Link href="/what-to-sow" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-5 text-base")}>
              What to sow by month
            </Link>
            <Link href="/sowing-calendar-2027" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 px-5 text-base")}>
              2027 sowing calendar
            </Link>
          </div>
          <p className="mt-4 text-sm">
            <Link href="/start-here" className="font-medium underline decoration-soil/60 underline-offset-2">
              Start here
            </Link>
            <span className="text-muted-foreground"> if you want the short path through the planner, the quiz and the first guides. The calendar is the same months, laid out to print.</span>
          </p>
          <aside className="mt-6 max-w-xl rounded-xl border border-border bg-card px-4 py-3 text-sm">
            <p className="font-medium text-foreground">Gardening outside the UK?</p>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              <Link href="/ie" className="font-medium text-foreground underline decoration-soil/60 underline-offset-2">
                Ireland
              </Link>{" "}
              is the first note: how the UK south and north ranges read from there. More countries are coming.
            </p>
          </aside>
        </div>
        <div className="flex flex-wrap items-end justify-center gap-2 rounded-3xl border border-border bg-card px-4 py-6 sm:px-6 sm:py-8" aria-hidden="true">
          <TrayMark className="h-16 w-20 sm:h-24 sm:w-28" />
          <RobinMark className="h-16 w-20 sm:h-24 sm:w-28" />
          <RadishMark className="h-20 w-14 sm:h-28 sm:w-20" />
          <FeederMark className="h-20 w-14 sm:h-28 sm:w-20" />
        </div>
      </section>

      {week ? <WeekPanel week={week} live={weekIsLive(week)} /> : (
        <section className="bg-primary px-4 py-12 text-primary-foreground">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-3xl">This week in the garden</h2>
            <p className="mt-3 max-w-2xl">There is no weekly note on the site yet.</p>
          </div>
        </section>
      )}

      {upcoming.length > 0 ? (
        <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          <h2 className="font-heading text-2xl">Late November and early December</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            The note above is this week. These are the next ones, each on its own dates, for the turn into December.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {upcoming.map((item) => (
              <li key={item.weekOf}>
                <Link href={`/this-week/${item.weekOf}`} className="block h-full rounded-xl border border-border bg-card p-4 hover:border-primary">
                  <span className="font-heading text-lg">{weekRangeLabel(item.weekOf)}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.title}. {item.intro}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="font-heading text-3xl">Two tools</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-heading text-2xl">Sowing planner</h3>
            <p className="mt-2 text-muted-foreground">
              Pick a month, and the north or the south of the UK if you want. See what to sow indoors, sow outdoors, plant and harvest from a list of common vegetables and herbs.
            </p>
            <Link href="/planner" className={cn(buttonVariants({ variant: "secondary" }), "mt-4 h-10 px-4")}>
              Plan a month
            </Link>
          </article>
          <article className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-heading text-2xl">Bird food quiz</h3>
            <p className="mt-2 text-muted-foreground">
              A few questions about the birds you see, your feeder, how many foods you want to keep, and whether squirrels visit. You get a short list with plain reasons.
            </p>
            <Link href="/quiz" className={cn(buttonVariants({ variant: "secondary" }), "mt-4 h-10 px-4")}>
              Take the quiz
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl">What to sow by month</h2>
          <Link href="/what-to-sow" className="text-sm font-medium underline decoration-soil/60 underline-offset-2">
            All months
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {MONTHS.map((month) => {
            const current = month.value === monthNumber;
            return (
              <li key={month.slug}>
                <Link
                  href={`/what-to-sow/${month.slug}`}
                  className={cn(
                    "block h-full rounded-xl border bg-card p-3 hover:border-primary",
                    current ? "border-primary" : "border-border",
                  )}
                  aria-current={current ? "date" : undefined}
                >
                  <span className="font-heading text-lg">{month.label}</span>
                  {current ? <span className="mt-1 block text-xs font-semibold text-robin">This month</span> : null}
                  <span className="mt-1 block text-sm text-muted-foreground">{monthNotes[month.value]?.hook}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl">Garden birds</h2>
          <Link href="/birds" className="text-sm font-medium underline decoration-soil/60 underline-offset-2">
            All {birds.length} birds
          </Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBirds.map((bird) => (
            <li key={bird.slug}>
              <Link href={`/birds/${bird.slug}`} className="block h-full rounded-xl border border-border bg-card p-3 hover:border-primary">
                <BirdSilhouette slug={bird.slug} className="h-14 w-24 text-leaf" />
                <span className="mt-1 block font-heading text-lg">{bird.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl">Starter guides</h2>
          <Link href="/guides" className="text-sm font-medium underline decoration-soil/60 underline-offset-2">
            All guides
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link href={`/guides/${guide.slug}`} className="block h-full rounded-xl border border-border bg-card p-5 hover:border-primary">
                <p className="text-xs font-semibold uppercase tracking-wide text-soil">{CATEGORY_LABELS[guide.category]}</p>
                <h3 className="mt-2 font-heading text-xl">{guide.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{guide.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-5xl space-y-4 px-4 py-12 sm:px-6">
        <h2 className="font-heading text-3xl">Shops</h2>
        <p className="max-w-3xl text-muted-foreground">
          Seed, plants and bird food, when you need to buy them. These are the shops this site links to. They are not a ranking.
        </p>
        <AffiliateNotice />
        <ShopList />
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="font-heading text-3xl">Common questions</h2>
        <div className="mt-4 space-y-3">
          {homeFaqs.map((faq) => (
            <details key={faq.q} className="rounded-xl border border-border bg-card px-4 py-3">
              <summary className="cursor-pointer font-medium">{faq.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
        <JsonLd data={faqJsonLd(homeFaqs)} />
      </section>
    </>
  );
}
