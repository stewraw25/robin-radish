import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateNotice } from "@/components/affiliate-notice";
import { BirdSilhouette } from "@/components/bird-silhouette";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ShopList } from "@/components/shop-list";
import { birds, getBird, relatedBirds } from "@/lib/birds";
import { monthLabel, monthSlug } from "@/lib/crops";
import { monthsFeaturingBird } from "@/lib/month-notes";
import { articleJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { EVERGREEN_DATE } from "@/lib/site";

type Params = { species: string };

export function generateStaticParams() {
  return birds.map((bird) => ({ species: bird.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { species } = await params;
  const bird = getBird(species);
  if (!bird) return {};
  return pageMeta({
    title: bird.name,
    description: `${bird.summary} Food, feeder and nesting notes for a UK garden.`,
    path: `/birds/${bird.slug}`,
    type: "article",
  });
}

export default async function BirdPage({ params }: { params: Promise<Params> }) {
  const { species } = await params;
  const bird = getBird(species);
  if (!bird) notFound();
  const path = `/birds/${bird.slug}`;
  const related = relatedBirds(bird);
  const months = monthsFeaturingBird(bird.slug);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Garden birds", path: "/birds" },
          { name: bird.name, path },
        ]}
      />
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <BirdSilhouette slug={bird.slug} className="h-28 w-40 shrink-0 text-leaf" />
        <div>
          <p className="text-sm font-semibold text-robin">UK garden bird</p>
          <h1 className="mt-1 font-heading text-4xl sm:text-5xl">{bird.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{bird.summary}</p>
        </div>
      </header>
      <p className="mt-4 text-sm text-muted-foreground">The drawing is a silhouette for shape only. Colours are in the text.</p>

      <section className="mt-8 space-y-3">
        <h2 className="font-heading text-2xl">How to recognise one</h2>
        <p className="leading-relaxed">{bird.recognise}</p>
      </section>
      <section className="mt-8 space-y-3">
        <h2 className="font-heading text-2xl">Food and feeder</h2>
        <p className="leading-relaxed">{bird.food}</p>
        <p className="text-sm">
          <Link href="/quiz" className="font-medium underline decoration-soil/60 underline-offset-2">
            Try the bird food quiz
          </Link>
          <span className="text-muted-foreground"> if you want a short list of foods for the birds you actually see.</span>
        </p>
      </section>
      <section className="mt-8 space-y-3">
        <h2 className="font-heading text-2xl">Nesting</h2>
        <p className="leading-relaxed">{bird.nesting}</p>
      </section>

      {bird.feeder ? (
        <section className="mt-10">
          <h2 className="font-heading text-2xl">Buying food</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Straight foods such as sunflower hearts, suet and mealworms. This is not a ranking of shops or of any bag.
          </p>
          <div className="mt-3">
            <AffiliateNotice />
          </div>
          <div className="mt-4">
            <ShopList ids={["haiths", "cj-wildlife"]} />
          </div>
        </section>
      ) : null}

      {months.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-heading text-2xl">On the month pages</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {months.map((month) => (
              <li key={month}>
                <Link href={`/what-to-sow/${monthSlug(month)}`} className="inline-block rounded-full border border-border bg-card px-3 py-1 text-sm hover:border-primary">
                  {monthLabel(month)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-heading text-2xl">Related birds</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link href={`/birds/${item.slug}`} className="block rounded-xl border border-border bg-card p-3 hover:border-primary">
                <BirdSilhouette slug={item.slug} className="h-12 w-20 text-leaf" />
                <span className="mt-1 block font-heading text-lg">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-sm">
        <Link href="/guides/feeder-hygiene" className="underline decoration-soil/60 underline-offset-2">
          Cleaning feeders
        </Link>
        <span className="text-muted-foreground"> · </span>
        <Link href="/guides/bird-food-for-winter" className="underline decoration-soil/60 underline-offset-2">
          Bird food for winter
        </Link>
        {bird.slug === "robin" ? (
          <>
            <span className="text-muted-foreground"> · </span>
            <Link href="/guides/attracting-robins" className="underline decoration-soil/60 underline-offset-2">
              Attracting robins
            </Link>
          </>
        ) : null}
      </p>

      <FaqList faqs={bird.faqs} />
      <JsonLd
        data={articleJsonLd({
          title: bird.name,
          description: bird.summary,
          path,
          datePublished: EVERGREEN_DATE,
        })}
      />
    </article>
  );
}
