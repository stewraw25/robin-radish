import Link from "next/link";
import { BirdPhoto, BirdPhotoCredit } from "@/components/bird-photo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { birds } from "@/lib/birds";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Garden birds",
  description:
    "How to recognise UK garden birds, what they eat, and where they nest. A photograph of each species, with no scores and no product claims.",
  path: "/birds",
});

export default function BirdsIndex() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Garden birds", path: "/birds" }]} />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold text-robin">Garden birds</p>
        <h1 className="mt-2 font-heading text-4xl">Birds in a UK garden</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {birds.length} species that turn up at feeders, on lawns, or in hedges, including winter thrushes.
        </p>
      </header>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {birds.map((bird) => (
          <li key={bird.slug}>
            <div className="h-full rounded-xl border border-border bg-card p-3 hover:border-primary">
              <Link href={`/birds/${bird.slug}`} className="flex items-start gap-3">
                <BirdPhoto slug={bird.slug} imageOnly className="aspect-[4/3] w-28 shrink-0" />
                <span className="min-w-0">
                  <span className="block font-heading text-xl">{bird.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{bird.summary}</span>
                </span>
              </Link>
              <BirdPhotoCredit slug={bird.slug} className="mt-2" />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm">
        <Link href="/quiz" className="font-medium underline decoration-soil/60 underline-offset-2">
          Bird food quiz
        </Link>
        <span className="text-muted-foreground"> · </span>
        <Link href="/what-to-sow" className="font-medium underline decoration-soil/60 underline-offset-2">
          What to sow this month
        </Link>
        <span className="text-muted-foreground"> · </span>
        <Link href="/guides/feeder-hygiene" className="font-medium underline decoration-soil/60 underline-offset-2">
          Cleaning feeders
        </Link>
      </p>
    </div>
  );
}
