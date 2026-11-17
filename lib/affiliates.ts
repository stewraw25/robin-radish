/**
 * Shop links for Robin & Radish.
 *
 * Thompson & Morgan, Crocus and CJ Wildlife run on Awin.
 * One Awin publisher ID covers those three programmes.
 * Haith's has used Webgains. Confirm the programme is open before you rely on it.
 *
 * Public programme IDs (the merchant side, not your publisher ID):
 * - Thompson & Morgan on Awin: 2283
 * - Crocus on Awin: 7833
 * - CJ Wildlife (birdfood.co.uk) on Awin: 111572
 * - Haith's on Webgains: 2088
 *
 * Your IDs stay empty until you set them. Placeholder strings are not put on links,
 * because a tracking URL with a fake ID would send people to a broken address.
 * Until an ID is set, the link goes straight to the shop and is still marked sponsored.
 *
 * Set these in .env.local, then rebuild. The GitHub Pages workflow leaves them unset:
 * - AWIN_PUBLISHER_ID=YOUR_AWIN_PUBLISHER_ID
 * - WEBGAINS_CAMPAIGN_ID=YOUR_WEBGAINS_CAMPAIGN_ID
 *
 * Optional per-shop Awin overrides, if you ever use more than one publisher account:
 * - AWIN_PUBLISHER_ID_THOMPSON_MORGAN
 * - AWIN_PUBLISHER_ID_CROCUS
 * - AWIN_PUBLISHER_ID_CJ_WILDLIFE
 */

export const SPONSORED_REL = "sponsored nofollow noopener";

export const AFFILIATE_PLACEHOLDERS = {
  awinPublisherId: "YOUR_AWIN_PUBLISHER_ID",
  webgainsCampaignId: "YOUR_WEBGAINS_CAMPAIGN_ID",
} as const;

export type MerchantId = "thompson-morgan" | "crocus" | "haiths" | "cj-wildlife";

export type Merchant = {
  id: MerchantId;
  name: string;
  network: "Awin" | "Webgains";
  homepage: string;
  hosts: string[];
  blurb: string;
  awinMerchantId?: string;
  /** Env var used when this shop needs its own Awin publisher ID. */
  awinEnv?: string;
  webgainsProgramId?: string;
};

export const merchants: Merchant[] = [
  {
    id: "thompson-morgan",
    name: "Thompson & Morgan",
    network: "Awin",
    homepage: "https://www.thompson-morgan.com/",
    hosts: ["thompson-morgan.com"],
    awinMerchantId: "2283",
    awinEnv: "AWIN_PUBLISHER_ID_THOMPSON_MORGAN",
    blurb:
      "Seeds, sets and young plants by post. Thompson & Morgan says it cannot ship seeds or plants to Northern Ireland.",
  },
  {
    id: "crocus",
    name: "Crocus",
    network: "Awin",
    homepage: "https://www.crocus.co.uk/",
    hosts: ["crocus.co.uk"],
    awinMerchantId: "7833",
    awinEnv: "AWIN_PUBLISHER_ID_CROCUS",
    blurb: "A UK nursery selling plants, plus pots and other garden kit.",
  },
  {
    id: "haiths",
    name: "Haith's",
    network: "Webgains",
    homepage: "https://haiths.com/",
    hosts: ["haiths.com"],
    webgainsProgramId: "2088",
    blurb: "Bird food, including straight seeds and suet.",
  },
  {
    id: "cj-wildlife",
    name: "CJ Wildlife",
    network: "Awin",
    homepage: "https://www.birdfood.co.uk/",
    hosts: ["birdfood.co.uk"],
    awinMerchantId: "111572",
    awinEnv: "AWIN_PUBLISHER_ID_CJ_WILDLIFE",
    blurb: "Bird food and feeders, sold on birdfood.co.uk.",
  },
];

function cleanId(value: string | undefined): string | null {
  const id = value?.trim();
  if (!id) return null;
  if (/^your_/i.test(id) || id.toUpperCase().includes("YOUR_")) return null;
  if (id.toLowerCase() === "placeholder") return null;
  return id;
}

export function awinPublisherId(merchant?: Merchant): string | null {
  if (merchant?.awinEnv) {
    const specific = cleanId(process.env[merchant.awinEnv]);
    if (specific) return specific;
  }
  return cleanId(process.env.AWIN_PUBLISHER_ID);
}

export function webgainsCampaignId(): string | null {
  return cleanId(process.env.WEBGAINS_CAMPAIGN_ID);
}

export function merchantForUrl(href: string): Merchant | undefined {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    return merchants.find((merchant) =>
      merchant.hosts.some((item) => host === item || host.endsWith(`.${item}`)),
    );
  } catch {
    return undefined;
  }
}

export function isShopHref(href: string): boolean {
  return merchantForUrl(href) !== undefined;
}

/** Tracking URL when an ID is configured, otherwise the shop address itself. */
export function affiliateUrl(destination: string): string {
  const merchant = merchantForUrl(destination);
  if (!merchant) return destination;

  if (merchant.awinMerchantId) {
    const id = awinPublisherId(merchant);
    if (!id) return destination;
    const tracked = new URL("https://www.awin1.com/cread.php");
    tracked.searchParams.set("awinmid", merchant.awinMerchantId);
    tracked.searchParams.set("awinaffid", id);
    tracked.searchParams.set("ued", destination);
    return tracked.toString();
  }

  if (merchant.webgainsProgramId) {
    const id = webgainsCampaignId();
    if (!id) return destination;
    const tracked = new URL("https://track.webgains.com/click.html");
    tracked.searchParams.set("wgcampaignid", id);
    tracked.searchParams.set("wgprogramid", merchant.webgainsProgramId);
    tracked.searchParams.set("wgtarget", destination);
    return tracked.toString();
  }

  return destination;
}

export function trackingConfigured(merchant: Merchant): boolean {
  if (merchant.network === "Awin") return awinPublisherId(merchant) !== null;
  return webgainsCampaignId() !== null;
}
