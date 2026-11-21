import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Affiliate disclosure",
  description: "How Robin & Radish uses Amazon Associates and other affiliate links, and what those links do and do not mean.",
  path: "/disclosure",
});

export default function DisclosurePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Affiliate disclosure", path: "/disclosure" }]} />
      <h1 className="font-heading text-4xl">Affiliate disclosure</h1>
      <AffiliateDisclosure />
    </div>
  );
}
