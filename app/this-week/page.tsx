import Link from "next/link";
import { connection } from "next/server";
import { AffiliateNotice } from "@/components/affiliate-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ShopList } from "@/components/shop-list";
import { WeekPanel } from "@/components/week-panel";
import { formatLongDate, weekRangeLabel } from "@/lib/dates";
import { pageMeta } from "@/lib/seo";
import { getWeeks, pickCurrentWeek, weekIsLive } from "@/lib/weeks";

export const metadata = pageMeta({
  title: "This week in the garden",
  description: "What to sow, what to harvest, and which garden birds to feed this week in a UK garden.",
  path: "/this-week",
});

export default async function ThisWeekPage() {
  await connection();
  const weeks = getWeeks();
  const current = pickCurrentWeek(weeks);

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "This week", path: "/this-week" }]} />
      </div>
      {current ? (
        <WeekPanel week={current} live={weekIsLive(current)} heading="h1" />
      ) : (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
          <h1 className="font-heading text-4xl">This week in the garden</h1>
          <p className="mt-3 text-muted-foreground">There is no weekly note yet.</p>
        </div>
      )}
      <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6">
        {weeks.length > 1 ? (
          <section>
            <h2 className="font-heading text-2xl">Other weeks</h2>
            <ul className="mt-3 space-y-2">
              {weeks
                .filter((week) => week.weekOf !== current?.weekOf)
                .map((week) => (
                  <li key={week.weekOf}>
                    <Link href={`/this-week/${week.weekOf}`} className="underline decoration-soil/60 underline-offset-2">
                      {weekRangeLabel(week.weekOf)}
                    </Link>
                    <span className="text-muted-foreground"> · {week.title}</span>
                  </li>
                ))}
            </ul>
          </section>
        ) : (
          <p className="text-sm text-muted-foreground">Older weekly notes will be listed here once more than one week is on the site.</p>
        )}
        <section className="space-y-4">
          <h2 className="font-heading text-2xl">If you need to buy seed or food</h2>
          <AffiliateNotice />
          <ShopList />
          {current ? (
            <p className="text-sm text-muted-foreground">Week starting {formatLongDate(current.weekOf)}.</p>
          ) : null}
        </section>
      </div>
    </>
  );
}
