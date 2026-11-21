import type { MetadataRoute } from "next";
import { BASE_PATH, getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Search and AI answer crawlers are named so the choice is on record.
 * A named group replaces the `*` group for that bot, so each group repeats the disallow rule.
 *
 * - Bingbot feeds Bing, Copilot, and ChatGPT search results.
 * - OAI-SearchBot and ChatGPT-User fetch pages for ChatGPT answers. GPTBot is OpenAI model training.
 * - PerplexityBot and Perplexity-User fetch pages for Perplexity answers.
 * - Google-Extended controls Gemini training and grounding. It does not affect Google Search or
 *   AI Overviews, which use Googlebot. Allowed so Gemini can cite the site; remove it to opt out.
 */
const AI_CRAWLERS = [
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "ClaudeBot",
  "Claude-SearchBot",
  "Applebot-Extended",
  "DuckAssistBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const rule = { allow: `${BASE_PATH}/`, disallow: `${BASE_PATH}/brand` };
  return {
    rules: [
      { userAgent: "*", ...rule },
      { userAgent: AI_CRAWLERS, ...rule },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
