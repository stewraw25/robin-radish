import {
  crops,
  formatMonthList,
  getCrop,
  type Crop,
  type SeasonWindow,
} from "@/lib/crops";

export type CropCare = {
  position: string;
  spacing: string;
  care: string;
  problems: string[];
};

const care: Record<string, CropCare> = {
  "broad-beans": {
    position: "An open spot in sun. Tall plants appreciate a bit of shelter from the strongest wind.",
    spacing: "About 20 cm apart in a double row. Leave roughly 60 cm between one double row and the next so you can get between them.",
    care: "Sow about 5 cm deep. Put canes and string in before tall plants flop. Pinch out the soft tips once the first pods have set. That also makes blackfly less interested.",
    problems: [
      "Blackfly gather on the soft tips.",
      "Chocolate spot shows as brown marks on the leaves in a damp spell.",
      "Mice take ungerminated seed, and a hard frost can blacken an autumn sowing in a cold garden.",
    ],
  },
  peas: {
    position: "Sun, and soil that is not waterlogged. Most types need something to climb.",
    spacing: "About 5 cm apart along a shallow drill, or in a double row with netting between the rows.",
    care: "Sow about 4 cm deep. Keep the soil damp once the plants flower, and pick pods before the peas turn floury.",
    problems: [
      "Mice and pigeons take seed and seedlings.",
      "Pea moth maggots turn up inside summer pods.",
      "Mildew is common late in the season if the plants are dry.",
    ],
  },
  "french-beans": {
    position: "Full sun and shelter. Frost kills them.",
    spacing: "Dwarf plants about 15 cm apart, in rows about 45 cm apart. Climbing plants need a cane each, set before you sow.",
    care: "Sow about 4 cm deep once the soil is warm, or start them in pots. Water in a dry spell once they flower, and pick often so they keep cropping.",
    problems: [
      "A late frost cuts them down.",
      "Slugs graze young plants.",
      "Halo blight and other leaf spots spread in wet weather. Do not save seed from plants with spotted leaves.",
    ],
  },
  "runner-beans": {
    position: "Sun, rich moist soil, and the supports in place before you sow or plant.",
    spacing: "About 15 cm apart along a double row of canes, or several seeds to a wigwam.",
    care: "Sow about 5 cm deep. Water the roots in dry weather, or the flowers drop without setting pods. Pick before the pods turn stringy.",
    problems: [
      "Flowers fail to set in hot, dry weather.",
      "Blackfly colonise the tips.",
      "Frost kills spring plants that go out too early, and slugs take them while they are small.",
    ],
  },
  carrots: {
    position: "Open sun and a fine soil without fresh manure, so the roots can grow straight.",
    spacing: "Sow thinly and thin to about 5 to 8 cm. Rows about 20 to 30 cm apart.",
    care: "Keep the seedbed damp until they germinate. Cover the row with insect mesh. Thin in the evening, when carrot fly is less active, and take the thinnings away.",
    problems: [
      "Carrot fly maggots tunnel the roots.",
      "Stones and fresh manure make roots fork.",
      "A drought followed by heavy rain makes roots split.",
    ],
  },
  beetroot: {
    position: "Sun, in soil that holds some moisture.",
    spacing: "Thin to about 10 cm. One seed cluster often gives several seedlings. Rows about 30 cm apart.",
    care: "Sow about 2 cm deep. Water in dry spells so the roots stay tender. Pull them from about golf-ball size up to a tennis ball.",
    problems: [
      "They bolt if a cold early sowing is followed by dry weather.",
      "Roots turn woody if they are left too long or kept short of water.",
      "Leaf miner leaves pale tunnels in the foliage.",
    ],
  },
  parsnips: {
    position: "Sun and deep soil. Do not sow into freshly manured ground.",
    spacing: "Thin to about 15 cm, in rows about 30 cm apart.",
    care: "Use fresh seed and sow about 1 to 2 cm deep. Old seed germinates poorly, and they are slow. Mark the row. Leave the roots in the ground and lift them as you need them.",
    problems: [
      "Old seed fails to come up.",
      "Canker shows as orange-brown rot on the shoulder, worse on damaged roots.",
      "Stony ground makes the roots fork.",
    ],
  },
  radishes: {
    position: "Sun or light shade, in soil that does not dry out.",
    spacing: "About 2 to 3 cm apart, in rows about 15 cm apart.",
    care: "Sow a short row every couple of weeks rather than one long row. They are quick in warm weather. Pull them while they are still small.",
    problems: [
      "Roots turn woody and very hot if they are left, or grown dry.",
      "Flea beetle makes small holes in the leaves.",
      "Slugs graze the seedlings.",
    ],
  },
  lettuce: {
    position: "Sun, with some shade in high summer so the plants are less inclined to bolt.",
    spacing: "About 20 to 30 cm for hearting types. Loose-leaf plants can sit closer if you pick leaves rather than a whole head.",
    care: "Sow little and often, and barely cover the seed. Keep them watered. In hot weather they run to seed.",
    problems: [
      "Slugs and snails shred seedlings.",
      "Bolting is the usual summer failure.",
      "Tip burn follows uneven watering, and downy mildew shows in a cool, damp spell.",
    ],
  },
  spinach: {
    position: "Sun or light shade, with enough moisture that the plants do not stall.",
    spacing: "Thin to about 10 to 15 cm.",
    care: "The useful sowings are spring and late summer. It bolts in hot, dry weather. Pick outer leaves and leave the centre.",
    problems: [
      "Bolting in a heatwave.",
      "Downy mildew on crowded, damp leaves.",
      "Slugs on the seedlings.",
    ],
  },
  kale: {
    position: "Sun or light shade, in firm soil.",
    spacing: "About 45 cm each way once they are planted out.",
    care: "Sow in a row and transplant sturdy plants. Net them against pigeons. Pick leaves a few at a time and leave the growing point.",
    problems: [
      "Pigeons strip the leaves.",
      "Cabbage white caterpillars and whitefly use the undersides.",
      "Clubroot builds up if brassicas stay in the same soil for years.",
    ],
  },
  "summer-cabbage": {
    position: "Sun and firm soil.",
    spacing: "About 30 to 45 cm each way, wider if you want a large heart.",
    care: "Transplant and firm the soil around the stem. Water until the plants are established. Net them against pigeons and caterpillars.",
    problems: [
      "Clubroot and cabbage root fly affect the roots.",
      "Caterpillars and pigeons eat the leaves.",
      "Hearts split if a dry spell is followed by heavy rain.",
    ],
  },
  "brussels-sprouts": {
    position: "Sun and firm ground. They occupy the space from early summer until winter.",
    spacing: "About 60 cm each way.",
    care: "Transplant deeply and firm the plants well. Loose soil gives loose, open sprouts. Pick from the bottom of the stem upwards, and net against pigeons.",
    problems: [
      "Blown, loose sprouts on soft growth or loose soil.",
      "Pigeons and caterpillars.",
      "Clubroot, and aphids in the growing points.",
    ],
  },
  leeks: {
    position: "Sun, in soil with organic matter that is not waterlogged.",
    spacing: "About 15 cm apart, in rows about 30 cm apart.",
    care: "Transplant when the seedlings are about pencil thick. Make a hole, drop the leek in, and water it in rather than firming the soil hard around the stem.",
    problems: [
      "Leek moth caterpillars mine the leaves and the stem.",
      "Rust shows as orange pustules. It looks worse than it usually is.",
      "White rot can persist in soil that has already grown sick alliums.",
    ],
  },
  onions: {
    position: "Sun and firm, well-drained soil.",
    spacing: "About 10 cm apart, in rows about 25 cm apart.",
    care: "An early sowing needs a bright place or the seedlings stretch. Harden the plants off before they go outside. Ease off watering once the tops fall, and dry the bulbs before you store them.",
    problems: [
      "White rot, a fluffy rot at the base, stays in the soil for years.",
      "Downy mildew in a cool, damp summer.",
      "Neck rot in store if the bulbs were damp when they were dried.",
    ],
  },
  "onion-sets": {
    position: "Sun, in the same sort of firm, drained soil you would use for onions from seed.",
    spacing: "About 10 cm apart, in rows about 25 cm apart, with the tip just showing.",
    care: "Net the bed until the sets have rooted, or birds tug them out. Overwintering sets are the autumn planting, and they suit milder gardens.",
    problems: [
      "Birds pull newly planted sets.",
      "White rot and downy mildew, as with onions from seed.",
      "Bolting, especially after a check to growth.",
    ],
  },
  garlic: {
    position: "Sun and well-drained soil. Wet winter ground rots the cloves.",
    spacing: "About 15 cm apart, in rows about 30 cm apart. Cover the clove with about 2 to 3 cm of soil, point upwards.",
    care: "Plant cloves sold for planting, not bulbs from a food shop, which may be a poor type for the UK climate or carry disease. Keep the bed weeded. Lift when the leaves yellow, and dry the bulbs.",
    problems: [
      "White rot and rust.",
      "Cloves rotting in wet soil.",
      "Small bulbs if they went in late or spent the winter in deep shade.",
    ],
  },
  "early-potatoes": {
    position: "Sun, in soil you can draw up around the stems.",
    spacing: "About 30 cm apart, in rows about 60 cm apart, in a trench about 15 cm deep.",
    care: "Stand the tubers in a light, frost-free place to chit before planting. Cover young shoots if a frost is forecast, and earth up the stems as they grow. Lift once the plants flower if you want small new potatoes.",
    problems: [
      "Frost blackens the shoots.",
      "Slugs hole the tubers.",
      "Blight is less often a problem than on maincrops, because earlies are usually up before it spreads, but a wet early summer can still bring it.",
    ],
  },
  "maincrop-potatoes": {
    position: "Sun, with room to earth up.",
    spacing: "About 40 cm apart, in rows about 75 cm apart.",
    care: "Earth up the stems as they grow. In a long dry spell, water if you can. Once the tops have died back, lift the crop on a dry day and store the tubers cool and dark.",
    problems: [
      "Blight collapses the tops in warm, wet weather and can rot the tubers.",
      "Slugs, and scab on dry, alkaline soil.",
      "Tubers turn green if light reaches them. Do not eat green potatoes.",
    ],
  },
  tomatoes: {
    position: "The warmest, most sheltered spot you have. A greenhouse or a sunny wall is easier than an exposed bed.",
    spacing: "About 45 cm apart. Cordon plants need a cane or a string.",
    care: "Sow indoors and do not plant into the open garden until after the last frost. Water steadily. Pinch the side shoots out of cordon types. A dark, sunken patch on the base of a fruit is blossom end rot, linked with uneven watering.",
    problems: [
      "Blight on outdoor plants in a wet late summer.",
      "Blossom end rot when watering swings from dry to flooded.",
      "Cold nights stopping the fruit from setting, and a closed greenhouse overheating on a sunny day.",
    ],
  },
  courgettes: {
    position: "Sun, rich soil, and more room than the seedling suggests.",
    spacing: "About 90 cm each way. Two plants are enough for most households.",
    care: "Sow in pots. Seed rots in cold, wet soil. Plant out after the last frost, water the soil rather than the crown, and pick fruits while they are still small. A fruit with a withered end was not pollinated.",
    problems: [
      "Slugs on young plants.",
      "Powdery mildew on the leaves later in the season.",
      "Poor pollination in cold or wet weather, and stem rot if water sits against the crown.",
    ],
  },
  cucumbers: {
    position: "Warmth. A greenhouse or a cold frame is the usual place. Outdoor varieties still need shelter.",
    spacing: "About 45 cm, with a support if the variety climbs.",
    care: "Sow in pots indoors and do not move plants into a cold house. Keep the compost moist and pick often. Some greenhouse types turn bitter if a bee pollinates the flowers, so follow the note on the packet.",
    problems: [
      "Cold nights.",
      "Powdery mildew.",
      "Red spider mite in a hot, dry greenhouse, and bitter fruit on a stressed plant.",
    ],
  },
  sweetcorn: {
    position: "Full sun. It wants a warm summer.",
    spacing: "About 35 to 45 cm apart in a block, not one long row, so pollen can blow from plant to plant.",
    care: "Sow in deep pots. The roots dislike being disturbed. Plant out after the last frost and water once the cobs are forming. A kernel pierced with a fingernail should leak a milky sap when the cob is ready.",
    problems: [
      "Gaps on the cob if the plants were grown in a single line, or the summer was cold.",
      "Mice taking seed and young cobs.",
      "Frost on plants put out too early.",
    ],
  },
  chard: {
    position: "Sun or light shade, in soil that does not dry out completely.",
    spacing: "About 30 cm apart.",
    care: "Sow direct and thin. Cut the outer leaves and leave the centre to grow on. Plants often stand into autumn, and longer in a mild garden.",
    problems: [
      "Slugs.",
      "Leaf miner tunnels.",
      "Bolting if the bed is very dry.",
    ],
  },
  "spring-onions": {
    position: "Sun and ordinary vegetable soil.",
    spacing: "Sow thinly, about 1 cm apart, in rows about 15 cm apart. They are not transplanted.",
    care: "Sow a short row every few weeks. Pull them when the stems are about pencil thick.",
    problems: [
      "Onion fly.",
      "White rot if that disease is already in the soil.",
      "Bolting after a cold spell followed by warmth.",
    ],
  },
  parsley: {
    position: "Sun or light shade, with moisture.",
    spacing: "About 15 to 20 cm apart.",
    care: "Seed is slow and must not dry out. A pot by the door is easy to pick, and a cloche keeps leaves going later into the winter. It is a biennial, so it flowers in its second year.",
    problems: [
      "Slow or failed germination.",
      "Celery leaf miner in the leaves.",
      "Flowering in the second year, which is how the plant grows, not a mistake.",
    ],
  },
  coriander: {
    position: "Sun or light shade. Hot, dry weather makes it run to seed.",
    spacing: "Thin to about 5 to 10 cm if you want leaves rather than a thicket.",
    care: "Sow a small patch more than once, including a late-summer sowing for autumn leaves. If it flowers, the green seed is edible too.",
    problems: [
      "Bolting in hot weather.",
      "Aphids on the flower stems.",
      "Poor germination from old seed, or from seed buried too deep.",
    ],
  },
  basil: {
    position: "Warmth and sun. A windowsill or a greenhouse is more reliable in a cool UK summer than an exposed bed.",
    spacing: "About 20 cm apart, or several plants in one pot.",
    care: "Sow indoors and do not plant out until June. Pinch the tips so the plant bushes out. Water the compost, and do not leave the pot standing in a saucer of water.",
    problems: [
      "Cold, including one chilly night after planting out.",
      "Damping off of crowded, wet seedlings.",
      "Grey mould when the leaves stay wet.",
    ],
  },
  chives: {
    position: "Sun or light shade. A clump comes back each year.",
    spacing: "About 20 cm between clumps, or a single pot.",
    care: "Sow a pot, or divide a clump in spring or autumn. Cut leaves as you need them and leave some to feed the plant. The flowers are edible. The leaves die back in winter and return in spring.",
    problems: [
      "Rust on the leaves.",
      "A clump rotting in waterlogged soil.",
      "Winter die-back, which is normal.",
    ],
  },
  mint: {
    position: "Sun or light shade, with moisture. Keep it in a pot.",
    spacing: "One pot is enough. In open soil it spreads further than the space you gave it.",
    care: "Plant it in a container, or a container sunk in the ground. Water it. If the stems get long and tired, cut them back and it will shoot again.",
    problems: [
      "Rust.",
      "Runners escaping a cracked pot or a pot that is not really containing them.",
      "A pot drying out in summer.",
    ],
  },
  rosemary: {
    position: "Sun and sharp drainage. Wet winter soil is what usually kills it.",
    spacing: "Allow about 60 cm once it is a shrub, or grow it clipped in a pot.",
    care: "A small plant or a cutting is the usual start. Seed is slow. Plant from spring into early summer so the roots are established before winter, and pick lightly.",
    problems: [
      "Rotting in cold, wet clay.",
      "Rosemary beetle: metallic green beetles and grey grubs on the shoots.",
      "A pot against a hot wall drying out in summer.",
    ],
  },
  calabrese: {
    position: "Sun, and soil that holds moisture. Firm ground, as for other brassicas.",
    spacing: "About 45 cm between plants.",
    care: "Sow under cover from late winter in the south, a little later in the north, or sow outdoors from April. Plant out once the plants are sturdy and the risk of a hard frost has passed. Water in dry spells as the head is forming, and cut the main head before the buds open. Side shoots often follow.",
    problems: [
      "Pigeons stripping the leaves. Net the row.",
      "Cabbage white caterpillars. Check the undersides of the leaves.",
      "The head opening and flowering in hot, dry weather.",
      "Clubroot, which stays in the soil. Do not follow it with another brassica in the same patch.",
    ],
  },
  "purple-sprouting-broccoli": {
    position: "Sun, and firm soil that will not rock the tall plants in winter.",
    spacing: "About 60 cm between plants. They are large by autumn.",
    care: "Sow in late spring and plant out in early summer so the plants are well grown before winter. Stake them if the site is exposed. Leave them standing. The spears come the following spring. Pick often, before the flowers open.",
    problems: [
      "Pigeons, especially in winter when other greens are scarce.",
      "Cabbage white caterpillars in summer.",
      "A plant that falls over in a wet, windy winter because the soil was loose.",
      "Clubroot. Treat it as a brassica when you rotate.",
    ],
  },
  turnips: {
    position: "Sun or light shade, in soil that does not dry out.",
    spacing: "About 10 cm for small roots, a little wider if you are leaving them to size up. Rows about 25 cm apart.",
    care: "Sow where they will grow. They transplant badly. Water in a dry spell. Pull early sowings while they are still small. Later sowings can stay in the ground.",
    problems: [
      "Flea beetle: small holes in the young leaves. A cover of fine mesh from sowing helps.",
      "Woody, hot roots after a dry spell.",
      "Clubroot, because a turnip is a brassica even though you eat the root.",
    ],
  },
  swede: {
    position: "An open spot, in soil that stays moist. They dislike fresh manure, which makes the roots fork.",
    spacing: "About 20 cm between plants, in rows about 40 cm apart.",
    care: "Sow in May or June where the crop will stand. Thin the seedlings rather than moving them. Water if the soil is drying out. Lift from autumn onwards, and leave the rest in the ground.",
    problems: [
      "Woody roots in a dry summer.",
      "Forked roots where the soil was stony or recently manured.",
      "Flea beetle on the seedlings.",
      "Clubroot. Rotate them with the other brassicas.",
    ],
  },
  rocket: {
    position: "Sun in spring and autumn. A little shade in high summer stops it running to seed so quickly.",
    spacing: "Sow thinly in a row, or scatter in a pot. You do not need a measured gap if you are cutting young leaves.",
    care: "Sow a short row every few weeks. Water in hot weather. Cut leaves and leave the stump to regrow, or pull plants that have started to flower. A late sowing under cover carries on when the outdoor row has finished.",
    problems: [
      "Flea beetle peppering the leaves.",
      "Bolting in heat and drought.",
      "Slugs on young leaves in a damp spring.",
    ],
  },
  chillies: {
    position: "A bright windowsill to start, then a greenhouse, porch or a very sheltered sunny spot.",
    spacing: "One plant to a pot of about 20 cm, or about 45 cm apart if they go in the ground.",
    care: "Sow early under cover. They are slow. Pot on before the roots fill the first pot. Do not put them outside until the nights are warm, and harden them off first. Water steadily. A plant that dries out and then floods drops its flowers.",
    problems: [
      "A late sowing that flowers and never ripens.",
      "Aphids on the soft tips.",
      "Blossom end rot on the fruit after uneven watering.",
      "Cold nights, which stop the fruit setting.",
    ],
  },
  thyme: {
    position: "Sun and drainage. A pot of gritty compost suits it.",
    spacing: "About 20 to 30 cm apart.",
    care: "Sow indoors or start with a small plant. Keep wet mulch off the stem. Pick through the growing season. An established plant is evergreen, so a light winter pick is fine. Trim after flowering so the centre does not turn to bare wood.",
    problems: [
      "Rotting in winter wet.",
      "A woody, bare plant that was never trimmed.",
      "Nothing worse than bees on the flowers, which is a reason to leave some of them.",
    ],
  },
};

for (const crop of crops) {
  if (!care[crop.slug]) throw new Error(`Missing care notes for ${crop.slug}`);
}

export function getCropCare(slug: string): CropCare {
  const notes = care[slug];
  if (!notes) throw new Error(`Missing care notes for ${slug}`);
  return notes;
}

const GROUPS: string[][] = [
  ["broad-beans", "peas", "french-beans", "runner-beans"],
  ["carrots", "beetroot", "parsnips", "radishes"],
  ["lettuce", "spinach", "chard", "rocket", "kale"],
  ["kale", "summer-cabbage", "brussels-sprouts", "calabrese", "purple-sprouting-broccoli", "turnips", "swede"],
  ["leeks", "onions", "onion-sets", "garlic", "spring-onions"],
  ["early-potatoes", "maincrop-potatoes"],
  ["tomatoes", "courgettes", "cucumbers", "sweetcorn", "chillies"],
  ["parsley", "coriander", "basil", "chives", "mint", "rosemary", "thyme"],
];

const grouped = new Set(GROUPS.flat());
for (const crop of crops) {
  if (!grouped.has(crop.slug)) throw new Error(`${crop.slug} is not in a related-crop group`);
}

export function relatedCrops(slug: string): Crop[] {
  const slugs = new Set<string>();
  for (const group of GROUPS) {
    if (!group.includes(slug)) continue;
    for (const item of group) slugs.add(item);
  }
  slugs.delete(slug);
  return [...slugs]
    .slice(0, 5)
    .map((item) => getCrop(item))
    .filter((crop): crop is Crop => Boolean(crop));
}

function listed(window: SeasonWindow): string | null {
  const south = formatMonthList(window.south);
  const north = formatMonthList(window.north);
  if (south === "Not in this list" && north === "Not in this list") return null;
  if (south === north) return south;
  return `${south} in the south, and ${north} in the north`;
}

/** Direct answer to "when to sow/plant this in the UK", using the month table. */
export function whenToSowLead(crop: Crop): string {
  const name = crop.name.toLowerCase();
  const indoors = listed(crop.sowIndoors);
  const outdoors = listed(crop.sowOutdoors);
  const plant = listed(crop.plant);
  const harvest = listed(crop.harvest);
  const clauses: string[] = [];
  if (indoors) clauses.push(`sow ${name} indoors in ${indoors}`);
  if (outdoors) clauses.push(indoors ? `sow them outdoors in ${outdoors}` : `sow ${name} outdoors in ${outdoors}`);
  if (plant) clauses.push(clauses.length > 0 ? `plant in ${plant}` : `plant ${name} in ${plant}`);
  const opener =
    clauses.length > 0
      ? `${clauses.join(", and ").replace(/^./, (letter) => letter.toUpperCase())}.`
      : `${crop.name} is not given a sowing or planting window in this list.`;
  const harvestLine = harvest ? ` The harvest window is ${harvest}.` : "";
  return `${opener}${harvestLine} ${crop.note} South means southern England, the Midlands and much of Wales. North means northern England and Scotland. Frost and a cold spring can move a garden later than these ranges.`;
}

export function cropSearchTitle(crop: Crop): string {
  const sows =
    crop.sowIndoors.south.length +
    crop.sowIndoors.north.length +
    crop.sowOutdoors.south.length +
    crop.sowOutdoors.north.length;
  return `When to ${sows > 0 ? "sow" : "plant"} ${crop.name.toLowerCase()}`;
}

const CONTAINER_CROPS = new Set([
  "lettuce",
  "radishes",
  "tomatoes",
  "courgettes",
  "cucumbers",
  "spring-onions",
  "chard",
  "spinach",
  "rocket",
  "chillies",
  "french-beans",
  "early-potatoes",
  "beetroot",
  "carrots",
  "parsley",
  "coriander",
  "basil",
  "chives",
  "mint",
  "rosemary",
  "thyme",
]);

const SEED_CROPS = new Set([
  "broad-beans",
  "peas",
  "french-beans",
  "runner-beans",
  "tomatoes",
  "lettuce",
]);

export function guidesForCrop(crop: Crop): string[] {
  const slugs: string[] = [];
  if (crop.sowIndoors.south.length > 0 || crop.sowIndoors.north.length > 0) {
    slugs.push("sowing-under-cover");
    slugs.push("hardening-off");
  }
  if (["carrots", "parsnips"].includes(crop.slug)) slugs.unshift("carrot-fly");
  if (["tomatoes", "early-potatoes", "maincrop-potatoes"].includes(crop.slug)) slugs.unshift("blight-potatoes-tomatoes");
  if (["lettuce", "rocket", "radishes", "spinach", "coriander", "spring-onions", "turnips", "calabrese"].includes(crop.slug)) {
    slugs.unshift("successional-sowing");
  }
  if (["broad-beans", "chillies", "runner-beans", "french-beans"].includes(crop.slug)) slugs.unshift("aphids-without-sprays");
  if (CONTAINER_CROPS.has(crop.slug)) slugs.push("growing-in-containers");
  if (SEED_CROPS.has(crop.slug)) slugs.push("saving-seed");
  const winter = [crop.sowOutdoors, crop.plant, crop.harvest].some((window) =>
    [...window.south, ...window.north].some((month) => month >= 11 || month <= 2),
  );
  if (winter) slugs.push("what-to-sow-in-winter");
  if (crop.kind === "herb") slugs.unshift("herbs-small-space");
  if (["lettuce", "spinach", "courgettes", "french-beans", "runner-beans", "basil", "summer-cabbage"].includes(crop.slug)) {
    slugs.unshift("slugs-without-pellets");
  }
  if (["kale", "leeks", "chard", "spinach", "lettuce"].includes(crop.slug)) slugs.unshift("hungry-gap");
  if (["kale", "summer-cabbage", "brussels-sprouts", "calabrese", "purple-sprouting-broccoli"].includes(crop.slug)) {
    slugs.unshift("netting-soft-fruit");
  }
  if (crop.kind === "vegetable") slugs.push("no-dig-beds");
  slugs.push("starting-a-veg-patch");
  return [...new Set(slugs)].slice(0, 4);
}

function jobSentence(label: string, window: SeasonWindow): string {
  const south = formatMonthList(window.south);
  const north = formatMonthList(window.north);
  if (south === "Not in this list" && north === "Not in this list") {
    return `${label} is not in this list for the south or the north.`;
  }
  if (south === north) return `${label} is ${south} in both the south and the north.`;
  return `${label} is ${south} in the south, and ${north} in the north.`;
}

export function scheduleSentences(crop: Crop): string[] {
  return [
    jobSentence("Sow indoors", crop.sowIndoors),
    jobSentence("Sow outdoors", crop.sowOutdoors),
    jobSentence("Planting", crop.plant),
    jobSentence("Harvest", crop.harvest),
  ];
}

export function cropFaqs(crop: Crop): { q: string; a: string }[] {
  const name = crop.name.toLowerCase();
  const notes = getCropCare(crop.slug);
  const sows = crop.sowIndoors.south.length + crop.sowIndoors.north.length + crop.sowOutdoors.south.length + crop.sowOutdoors.north.length;
  const diffs = scheduleSentences(crop).filter((line) => line.includes("in the south, and"));
  const regionAnswer =
    diffs.length === 0
      ? `In this list the south and north months for ${name} are the same. A cold spring can still hold a northern garden back. Treat the months as a range.`
      : `${diffs.join(" ")} A cold, wet spring can move either region later.`;

  return [
    {
      q: `When do I ${sows > 0 ? "sow" : "plant"} ${name} in the UK?`,
      a: whenToSowLead(crop),
    },
    {
      q: `Do northern gardens grow ${name} on the same timetable?`,
      a: regionAnswer,
    },
    {
      q: `How far apart should ${name} be, and what often goes wrong?`,
      a: `${notes.spacing} ${notes.problems.join(" ")}`,
    },
  ];
}
