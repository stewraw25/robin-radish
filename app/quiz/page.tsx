import { AffiliateNotice } from "@/components/affiliate-notice";
import { BirdQuiz } from "@/components/bird-quiz";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { affiliateUrl, merchants } from "@/lib/affiliates";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Bird food quiz",
  description:
    "Answer a few questions about the birds, feeder, foods and squirrels in your UK garden and get a short list of suitable foods.",
  path: "/quiz",
});

export default function QuizPage() {
  const shops = merchants
    .filter((merchant) => merchant.id === "haiths" || merchant.id === "cj-wildlife")
    .map((merchant) => ({ name: merchant.name, href: affiliateUrl(merchant.homepage) }));

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Bird food quiz", path: "/quiz" }]} />
      <header className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold text-robin">Garden birds</p>
        <h1 className="mt-2 font-heading text-4xl">Bird food quiz</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Tell us which birds you see, what feeder you have, how many foods you want to keep, and whether squirrels take a share. You get a short list of foods with plain reasons. It is not a ranking.
        </p>
      </header>
      <div className="mb-6">
        <AffiliateNotice />
      </div>
      <BirdQuiz shops={shops} />
      <noscript>
        <p className="mt-6 text-sm">This quiz runs in the browser. The winter bird food guide is available without it.</p>
      </noscript>
    </div>
  );
}
