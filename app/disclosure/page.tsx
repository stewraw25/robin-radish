import { Breadcrumbs } from "@/components/breadcrumbs";
import { ShopLink } from "@/components/shop-link";
import { affiliateUrl, merchants, trackingConfigured } from "@/lib/affiliates";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Affiliate disclosure",
  description: "How Robin & Radish uses affiliate links to seed and bird-food shops, and what those links do and do not mean.",
  path: "/disclosure",
});

export default function DisclosurePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Affiliate disclosure", path: "/disclosure" }]} />
      <h1 className="font-heading text-4xl">Affiliate disclosure</h1>
      <div className="mt-6 space-y-4 leading-relaxed">
        <p>
          Robin & Radish is a guide. Some links go to shops. If the affiliate ID for that shop is set, and you buy after following the link, the site may earn a commission. You should not pay more because you clicked through. If the ID is not set yet, the link goes straight to the shop and is not tracked.
        </p>
        <p>
          Shop links use <code className="rounded bg-secondary px-1">rel=&quot;sponsored nofollow noopener&quot;</code> and open in a new tab. A short notice appears on pages that contain those links.
        </p>
        <p>
          The site does not publish product reviews, star ratings, prices, awards or testimonials. A link is not a claim that one bag or one seed packet is better than another.
        </p>
        <h2 className="pt-4 font-heading text-2xl">Shops and networks</h2>
        <ul className="space-y-4">
          {merchants.map((merchant) => (
            <li key={merchant.id}>
              <ShopLink href={affiliateUrl(merchant.homepage)}>{merchant.name}</ShopLink>
              <span className="text-muted-foreground">
                {" "}
                · {merchant.network}
                {trackingConfigured(merchant) ? " · tracking ID is set" : " · tracking ID is not set yet"}
              </span>
              <p className="text-sm text-muted-foreground">{merchant.blurb}</p>
            </li>
          ))}
        </ul>
        <p>
          Thompson & Morgan, Crocus and CJ Wildlife are on Awin. Haith&apos;s has used Webgains. Programme terms can change. The owner confirms the programmes before relying on them.
        </p>
      </div>
    </div>
  );
}
