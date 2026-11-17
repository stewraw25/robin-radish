import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CATEGORY_LABELS, getGuides, type GuideCategory } from "@/lib/guides";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Starter guides",
  description: "UK guides on sowing, hardening off, blight, slugs, compost, and feeding garden birds.",
  path: "/guides",
});

const order: GuideCategory[] = ["grow", "birds"];

export default function GuidesPage() {
  const guides = getGuides();
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }]} />
      <header className="mb-8 max-w-3xl">
        <h1 className="font-heading text-4xl">Starter guides</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Short, evergreen notes for a UK garden. They stay put while the weekly jobs change. Written by Robin & Radish. No product scores.
        </p>
      </header>
      {order.map((category) => (
        <section key={category} className="mb-10">
          <h2 className="font-heading text-2xl">{CATEGORY_LABELS[category]}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {guides
              .filter((guide) => guide.category === category)
              .map((guide) => (
                <li key={guide.slug}>
                  <Link href={`/guides/${guide.slug}`} className="block h-full rounded-xl border border-border bg-card p-5 hover:border-primary">
                    <h3 className="font-heading text-xl">{guide.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{guide.description}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
