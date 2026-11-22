import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateNotice } from "@/components/affiliate-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PrintGuideButton } from "@/components/print-guide-button";
import { GuideBody } from "@/components/guide-body";
import { JsonLd } from "@/components/json-ld";
import { formatLongDate } from "@/lib/dates";
import { getGuide, getGuides } from "@/lib/guides";
import { articleJsonLd, faqJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { BYLINE } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMeta({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const path = `/guides/${guide.slug}`;
  const others = getGuides().filter((item) => item.slug !== guide.slug).slice(0, 3);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path },
        ]}
      />
      <header className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="font-heading text-4xl">{guide.title}</h1>
          <PrintGuideButton className="mt-1 shrink-0" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          By {BYLINE} · {formatLongDate(guide.date)}
        </p>
        <p className="mt-4 text-lg text-muted-foreground">{guide.description}</p>
      </header>
      {guide.hasShopLinks ? (
        <div className="mb-6">
          <AffiliateNotice />
        </div>
      ) : null}
      <GuideBody blocks={guide.blocks} />
      {others.length > 0 ? (
        <aside className="mt-12 border-t border-border pt-6">
          <h2 className="font-heading text-xl">More guides</h2>
          <ul className="mt-3 space-y-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/guides/${item.slug}`} className="underline decoration-soil/60 underline-offset-2">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          path,
          datePublished: guide.date,
        })}
      />
      <JsonLd data={faqJsonLd(guide.faqs)} />
    </article>
  );
}
