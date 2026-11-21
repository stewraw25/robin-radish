/**
 * Shop links for Robin & Radish.
 *
 * Amazon Associates uses the UK tag robinradish-21 on this site.
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
 * - NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=robinradish-21
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

export function isAmazonHref(href: string): boolean {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    return host === "amazon.co.uk" || host.endsWith(".amazon.co.uk");
  } catch {
    return false;
  }
}

export function isShopHref(href: string): boolean {
  return merchantForUrl(href) !== undefined || isAmazonHref(href);
}

/** Tracking URL when an ID is configured, otherwise the shop address itself. */
export function affiliateUrl(destination: string): string {
  if (isAmazonHref(destination)) {
    return withAmazonTag(destination);
  }

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


/** UK Associates tracking ID for Robin & Radish. Override with NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG if needed. */
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "robinradish-21";

export const AMAZON_DOMAIN = "www.amazon.co.uk";

export type AmazonSearch = {
  id: string;
  label: string;
  query: string;
};

/**
 * Search queries, not particular ASINs. Link text should stay a search,
 * not a review, a price or a star rating.
 */
export const AMAZON_SEARCHES = {
  "vegetable-seeds": { label: "Vegetable seeds", query: "vegetable seeds" },
  "seed-trays": { label: "Seed trays", query: "seed trays" },
  "seed-compost": { label: "Seed compost", query: "seed compost" },
  "plant-pots": { label: "Plant pots", query: "plant pots" },
  "grow-bags": { label: "Grow bags", query: "grow bags" },
  compost: { label: "Garden compost", query: "garden compost" },
  "compost-bin": { label: "Compost bin", query: "compost bin" },
  "raised-bed": { label: "Raised garden bed", query: "raised garden bed" },
  propagator: { label: "Seed propagator", query: "seed propagator" },
  "horticultural-fleece": { label: "Horticultural fleece", query: "horticultural fleece" },
  "insect-mesh": { label: "Insect mesh", query: "insect mesh garden" },
  "fruit-netting": { label: "Fruit netting", query: "fruit netting garden" },
  "herb-seeds": { label: "Herb seeds", query: "herb seeds" },
  "garlic-bulbs": { label: "Garlic bulbs for planting", query: "garlic bulbs for planting" },
  "broad-bean-seeds": { label: "Broad bean seeds", query: "broad bean seeds" },
  "seed-potatoes": { label: "Seed potatoes", query: "seed potatoes" },
  "onion-sets": { label: "Onion sets", query: "onion sets" },
  "onion-seeds": { label: "Onion seeds", query: "onion seeds" },
  "sunflower-hearts": { label: "Sunflower hearts", query: "sunflower hearts bird food" },
  nyjer: { label: "Nyjer seed", query: "nyjer seed bird food" },
  suet: { label: "Suet for birds", query: "suet cakes bird food" },
  mealworms: { label: "Dried mealworms", query: "dried mealworms bird food" },
  "mixed-seed": { label: "Mixed bird seed", query: "mixed wild bird seed" },
  "wild-bird-peanuts": { label: "Wild bird peanuts", query: "wild bird peanuts" },
  "hanging-feeder": { label: "Hanging seed feeder", query: "hanging seed bird feeder" },
  "nyjer-feeder": { label: "Nyjer feeder", query: "nyjer bird feeder" },
  "bird-table": { label: "Bird table", query: "bird table" },
  "suet-feeder": { label: "Suet feeder", query: "suet bird feeder" },
  "squirrel-proof-feeder": { label: "Squirrel-proof feeder", query: "squirrel proof bird feeder" },
  "nest-box": { label: "Bird nest box", query: "bird nest box" },
  "bird-bath": { label: "Bird bath", query: "bird bath" },
  "feeder-brush": { label: "Bird feeder brush", query: "bird feeder cleaning brush" },
} as const satisfies Record<string, { label: string; query: string }>;

export type AmazonSearchId = keyof typeof AMAZON_SEARCHES;

export function amazonSearch(id: AmazonSearchId): AmazonSearch {
  const item = AMAZON_SEARCHES[id];
  return { id, label: item.label, query: item.query };
}

export function amazonSearches(ids: AmazonSearchId[]): AmazonSearch[] {
  return ids.map(amazonSearch);
}

export function amazonSearchUrl(query: string): string {
  const url = new URL(`https://${AMAZON_DOMAIN}/s`);
  url.searchParams.set("k", query);
  return withAmazonTag(url.toString());
}

export function withAmazonTag(destination: string): string {
  const url = new URL(destination);
  if (AMAZON_TAG && !url.searchParams.get("tag")) {
    url.searchParams.set("tag", AMAZON_TAG);
  }
  return url.toString();
}

export function amazonTrackingConfigured(): boolean {
  return Boolean(AMAZON_TAG);
}

type CropSearchInput = { slug: string; name: string };

/**
 * Natural singular or seed-form labels, used where `${crop.name} seeds`
 * would read awkwardly (for example "Carrots seeds" or "Tomatoes seeds").
 */
const CROP_SEED_NAMES: Record<string, string> = {
  peas: "Pea seeds",
  "french-beans": "French bean seeds",
  "runner-beans": "Runner bean seeds",
  carrots: "Carrot seeds",
  parsnips: "Parsnip seeds",
  radishes: "Radish seeds",
  turnips: "Turnip seeds",
  "brussels-sprouts": "Brussels sprout seeds",
  leeks: "Leek seeds",
  tomatoes: "Tomato seeds",
  courgettes: "Courgette seeds",
  cucumbers: "Cucumber seeds",
  chillies: "Chilli seeds",
  "spring-onions": "Spring onion seeds",
};

function cropSeedSearch(crop: CropSearchInput): AmazonSearch {
  const label = CROP_SEED_NAMES[crop.slug] ?? `${crop.name} seeds`;
  return { id: crop.slug, label, query: label.toLowerCase() };
}

/** Planting material for a crop page. Still a search, not a named product. */
export function amazonSearchesForCrop(crop: CropSearchInput): AmazonSearch[] {
  if (crop.slug === "early-potatoes" || crop.slug === "maincrop-potatoes") {
    return [amazonSearch("seed-potatoes")];
  }
  if (crop.slug === "onion-sets") return [amazonSearch("onion-sets")];
  if (crop.slug === "onions") return [amazonSearch("onion-seeds")];
  if (crop.slug === "garlic") return [amazonSearch("garlic-bulbs")];
  if (crop.slug === "broad-beans") return [amazonSearch("broad-bean-seeds")];
  if (["mint", "rosemary", "thyme", "chives"].includes(crop.slug)) {
    return [{ id: crop.slug, label: `${crop.name} plants`, query: `${crop.name.toLowerCase()} plants` }];
  }
  return [cropSeedSearch(crop)];
}

/** Foods and kit named in a bird page's feeding note. */
export function amazonSearchesForFoodText(food: string): AmazonSearch[] {
  const text = food.toLowerCase();
  const ids: AmazonSearchId[] = [];
  const add = (id: AmazonSearchId) => {
    if (!ids.includes(id)) ids.push(id);
  };
  if (text.includes("sunflower")) add("sunflower-hearts");
  if (text.includes("nyjer")) add("nyjer");
  if (text.includes("suet") || text.includes("fat ball") || text.includes("fat from")) add("suet");
  if (text.includes("mealworm")) add("mealworms");
  if (text.includes("mixed seed")) add("mixed-seed");
  if (text.includes("peanut")) add("wild-bird-peanuts");
  if (text.includes("hanging feeder") || text.includes("hanging mealworm") || text.includes("hanging seed")) add("hanging-feeder");
  if (text.includes("suet feeder") || text.includes("hanging suet")) add("suet-feeder");
  // Do not auto-link bird tables: the RSPB prefers hanging feeders over flat feeders.
  return amazonSearches(ids);
}
