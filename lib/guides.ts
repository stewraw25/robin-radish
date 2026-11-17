import fs from "node:fs";
import path from "node:path";
import { isShopHref } from "@/lib/affiliates";
import { blockHasShopLink, parseMarkdown, splitFrontmatter, type Block, type Faq } from "@/lib/markdown";

export type GuideCategory = "grow" | "birds";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: GuideCategory;
  blocks: Block[];
  faqs: Faq[];
  hasShopLinks: boolean;
};

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

function parseGuide(file: string): Guide {
  const slug = path.basename(file, ".mdx");
  const { data, body } = splitFrontmatter(fs.readFileSync(file, "utf8"));
  const title = data.title;
  const description = data.description;
  const date = data.date;
  const category = data.category;
  if (!title || !description || !date) {
    throw new Error(`${file} needs title, description and date in frontmatter`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`${file} date must be YYYY-MM-DD`);
  if (category !== "grow" && category !== "birds") {
    throw new Error(`${file} category must be grow or birds`);
  }
  const { blocks, faqs } = parseMarkdown(body);
  if (faqs.length < 2) throw new Error(`${file} needs a Common questions section with at least two questions`);
  return {
    slug,
    title,
    description,
    date,
    category,
    blocks,
    faqs,
    hasShopLinks: blockHasShopLink(blocks, isShopHref),
  };
}

export function getGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => parseGuide(path.join(GUIDES_DIR, name)))
    .sort((a, b) => a.title.localeCompare(b.title, "en-GB"));
}

export function getGuide(slug: string): Guide | undefined {
  const file = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  return parseGuide(file);
}

export const CATEGORY_LABELS: Record<GuideCategory, string> = {
  grow: "Growing food",
  birds: "Garden birds",
};
