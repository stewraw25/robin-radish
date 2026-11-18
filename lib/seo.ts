import type { Metadata } from "next";
import { absoluteLanguages, isIrelandPath } from "@/lib/hreflang";
import { absolutePublicUrl, absoluteUrl, SITE_NAME } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  /** Skip the layout title template. Use on the homepage. */
  absoluteTitle?: boolean;
};

const TITLE_SUFFIX = " | Robin & Radish";
const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 155;

/** Keep the meta description within a length search results can show in full. */
export function fitDescription(description: string): string {
  const clean = description.replace(/\s+/g, " ").trim();
  if (clean.length <= DESCRIPTION_LIMIT) return clean;
  const cut = clean.slice(0, DESCRIPTION_LIMIT - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > 80 ? cut.slice(0, space) : cut).replace(/[,:;.\s]+$/, "")}.`;
}

/** Keep the rendered title, including the layout suffix, within a sensible length. */
export function fitTitle(title: string): string {
  if (title.length + TITLE_SUFFIX.length <= TITLE_LIMIT) return title;
  const max = TITLE_LIMIT - TITLE_SUFFIX.length;
  const cut = title.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return (space > 18 ? cut.slice(0, space) : cut).replace(/[|:—–-]+$/, "").trim();
}

export function pageMeta({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const visibleTitle = absoluteTitle ? title : fitTitle(title);
  const visibleDescription = fitDescription(description);
  const image = absolutePublicUrl("opengraph-image");

  return {
    title: absoluteTitle ? { absolute: visibleTitle } : visibleTitle,
    description: visibleDescription,
    alternates: {
      canonical: url,
      languages: absoluteLanguages(path),
    },
    openGraph: {
      title: visibleTitle,
      description: visibleDescription,
      url,
      siteName: SITE_NAME,
      type,
      locale: isIrelandPath(path) ? "en_IE" : "en_GB",
      images: [{ url: image, width: 1200, height: 630, alt: visibleTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: visibleTitle,
      description: visibleDescription,
      images: [image],
    },
  };
}
