import Link from "next/link";
import type { GardenWeek, WeekTask } from "@/lib/weeks";
import { weekRangeLabel } from "@/lib/dates";

function TaskList({ tasks }: { tasks: WeekTask[] }) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.name}>
          <p className="font-semibold text-foreground">{task.name}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{task.detail}</p>
        </li>
      ))}
    </ul>
  );
}

export function WeekPanel({
  week,
  live,
  heading = "h2",
}: {
  week: GardenWeek;
  live: boolean;
  heading?: "h1" | "h2";
}) {
  const Title = heading;
  const range = weekRangeLabel(week.weekOf);
  return (
    <section aria-labelledby="week-heading" className="bg-primary text-primary-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <p className="text-sm font-semibold tracking-wide text-primary-foreground/80">This week in the garden</p>
        <Title id="week-heading" className="mt-2 font-heading text-3xl sm:text-4xl">
          {range}
        </Title>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-primary-foreground/90">{week.intro}</p>
        {live ? null : (
          <p className="mt-4 max-w-3xl rounded-lg bg-background/15 px-3 py-2 text-sm">
            This is the latest note on the site, and it covers an earlier week.
          </p>
        )}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl bg-card p-5 text-card-foreground">
            <h3 className="font-heading text-xl">Sow and plant</h3>
            <div className="mt-4">
              <TaskList tasks={week.sow} />
            </div>
          </article>
          <article className="rounded-xl bg-card p-5 text-card-foreground">
            <h3 className="font-heading text-xl">Harvest</h3>
            <div className="mt-4">
              <TaskList tasks={week.harvest} />
            </div>
          </article>
          <article className="rounded-xl bg-card p-5 text-card-foreground">
            <h3 className="font-heading text-xl">Birds to look for</h3>
            <div className="mt-4">
              <TaskList tasks={week.birds} />
            </div>
          </article>
          <article className="rounded-xl bg-card p-5 text-card-foreground">
            <h3 className="font-heading text-xl">What to put out</h3>
            <div className="mt-4">
              <TaskList tasks={week.food} />
            </div>
          </article>
        </div>
        {week.also.length > 0 ? (
          <div className="mt-4 rounded-xl bg-card p-5 text-card-foreground">
            <h3 className="font-heading text-xl">Also this week</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              {week.also.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {heading === "h2" ? (
          <p className="mt-6">
            <Link href={`/this-week/${week.weekOf}`} className="font-semibold underline decoration-primary-foreground/50 underline-offset-4">
              Open this week on its own page
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
