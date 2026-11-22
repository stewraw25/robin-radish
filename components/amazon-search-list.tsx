import { ShopLink } from "@/components/shop-link";
import {
  amazonSearch,
  amazonSearchUrl,
  type AmazonSearch,
  type AmazonSearchId,
} from "@/lib/affiliates";

export function AmazonSearchList({
  ids,
  items,
}: {
  ids?: AmazonSearchId[];
  items?: AmazonSearch[];
}) {
  const list: AmazonSearch[] = items ?? (ids ? ids.map(amazonSearch) : []);
  if (list.length === 0) return null;

  return (
    <ul className="grid gap-3 sm:grid-cols-2 print:hidden">
      {list.map((item) => (
        <li key={item.id} className="rounded-xl border border-border bg-card p-4">
          <ShopLink href={amazonSearchUrl(item.query)} className="text-base">
            {item.label} on Amazon
          </ShopLink>
          <p className="mt-1 text-sm text-muted-foreground">
            A search on Amazon.co.uk, not a particular product or a ranking.
          </p>
        </li>
      ))}
    </ul>
  );
}
