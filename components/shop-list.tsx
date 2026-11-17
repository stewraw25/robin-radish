import { ShopLink } from "@/components/shop-link";
import { affiliateUrl, merchants, type MerchantId } from "@/lib/affiliates";

export function ShopList({ ids }: { ids?: MerchantId[] }) {
  const list = ids ? merchants.filter((merchant) => ids.includes(merchant.id)) : merchants;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {list.map((merchant) => (
        <li key={merchant.id} className="rounded-xl border border-border bg-card p-4">
          <ShopLink href={affiliateUrl(merchant.homepage)} className="text-base">
            {merchant.name}
          </ShopLink>
          <p className="mt-1 text-sm text-muted-foreground">{merchant.blurb}</p>
          <p className="mt-2 text-xs text-soil">Affiliate programme: {merchant.network}</p>
        </li>
      ))}
    </ul>
  );
}
