import type { MetadataRoute } from "next";
import { birds } from "@/lib/birds";
import { crops, MONTHS } from "@/lib/crops";
import { getGuides } from "@/lib/guides";
import { absoluteLanguages } from "@/lib/hreflang";
import { absoluteUrl } from "@/lib/site";
import { getWeeks } from "@/lib/weeks";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/start-here", priority: 0.9, changeFrequency: "monthly" },
    { path: "/sowing-calendar-2027", priority: 0.8, changeFrequency: "yearly" },
    { path: "/this-week", priority: 0.9, changeFrequency: "weekly" },
    { path: "/what-to-sow", priority: 0.8, changeFrequency: "monthly" },
    { path: "/grow", priority: 0.7, changeFrequency: "monthly" },
    { path: "/birds", priority: 0.7, changeFrequency: "monthly" },
    { path: "/planner", priority: 0.8, changeFrequency: "monthly" },
    { path: "/quiz", priority: 0.8, changeFrequency: "monthly" },
    { path: "/guides", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.4, changeFrequency: "yearly" },
    { path: "/disclosure", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
    { path: "/ie", priority: 0.6, changeFrequency: "monthly" },
    { path: "/ie/sowing", priority: 0.7, changeFrequency: "monthly" },
  ] as const;

  const staticPages: MetadataRoute.Sitemap = pages.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path || "/"),
    changeFrequency,
    priority,
    alternates: { languages: absoluteLanguages(path || "/") },
  }));

  const weeks: MetadataRoute.Sitemap = getWeeks().map((week) => ({
    url: absoluteUrl(`/this-week/${week.weekOf}`),
    lastModified: week.weekOf,
    changeFrequency: "weekly" as const,
    priority: 0.6,
    alternates: { languages: absoluteLanguages(`/this-week/${week.weekOf}`) },
  }));

  const guides: MetadataRoute.Sitemap = getGuides().map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: guide.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: { languages: absoluteLanguages(`/guides/${guide.slug}`) },
  }));

  const months: MetadataRoute.Sitemap = MONTHS.map((month) => ({
    url: absoluteUrl(`/what-to-sow/${month.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: { languages: absoluteLanguages(`/what-to-sow/${month.slug}`) },
  }));

  const cropPages: MetadataRoute.Sitemap = crops.map((crop) => ({
    url: absoluteUrl(`/grow/${crop.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: { languages: absoluteLanguages(`/grow/${crop.slug}`) },
  }));

  const birdPages: MetadataRoute.Sitemap = birds.map((bird) => ({
    url: absoluteUrl(`/birds/${bird.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: { languages: absoluteLanguages(`/birds/${bird.slug}`) },
  }));

  return [...staticPages, ...months, ...cropPages, ...birdPages, ...weeks, ...guides];
}
