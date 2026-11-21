import Link from "next/link";
import { BirdSilhouette } from "@/components/bird-silhouette";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { birds } from "@/lib/birds";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Garden birds",
  description:
    "How to recognise UK garden birds, what they eat, and where they nest. Silhouettes show shape. No scores and no product claims.",
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
          {birds.length} species that turn up at feeders, on lawns, or in hedges, including winter thrushes. The drawings are silhouettes, to show shape. Colour is described in the text.
        </p>
      </header>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {birds.map((bird) => (
          <li key={bird.slug}>
            <Link href={`/birds/${bird.slug}`} className="flex h-full items-center gap-3 rounded-xl border border-border bg-card p-3 hover:border-primary">
              <BirdSilhouette slug={bird.slug} className="h-16 w-24 shrink-0 text-leaf" />
              <span>
                <span className="block font-heading text-xl">{bird.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{bird.summary}</span>
              </span>
            </Link>
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
