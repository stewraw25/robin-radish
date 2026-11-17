import Link from "next/link";
import { ShopLink } from "@/components/shop-link";
import { affiliateUrl, isShopHref } from "@/lib/affiliates";
import type { Block, Inline } from "@/lib/markdown";

const linkClass = "font-medium underline decoration-soil/60 underline-offset-2 hover:decoration-robin";

function RichText({ inlines }: { inlines: Inline[] }) {
  return inlines.map((inline, index) => {
    if (inline.type === "text") return <span key={index}>{inline.text}</span>;
    if (inline.type === "strong") return <strong key={index}>{inline.text}</strong>;
    if (inline.href.startsWith("/")) {
      return (
        <Link key={index} href={inline.href} className={linkClass}>
          {inline.text}
        </Link>
      );
    }
    if (isShopHref(inline.href)) {
      return (
        <ShopLink key={index} href={affiliateUrl(inline.href)}>
          {inline.text}
        </ShopLink>
      );
    }
    return (
      <a key={index} href={inline.href} className={linkClass} rel="noopener">
        {inline.text}
      </a>
    );
  });
}

export function GuideBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4 text-base leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={index} className="pt-4 font-heading text-2xl text-foreground">
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={index} className="pt-2 font-heading text-xl text-foreground">
              {block.text}
            </h3>
          );
        }
        if (block.type === "p") {
          return (
            <p key={index}>
              <RichText inlines={block.inlines} />
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <RichText inlines={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ol key={index} className="list-decimal space-y-2 pl-5">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <RichText inlines={item} />
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}
