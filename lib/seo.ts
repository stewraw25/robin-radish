import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

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

  return {
    title: absoluteTitle ? { absolute: visibleTitle } : visibleTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        "en-GB": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: visibleTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_GB",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: visibleTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: visibleTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
