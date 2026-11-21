import type { Metadata } from "next";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";

const base = pageMeta({
  title: "Amazon and shop links",
  description: "A short note that Robin & Radish uses Amazon Associates and other shop links. The full wording is on the affiliate disclosure page.",
  path: "/disclosure",
});

export const metadata: Metadata = {
  ...base,
  robots: { index: false, follow: true },
};

export default function AffiliateDisclosureAliasPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Affiliate disclosure", path: "/disclosure" }]} />
      <h1 className="font-heading text-4xl">Affiliate disclosure</h1>
      <AffiliateDisclosure />
    </div>
  );
}
