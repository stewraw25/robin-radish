/**
 * Public site URL for canonicals, Open Graph, the sitemap, robots, and JSON-LD.
 * Set SITE_URL in the environment. The default is the intended production host.
 * Do not use VERCEL_URL: preview hostnames change on every deployment.
 */
/** GitHub Pages project site. No custom domain. */
export const BASE_PATH = "/robin-radish";
export const DEFAULT_SITE_URL = "https://stewraw25.github.io/robin-radish";

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
  if (path === "/" || path === "") return `${site}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (/\.[a-z0-9]+$/i.test(normalized)) return `${site}${normalized}`;
  return `${site}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

/** Origin only, so Next can prefix basePath onto relative metadata URLs. */
export function getMetadataBase(): URL {
  const url = new URL(getSiteUrl());
  return new URL(`${url.protocol}//${url.host}`);
}

/**
 * Site path for a file in `public/`. Next does not add basePath to a raw
 * `src` or `href`, so every public image, PDF and similar URL goes through here.
 */
export function publicAsset(file: string): string {
  const name = file.replace(/^\/+/, "");
  if (name.startsWith(`${BASE_PATH.replace(/^\//, "")}/`)) return `/${name}`;
  return `${BASE_PATH}/${name}`;
}

/**
 * Absolute URL for a public file or a generated image route such as opengraph-image.
 * `getSiteUrl()` already includes the project path, so this does not add it again.
 */
export function absolutePublicUrl(file: string): string {
  const name = file.replace(/^\/+/, "");
  return `${getSiteUrl()}/${name}`;
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
