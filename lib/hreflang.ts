import { absoluteUrl } from "@/lib/site";

/** Ireland hub. The first country section. UK pages stay on their current paths. */
export const IRELAND_HUB = "/ie";
/** How to read the UK south and north lists from Ireland. Not a per-crop Irish calendar. */
export const IRELAND_SOWING = "/ie/sowing";

/**
 * Alternate URLs for one page.
 * UK pages reference themselves as en-GB. Ireland pages reference themselves as en-IE.
 * x-default is the primary UK URL for that same page, not the homepage.
 * Only the home and planner pages have an Ireland pair.
 */
export function hreflangPaths(path: string): Record<string, string> {
  const self = path === "" ? "/" : path;
  if (self === "/") {
    return { "en-GB": "/", "en-IE": IRELAND_HUB, "x-default": "/" };
  }
  if (self === IRELAND_HUB) {
    return { "en-IE": IRELAND_HUB, "en-GB": "/", "x-default": "/" };
  }
  if (self === "/planner") {
    return { "en-GB": "/planner", "en-IE": IRELAND_SOWING, "x-default": "/planner" };
  }
  if (self === IRELAND_SOWING) {
    return { "en-IE": IRELAND_SOWING, "en-GB": "/planner", "x-default": "/planner" };
  }
  return { "en-GB": self, "x-default": self };
}

export function absoluteLanguages(path: string): Record<string, string> {
  return Object.fromEntries(
    Object.entries(hreflangPaths(path)).map(([lang, target]) => [lang, absoluteUrl(target)]),
  );
}

export function isIrelandPath(path: string): boolean {
  return path === IRELAND_HUB || path.startsWith(`${IRELAND_HUB}/`);
}
