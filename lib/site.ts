/**
 * Public site URL for canonicals, Open Graph, the sitemap, robots, and JSON-LD.
 * Set SITE_URL in the environment. The default is the intended production host.
 * Do not use VERCEL_URL: preview hostnames change on every deployment.
 */
export const DEFAULT_SITE_URL = "https://robinandradish.co.uk";

export const SITE_NAME = "Robin & Radish";

export const BYLINE = "Robin & Radish";

/** First publication date for the evergreen sowing, crop and bird pages. */
export const EVERGREEN_DATE = "2026-11-17";

export function getSiteUrl(): string {
  const configured = process.env.SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  return DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const site = getSiteUrl();
  if (path === "/" || path === "") return site;
  return `${site}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Contact address. Empty until the owner sets CONTACT_EMAIL.
 * There is no guessed inbox.
 */
export function getContactEmail(): string | null {
  const configured = process.env.CONTACT_EMAIL?.trim();
  if (!configured) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configured)) return null;
  return configured;
}
