import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Start here",
  description: "A short path through Robin & Radish: the sowing planner, bird food quiz, this month, and the first guides.",
  path: "/start-here",
});

const groups = [
  {
    title: "Grow something",
    links: [
      { href: "/guides/starting-a-veg-patch", label: "Starting a vegetable patch" },
      { href: "/planner", label: "Sowing planner" },
      { href: "/what-to-sow", label: "What to sow, month by month" },
      { href: "/sowing-calendar-2027", label: "Sowing calendar 2027" },
      { href: "/grow/lettuce", label: "Lettuce" },
      { href: "/grow/radishes", label: "Radishes" },
      { href: "/grow/courgettes", label: "Courgettes" },
      { href: "/guides/sowing-under-cover", label: "Sowing under cover" },
      { href: "/guides/hungry-gap", label: "The hungry gap" },
      { href: "/guides/slugs-without-pellets", label: "Slugs without pellets" },
      { href: "/guides/herbs-small-space", label: "Herbs for a small space" },
      { href: "/guides/crop-rotation", label: "Crop rotation for a small plot" },
    ],
  },
  {
    title: "Feed the birds",
    links: [
      { href: "/quiz", label: "Bird food quiz" },
      { href: "/birds/robin", label: "Robin" },
      { href: "/birds/blue-tit", label: "Blue tit" },
      { href: "/birds/blackbird", label: "Blackbird" },
      { href: "/guides/bird-food-for-winter", label: "Bird food for winter" },
      { href: "/guides/feeding-birds-spring-summer", label: "Feeding birds in spring and summer" },
      { href: "/guides/feeder-hygiene", label: "Cleaning bird feeders" },
      { href: "/guides/water-for-garden-birds", label: "Water for garden birds" },
    ],
  },
];

export default function StartHerePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Start here", path: "/start-here" }]} />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold text-robin">New to the site</p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Start here</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Robin & Radish is a UK notebook for two jobs: growing food, and feeding garden birds. You do not need to read it from the top. Use the planner or the quiz, then open the page for the crop or the bird you actually have.
        </p>
      </header>
      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="font-heading text-2xl">{group.title}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl border border-border bg-card px-4 py-3 font-medium underline-offset-2 hover:border-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        The rest of the guides, including compost, no-dig beds and nest boxes, are on the{" "}
        <Link href="/guides" className="font-medium text-foreground underline decoration-soil/60 underline-offset-2">
          guides page
        </Link>
        . Crop and bird pages link back to the months they belong to.
      </p>
    </div>
  );
}
