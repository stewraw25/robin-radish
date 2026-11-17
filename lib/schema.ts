import { absoluteUrl, getSiteUrl, SITE_NAME } from "@/lib/site";

export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  inLanguage = "en-GB",
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  inLanguage?: "en-GB" | "en-IE";
}) {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: site,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: site,
    },
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function organizationJsonLd() {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: site,
    description:
      "A UK garden guide about growing food at home and feeding garden birds.",
  };
}

export function websiteJsonLd() {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: site,
    description:
      "Grow-your-own food and garden bird feeding for UK gardens, with a weekly jobs note, a sowing planner, and plain guides.",
    inLanguage: "en-GB",
  };
}
