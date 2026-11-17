/**
 * General UK sowing and harvest months for a home garden.
 * South: southern England, the Midlands and much of Wales.
 * North: northern England and Scotland.
 * These are ranges, not a forecast. Frost, soil and a cold spring move them.
 */

export type Region = "south" | "north";

export type SeasonWindow = {
  south: number[];
  north: number[];
};

export type Crop = {
  slug: string;
  name: string;
  kind: "vegetable" | "herb";
  sowIndoors: SeasonWindow;
  sowOutdoors: SeasonWindow;
  plant: SeasonWindow;
  harvest: SeasonWindow;
  note: string;
};

export type Job = "sow-indoors" | "sow-outdoors" | "plant" | "harvest";

export const JOB_LABELS: Record<Job, string> = {
  "sow-indoors": "Sow indoors",
  "sow-outdoors": "Sow outdoors",
  plant: "Plant out or plant",
  harvest: "Harvest",
};

export const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
] as const;

const none: SeasonWindow = { south: [], north: [] };

function same(...months: number[]): SeasonWindow {
  return { south: months, north: [...months] };
}

function win(south: number[], north: number[]): SeasonWindow {
  return { south, north };
}

export const crops: Crop[] = [
  {
    slug: "broad-beans",
    name: "Broad beans",
    kind: "vegetable",
    sowIndoors: same(2, 3),
    sowOutdoors: win([2, 3, 4, 10, 11], [3, 4, 5, 10]),
    plant: none,
    harvest: win([6, 7, 8], [7, 8, 9]),
    note: "Hardy types can be sown in autumn in milder gardens, or in pots under cover. In the north, spring sowing is the more reliable outdoor crop.",
  },
  {
    slug: "peas",
    name: "Peas",
    kind: "vegetable",
    sowIndoors: same(2, 3),
    sowOutdoors: win([3, 4, 5, 6, 10, 11], [4, 5, 6]),
    plant: none,
    harvest: win([5, 6, 7, 8, 9], [6, 7, 8, 9]),
    note: "Autumn sowing is for hardy types in a mild garden, ideally under a cloche. Give them something to climb.",
  },
  {
    slug: "french-beans",
    name: "French beans",
    kind: "vegetable",
    sowIndoors: same(4, 5),
    sowOutdoors: win([5, 6, 7], [6, 7]),
    plant: win([5, 6], [6]),
    harvest: win([7, 8, 9], [8, 9]),
    note: "Frost tender. Wait until the nights have warmed before sowing or planting outside.",
  },
  {
    slug: "runner-beans",
    name: "Runner beans",
    kind: "vegetable",
    sowIndoors: same(4, 5),
    sowOutdoors: win([5, 6], [6]),
    plant: win([5, 6], [6]),
    harvest: win([7, 8, 9, 10], [8, 9, 10]),
    note: "Put the supports in before you sow or plant. Flowers set more reliably if the roots are not dry.",
  },
  {
    slug: "carrots",
    name: "Carrots",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: win([3, 4, 5, 6, 7], [4, 5, 6]),
    plant: none,
    harvest: win([6, 7, 8, 9, 10], [7, 8, 9, 10]),
    note: "Sow thinly in fine soil and thin the seedlings. Cover the row to keep carrot fly off.",
  },
  {
    slug: "beetroot",
    name: "Beetroot",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: win([3, 4, 5, 6, 7], [4, 5, 6, 7]),
    plant: none,
    harvest: win([6, 7, 8, 9, 10], [7, 8, 9, 10]),
    note: "Each seed cluster can give several seedlings. Thin them if you want full-sized roots.",
  },
  {
    slug: "parsnips",
    name: "Parsnips",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: win([3, 4, 5], [4, 5]),
    plant: none,
    harvest: same(10, 11, 12, 1, 2),
    note: "Sow fresh seed. Roots can stay in the ground and are often sweeter after a frost. Mark the row before the tops die back.",
  },
  {
    slug: "radishes",
    name: "Radishes",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: win([3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8]),
    plant: none,
    harvest: win([4, 5, 6, 7, 8, 9, 10], [5, 6, 7, 8, 9]),
    note: "A quick crop. Sow a short row every couple of weeks rather than one long row.",
  },
  {
    slug: "lettuce",
    name: "Lettuce",
    kind: "vegetable",
    sowIndoors: same(2, 3, 9),
    sowOutdoors: win([3, 4, 5, 6, 7, 8], [4, 5, 6, 7]),
    plant: win([4, 5, 6], [5, 6]),
    harvest: win([5, 6, 7, 8, 9, 10], [6, 7, 8, 9]),
    note: "Sow little and often. In hot weather it bolts, so give summer sowings some shade and water.",
  },
  {
    slug: "spinach",
    name: "Spinach",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: win([3, 4, 5, 8, 9], [4, 5, 8]),
    plant: none,
    harvest: win([5, 6, 7, 9, 10, 11], [6, 7, 9, 10]),
    note: "Spring and late-summer sowings are the usual windows. It bolts if it is hot and dry.",
  },
  {
    slug: "kale",
    name: "Kale",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: win([4, 5, 6], [4, 5]),
    plant: same(6, 7),
    harvest: win([9, 10, 11, 12, 1, 2, 3], [10, 11, 12, 1, 2, 3]),
    note: "Pick leaves a few at a time. Net the plants if pigeons are stripping them.",
  },
  {
    slug: "summer-cabbage",
    name: "Summer cabbage",
    kind: "vegetable",
    sowIndoors: win([2, 3, 4], [3, 4]),
    sowOutdoors: win([3, 4], [4]),
    plant: win([4, 5, 6], [5, 6]),
    harvest: win([6, 7, 8, 9, 10], [7, 8, 9, 10]),
    note: "This row is for summer and autumn cabbage, not the spring hearts sown the previous summer. Firm the soil when you plant.",
  },
  {
    slug: "brussels-sprouts",
    name: "Brussels sprouts",
    kind: "vegetable",
    sowIndoors: same(3),
    sowOutdoors: win([3, 4], [4]),
    plant: same(5, 6),
    harvest: same(10, 11, 12, 1, 2),
    note: "They need a long season and firm ground. Pick sprouts from the bottom of the stem upwards.",
  },
  {
    slug: "leeks",
    name: "Leeks",
    kind: "vegetable",
    sowIndoors: win([1, 2, 3], [2, 3]),
    sowOutdoors: same(3, 4),
    plant: win([5, 6, 7], [6, 7]),
    harvest: same(9, 10, 11, 12, 1, 2, 3),
    note: "Transplant when the seedlings are about pencil thickness, into holes watered in rather than firmed hard.",
  },
  {
    slug: "onions",
    name: "Onions from seed",
    kind: "vegetable",
    sowIndoors: win([1, 2, 3], [2, 3]),
    sowOutdoors: none,
    plant: win([4], [4, 5]),
    harvest: same(8),
    note: "Early indoor sowing needs a bright place or the seedlings stretch. Harvest when the tops fall over and the skins have dried.",
  },
  {
    slug: "onion-sets",
    name: "Onion sets",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: none,
    plant: win([3, 4, 9, 10], [3, 4]),
    harvest: win([6, 7, 8], [7, 8]),
    note: "Spring sets are the straightforward option. Overwintering sets, planted in autumn, suit milder gardens and are left out of the northern months here.",
  },
  {
    slug: "garlic",
    name: "Garlic",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: none,
    plant: win([10, 11, 12, 1, 2], [10, 11, 2, 3]),
    harvest: same(6, 7, 8),
    note: "Plant individual cloves, point up, in workable soil. Use cloves sold for planting. Autumn planting is the usual start.",
  },
  {
    slug: "early-potatoes",
    name: "Early potatoes",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: none,
    plant: win([3, 4], [4]),
    harvest: win([6, 7], [7, 8]),
    note: "Stand the tubers in a light, frost-free place to chit before planting. Cover the shoots if a late frost is forecast.",
  },
  {
    slug: "maincrop-potatoes",
    name: "Maincrop potatoes",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: none,
    plant: same(4),
    harvest: same(8, 9, 10),
    note: "Earth up the stems as they grow. Lift for storage once the tops have died back, on a dry day if you can.",
  },
  {
    slug: "tomatoes",
    name: "Tomatoes",
    kind: "vegetable",
    sowIndoors: win([2, 3, 4], [3, 4]),
    sowOutdoors: none,
    plant: win([5, 6], [6]),
    harvest: win([7, 8, 9, 10], [8, 9, 10]),
    note: "Sow indoors and plant out only after the last frost. Outdoor plants need a warm, sheltered spot. Greenhouse plants can go out earlier into the house, not the garden.",
  },
  {
    slug: "courgettes",
    name: "Courgettes",
    kind: "vegetable",
    sowIndoors: same(4, 5),
    sowOutdoors: win([5, 6], [6]),
    plant: win([5, 6], [6]),
    harvest: win([7, 8, 9, 10], [8, 9, 10]),
    note: "Two plants feed most households. They need sun, rich soil and regular water once they are cropping.",
  },
  {
    slug: "cucumbers",
    name: "Cucumbers",
    kind: "vegetable",
    sowIndoors: win([3, 4, 5], [4, 5]),
    sowOutdoors: none,
    plant: win([5, 6], [6]),
    harvest: same(7, 8, 9),
    note: "A greenhouse or cold frame is the usual home. Outdoor varieties still need a warm, sheltered spot.",
  },
  {
    slug: "sweetcorn",
    name: "Sweetcorn",
    kind: "vegetable",
    sowIndoors: same(4, 5),
    sowOutdoors: none,
    plant: win([5, 6], [6]),
    harvest: same(8, 9),
    note: "Plant in a block rather than one long row so the wind can pollinate it. It wants a warm summer.",
  },
  {
    slug: "chard",
    name: "Chard",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: win([4, 5, 6, 7], [5, 6, 7]),
    plant: none,
    harvest: win([7, 8, 9, 10, 11], [8, 9, 10]),
    note: "Cut outer leaves and leave the centre to grow on. It often stands into autumn.",
  },
  {
    slug: "spring-onions",
    name: "Spring onions",
    kind: "vegetable",
    sowIndoors: none,
    sowOutdoors: win([3, 4, 5, 6, 7], [4, 5, 6, 7]),
    plant: none,
    harvest: win([5, 6, 7, 8, 9, 10], [6, 7, 8, 9]),
    note: "Sow little and often. They do not need transplanting.",
  },
  {
    slug: "parsley",
    name: "Parsley",
    kind: "herb",
    sowIndoors: same(2, 3, 4),
    sowOutdoors: win([3, 4, 5, 6, 7], [4, 5, 6]),
    plant: win([5, 6], [6]),
    harvest: win([6, 7, 8, 9, 10, 11], [6, 7, 8, 9, 10]),
    note: "Seed can be slow to germinate. A cloche or a pot by the door keeps a winter picking going longer.",
  },
  {
    slug: "coriander",
    name: "Coriander",
    kind: "herb",
    sowIndoors: none,
    sowOutdoors: win([3, 4, 5, 6, 8, 9], [4, 5, 6, 8]),
    plant: none,
    harvest: win([5, 6, 7, 8, 9, 10], [6, 7, 8, 9]),
    note: "It runs to seed in hot, dry weather. Sow a small patch more than once.",
  },
  {
    slug: "basil",
    name: "Basil",
    kind: "herb",
    sowIndoors: same(3, 4, 5, 6),
    sowOutdoors: none,
    plant: same(6),
    harvest: win([6, 7, 8, 9], [7, 8, 9]),
    note: "Tender. A pot on a sunny windowsill is often more reliable than the open garden. Do not plant out until June.",
  },
  {
    slug: "chives",
    name: "Chives",
    kind: "herb",
    sowIndoors: same(3, 4),
    sowOutdoors: same(3, 4, 5),
    plant: same(4, 5),
    harvest: same(5, 6, 7, 8, 9, 10),
    note: "A clump comes back each year. Cut leaves as you need them and leave some to feed the plant.",
  },
  {
    slug: "mint",
    name: "Mint",
    kind: "herb",
    sowIndoors: none,
    sowOutdoors: none,
    plant: win([3, 4, 5, 9, 10], [4, 5, 9]),
    harvest: same(5, 6, 7, 8, 9, 10),
    note: "Plant it in a pot, or a pot sunk in the ground. In open soil it spreads further than you wanted.",
  },
  {
    slug: "rosemary",
    name: "Rosemary",
    kind: "herb",
    sowIndoors: same(2, 3, 4),
    sowOutdoors: none,
    plant: same(4, 5, 6),
    harvest: same(5, 6, 7, 8, 9, 10),
    note: "A small plant is the usual start. Seed is slow. It hates sitting in wet winter soil. Once established, pick lightly, including in winter.",
  },
  {
    slug: "thyme",
    name: "Thyme",
    kind: "herb",
    sowIndoors: same(2, 3, 4),
    sowOutdoors: none,
    plant: same(5, 6),
    harvest: same(5, 6, 7, 8, 9, 10),
    note: "Needs sun and drainage. Pick sprigs through the growing season. An established plant is evergreen, so a light winter pick is fine.",
  },
];

function assertWindow(name: string, window: SeasonWindow) {
  for (const region of ["south", "north"] as const) {
    for (const month of window[region]) {
      if (!Number.isInteger(month) || month < 1 || month > 12) {
        throw new Error(`${name} has an invalid month for ${region}: ${month}`);
      }
    }
  }
}

const slugs = new Set<string>();
for (const crop of crops) {
  if (slugs.has(crop.slug)) throw new Error(`Duplicate crop slug: ${crop.slug}`);
  slugs.add(crop.slug);
  assertWindow(crop.slug, crop.sowIndoors);
  assertWindow(crop.slug, crop.sowOutdoors);
  assertWindow(crop.slug, crop.plant);
  assertWindow(crop.slug, crop.harvest);
}

if (crops.length < 30) {
  throw new Error(`Expected at least 30 crops, found ${crops.length}`);
}

export function jobsInMonth(crop: Crop, month: number, region: Region): Job[] {
  const jobs: Job[] = [];
  if (crop.sowIndoors[region].includes(month)) jobs.push("sow-indoors");
  if (crop.sowOutdoors[region].includes(month)) jobs.push("sow-outdoors");
  if (crop.plant[region].includes(month)) jobs.push("plant");
  if (crop.harvest[region].includes(month)) jobs.push("harvest");
  return jobs;
}

export function monthLabel(month: number): string {
  return MONTHS.find((item) => item.value === month)?.label ?? String(month);
}
