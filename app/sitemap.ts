import type { MetadataRoute } from "next";
import { birds } from "@/lib/birds";
import { crops, MONTHS } from "@/lib/crops";
import { getGuides } from "@/lib/guides";
import { getSiteUrl } from "@/lib/site";
import { getWeeks } from "@/lib/weeks";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" },
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

  const months: MetadataRoute.Sitemap = MONTHS.map((month) => ({
    url: `${base}/what-to-sow/${month.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cropPages: MetadataRoute.Sitemap = crops.map((crop) => ({
    url: `${base}/grow/${crop.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const birdPages: MetadataRoute.Sitemap = birds.map((bird) => ({
    url: `${base}/birds/${bird.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...months, ...cropPages, ...birdPages, ...weeks, ...guides];
}
