import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateNotice } from "@/components/affiliate-notice";
import { BirdPhoto, BirdPhotoCredit } from "@/components/bird-photo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PrintGuideButton } from "@/components/print-guide-button";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { AmazonSearchList } from "@/components/amazon-search-list";
import { ShopList } from "@/components/shop-list";
import { amazonSearchesForFoodText } from "@/lib/affiliates";
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
    title: `What to feed a ${bird.name.toLowerCase()}`,
    description: `What to feed a ${bird.name.toLowerCase()} in a UK garden, plus how to recognise one and where it nests.`,
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
  const feedQuestion = `What should I feed a ${bird.name.toLowerCase()} in the UK?`;
  const faqs = [{ q: feedQuestion, a: bird.food }, ...bird.faqs];

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Garden birds", path: "/birds" },
          { name: bird.name, path },
        ]}
      />
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <BirdPhoto slug={bird.slug} variant="hero" priority />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-robin">UK garden bird</p>
              <h1 className="mt-1 font-heading text-4xl sm:text-5xl">{bird.name}</h1>
            </div>
            <PrintGuideButton className="mt-0.5 shrink-0" />
          </div>
          <p className="mt-3 text-lg text-muted-foreground">{bird.summary}</p>
        </div>
      </header>

      <section className="mt-8 space-y-3">
        <h2 className="font-heading text-2xl">How to recognise one</h2>
        <p className="leading-relaxed">{bird.recognise}</p>
      </section>
      <section className="mt-8 space-y-3">
        <h2 className="font-heading text-2xl">What to feed a {bird.name.toLowerCase()}</h2>
        <p className="leading-relaxed">{bird.food}</p>
        <p className="text-sm">
          <Link href="/quiz" className="font-medium underline decoration-soil/60 underline-offset-2">
            Try the bird food quiz
          </Link>
          <span className="text-muted-foreground"> if you want a short list of foods for the birds you actually see. </span>
          <Link href="/guides/bird-food-for-winter" className="font-medium underline decoration-soil/60 underline-offset-2">
            Winter food
          </Link>
          <span className="text-muted-foreground">, </span>
          <Link href="/guides/feeding-birds-spring-summer" className="font-medium underline decoration-soil/60 underline-offset-2">
            spring and summer
          </Link>
          <span className="text-muted-foreground"> and </span>
          <Link href="/guides/water-for-garden-birds" className="font-medium underline decoration-soil/60 underline-offset-2">
            water
          </Link>
          <span className="text-muted-foreground"> sit alongside the species notes.</span>
        </p>
      </section>
      <section className="mt-8 space-y-3">
        <h2 className="font-heading text-2xl">Nesting</h2>
        <p className="leading-relaxed">{bird.nesting}</p>
      </section>

      {bird.feeder ? (
        <section className="mt-10 print:hidden">
          <h2 className="font-heading text-2xl">Buying food</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Straight foods such as sunflower hearts, suet and mealworms. This is not a ranking of shops or of any bag.
          </p>
          <div className="mt-3">
            <AffiliateNotice />
          </div>
          <div className="mt-4 space-y-4">
            <AmazonSearchList items={amazonSearchesForFoodText(bird.food)} />
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
              <div className="rounded-xl border border-border bg-card p-3 hover:border-primary">
                <Link href={`/birds/${item.slug}`} className="block">
                  <BirdPhoto slug={item.slug} imageOnly className="aspect-[4/3] w-full" />
                  <span className="mt-2 block font-heading text-lg">{item.name}</span>
                </Link>
                <BirdPhotoCredit slug={item.slug} className="mt-1" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-sm">
        <Link href="/guides/feeder-hygiene" className="underline decoration-soil/60 underline-offset-2">
          Cleaning feeders
        </Link>
        <span className="text-muted-foreground"> · </span>
        <Link href="/guides/nest-boxes" className="underline decoration-soil/60 underline-offset-2">
          Nest boxes
        </Link>
        <span className="text-muted-foreground"> · </span>
        <Link href="/sowing-calendar-2027" className="underline decoration-soil/60 underline-offset-2">
          Sowing calendar
        </Link>
        {bird.slug === "bullfinch" ? (
          <>
            <span className="text-muted-foreground"> · </span>
            <Link href="/guides/netting-soft-fruit" className="underline decoration-soil/60 underline-offset-2">
              Netting fruit
            </Link>
          </>
        ) : null}
        {bird.slug === "robin" ? (
          <>
            <span className="text-muted-foreground"> · </span>
            <Link href="/guides/attracting-robins" className="underline decoration-soil/60 underline-offset-2">
              Attracting robins
            </Link>
          </>
        ) : null}
        {bird.slug === "wood-pigeon" ? (
          <>
            <span className="text-muted-foreground"> · </span>
            <Link href="/grow/kale" className="underline decoration-soil/60 underline-offset-2">
              Kale
            </Link>
          </>
        ) : null}
      </p>

      <FaqList faqs={faqs} />
      <JsonLd
        data={articleJsonLd({
          title: `What to feed a ${bird.name.toLowerCase()}`,
          description: bird.summary,
          path,
          datePublished: EVERGREEN_DATE,
        })}
      />
    </article>
  );
}
