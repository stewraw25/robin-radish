import type { MetadataRoute } from "next";
import { getGuides } from "@/lib/guides";
import { getSiteUrl } from "@/lib/site";
import { getWeeks } from "@/lib/weeks";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/this-week", priority: 0.9, changeFrequency: "weekly" },
    { path: "/planner", priority: 0.8, changeFrequency: "monthly" },
    { path: "/quiz", priority: 0.8, changeFrequency: "monthly" },
    { path: "/guides", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.4, changeFrequency: "yearly" },
    { path: "/disclosure", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
  ] as const;

  const staticPages: MetadataRoute.Sitemap = pages.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    changeFrequency,
    priority,
  }));

  const weeks: MetadataRoute.Sitemap = getWeeks().map((week) => ({
    url: `${base}/this-week/${week.weekOf}`,
    lastModified: week.weekOf,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const guides: MetadataRoute.Sitemap = getGuides().map((guide) => ({
    url: `${base}/guides/${guide.slug}`,
    lastModified: guide.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...weeks, ...guides];
}
