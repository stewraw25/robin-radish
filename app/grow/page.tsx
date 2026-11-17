import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { crops, type Crop } from "@/lib/crops";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Vegetables and herbs",
  description:
    "Sowing, planting, spacing and basic care for common UK vegetables and herbs, using the same month ranges as the sowing planner.",
  path: "/grow",
});

export default function GrowIndex() {
  const vegetables = crops.filter((crop) => crop.kind === "vegetable");
  const herbs = crops.filter((crop) => crop.kind === "herb");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Crops", path: "/grow" }]} />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold text-robin">Growing food</p>
        <h1 className="mt-2 font-heading text-4xl">Vegetables and herbs</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          One page for each crop in the planner. Months come from the shared list. Spacing and problems are general UK garden practice, not a forecast for your soil.
        </p>
      </header>
      <CropGroup title="Vegetables" crops={vegetables} />
      <CropGroup title="Herbs" crops={herbs} />
      <p className="mt-8 text-sm">
        <Link href="/what-to-sow" className="font-medium underline decoration-soil/60 underline-offset-2">
          What to sow by month
        </Link>
        <span className="text-muted-foreground"> · </span>
        <Link href="/planner" className="font-medium underline decoration-soil/60 underline-offset-2">
          Sowing planner
        </Link>
      </p>
    </div>
  );
}

function CropGroup({ title, crops: list }: { title: string; crops: Crop[] }) {
  return (
    <section className="mt-10">
      <h2 className="font-heading text-2xl">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((crop) => (
          <li key={crop.slug}>
            <Link href={`/grow/${crop.slug}`} className="block h-full rounded-xl border border-border bg-card p-4 hover:border-primary">
              <h3 className="font-heading text-xl">{crop.name}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{crop.note}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
