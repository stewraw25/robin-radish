import { ShopLink } from "@/components/shop-link";
import {
  AMAZON_DOMAIN,
  affiliateUrl,
  amazonSearchUrl,
  amazonTrackingConfigured,
  merchants,
  trackingConfigured,
} from "@/lib/affiliates";

export function AffiliateDisclosure() {
  return (
    <div className="mt-6 space-y-4 leading-relaxed">
      <p>
        As an Amazon Associate we earn from qualifying purchases. In plain terms: if you follow an Amazon link on this site and later buy something, Robin & Radish may earn a commission. You should not pay more because you clicked through.
      </p>
      <p>
        Some other links go to seed or bird-food shops. If the affiliate ID for that shop is set, and you buy after following the link, the site may earn a commission in the same way. If the ID is not set yet, the link goes straight to the shop and is not tracked.
      </p>
      <p>
        Shop links use <code className="rounded bg-secondary px-1">rel=&quot;sponsored nofollow noopener&quot;</code> and open in a new tab. A short notice appears on pages that contain those links.
      </p>
      <p>
        The site does not publish product reviews, star ratings, prices, awards or testimonials. A link is not a claim that one bag or one seed packet is better than another. Amazon links on this site are searches on {AMAZON_DOMAIN}, not a chosen product, unless a page says otherwise.
      </p>
      <h2 className="pt-4 font-heading text-2xl">Amazon</h2>
      <p>
        <ShopLink href={amazonSearchUrl("vegetable seeds")}>Amazon.co.uk</ShopLink>
        <span className="text-muted-foreground">
          {" "}
          · Amazon Associates
          {amazonTrackingConfigured() ? " · tracking is set" : " · tracking is not set yet"}
        </span>
      </p>
      <p className="text-sm text-muted-foreground">
        The same UK Associates account is used on Sleep Better Hub. Amazon asks every website that uses the tag to be listed on that account.
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
  );
}
