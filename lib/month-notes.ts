import { birds } from "@/lib/birds";

export type MonthNote = {
  /** A sentence that makes this month’s search description its own. */
  hook: string;
  intro: string;
  birds: string;
  birdSlugs: string[];
  faqs: { q: string; a: string }[];
};

export const monthNotes: Record<number, MonthNote> = {
  1: {
    hook: "Garlic can still go in, and the feeder matters more than the seed bed.",
    intro:
      "January is a harvesting and planning month in most UK gardens. The soil is cold, and often frozen or sodden, so outdoor sowing is not the job. Under cover, leeks and onions from seed can be started on a bright windowsill. Garlic can still be planted if the ground is workable. What you pick now was sown last year.",
    birds:
      "Days are short and insects are scarce. This is inside the RSPB's 1 November to 30 April window, so seeds and peanuts can go out as well as mealworms and suet, in hanging feeders rather than on a bird table. Robins and blackbirds take mealworms and windfall fruit. Blue tits and great tits use sunflower hearts and suet. Goldfinches take nyjer as well as hearts. Starlings clear suet quickly. Break ice on a shallow dish of water in the morning, and only put water out if you can change it every day.",
    birdSlugs: ["robin", "blackbird", "blue-tit", "great-tit", "goldfinch", "starling", "nuthatch", "siskin"],
    faqs: [
      {
        q: "Can I sow tomatoes in January?",
        a: "Not in this list. A home gardener sowing tomatoes in January, on a dull windowsill, gets stretched plants. In the south, February is the early start. Further north, March is the more useful month.",
      },
      {
        q: "Is January too late for garlic?",
        a: "No, if the soil is workable and not frozen or waterlogged. Autumn is the usual planting. January and February still work, including in the north after a wet autumn.",
      },
      {
        q: "What should I put out for birds in January?",
        a: "Sunflower hearts and suet in hanging feeders cover tits, finches and starlings. Mealworms in a hanging feeder suit robins and blackbirds. The RSPB prefers hanging feeders to a bird table. Offer water only if you can change it every day, and clear ice in the morning. Put out what will be eaten while it is still fresh.",
      },
    ],
  },
  2: {
    hook: "Broad beans and peas can start under cover in the south.",
    intro:
      "February is still winter, with longer days. In the south, broad beans and peas can be started in pots under cover, and onion seed wants a bright windowsill. Outdoor sowing waits until the soil is workable. In the north, keep most of this under cover, or wait for March. Chit early potatoes somewhere light and frost-free.",
    birds:
      "Feeders are still busy. Coal tits snatch a seed and hide it. Long-tailed tits arrive as a party on the suet. Chaffinches work the ground underneath. Dunnocks shuffle there too. Wrens stay in the hedge and rarely use the feeder. This is a sound month to put nest boxes up, before most birds are choosing sites.",
    birdSlugs: ["coal-tit", "long-tailed-tit", "chaffinch", "dunnock", "wren", "robin", "bullfinch"],
    faqs: [
      {
        q: "Can I sow carrots outdoors in February?",
        a: "Not in this list. The soil is too cold for a reliable germination. Outdoor carrot sowing here starts in March in the south and April in the north.",
      },
      {
        q: "Should early potatoes be chitting in February?",
        a: "Yes, if you have the tubers. Stand them in a light, frost-free place so the shoots stay short and green. Planting is March or April, later in the north. Maincrops are planted in April and do not need a long chit.",
      },
      {
        q: "Are garden birds nesting in February?",
        a: "A few robins and blackbirds look at sites late in winter. Most nesting is later. Putting a box up now means it is in place before they choose. Do not open a box that a bird is already using.",
      },
    ],
  },
  3: {
    hook: "Hardy outdoor sowing starts in the south if the soil is fit.",
    intro:
      "March is when a lot of UK sowing begins, especially in the south. Hardy vegetables can go outdoors if the soil has dried enough to rake. Tender crops such as tomatoes stay indoors. Frost is still ordinary, and more so in the north, so nothing soft is planted out. If the soil sticks to your boots, wait.",
    birds:
      "Tits, robins, blackbirds, house sparrows and dunnocks are still using food you put out, and they are also singing and looking at nest sites. Natural food is increasing. Keep portions small and fresh. A cold snap sends them back to the feeder in numbers.",
    birdSlugs: ["robin", "great-tit", "blue-tit", "house-sparrow", "blackbird", "dunnock", "song-thrush"],
    faqs: [
      {
        q: "Can tender vegetables be planted out in March?",
        a: "No. Tomatoes, courgettes, cucumbers, French beans and runner beans are still killed by frost. Sow them under cover, or keep plants you already have under cover.",
      },
      {
        q: "The soil is still wet. Should I sow anyway?",
        a: "No. Seed in cold, waterlogged soil rots. Rake a handful. If it smears rather than crumbles, wait, even if the month on this page has started.",
      },
      {
        q: "Which birds are at a UK feeder in March?",
        a: "Blue tits, great tits, robins, blackbirds, house sparrows and dunnocks are the usual group. Clean the feeder. Birds are pairing, and a dirty perch is a poor place for them to meet.",
      },
    ],
  },
  4: {
    hook: "A busy sowing month, with tender plants still under cover.",
    intro:
      "April is a full sowing month. Hardy crops go outdoors in both halves of the country when the soil is fit. Tender plants are still raised under cover. A late frost is still normal, particularly in the north and on high ground. Early potatoes go in. Maincrop potatoes go in this month too.",
    birds:
      "Nesting is underway for some tits, robins and blackbirds, and others are still building. Wrens are singing from the hedge. April is still inside the RSPB's 1 November to 30 April window, so seeds and peanuts can stay out in hanging feeders if they are eaten quickly. Mealworms are useful for robins and blackbirds. The seed and peanut pause starts on 1 May. Do not cut hedges. Water still matters if you can change it every day.",
    birdSlugs: ["robin", "blue-tit", "great-tit", "wren", "house-sparrow", "blackbird", "song-thrush", "bullfinch"],
    faqs: [
      {
        q: "Can tomatoes go outside in April?",
        a: "Not in this list. Planting out is May in the south and June in the north, after the nights have warmed. A greenhouse is a different place from the open bed.",
      },
      {
        q: "Is April too late to sow leeks?",
        a: "No. Outdoor sowing of leeks runs through March and April in both regions. They are planted into their final spacing in early summer.",
      },
      {
        q: "Should bird food stop in April?",
        a: "Not yet. The RSPB's pause on seeds and peanuts starts on 1 May. Until then, keep food fresh in a hanging feeder and clean it weekly. A huge pile of damp seed is the thing to stop, not a modest clean offering. From May, switch to small amounts of mealworms or suet, or pause.",
      },
    ],
  },
  5: {
    hook: "The month tender plants start to leave the greenhouse in the south.",
    intro:
      "May is the changeover. Hardy crops are already in the ground or going in. In the south, tender plants can go out once the nights are reliably mild. In the north that move is often June. Keep fleece for a cold night. Short, repeated sowings of salad and roots keep the bed going later.",
    birds:
      "Tits, robins, blackbirds, wrens and house sparrows may be feeding young or sitting on eggs. Starlings are noisy around roofs. Do not cut hedges or pull ivy off a wall that birds are using. From 1 May the RSPB asks you to pause seeds and peanuts. Small amounts of mealworms, fat balls or suet can still go out in a hanging feeder, cleaned and moved each week. Slugs, not birds, are the usual problem on the new plantings. Net the brassicas against pigeons.",
    birdSlugs: ["blackbird", "house-sparrow", "starling", "robin", "wren", "blue-tit"],
    faqs: [
      {
        q: "When can courgettes be planted out?",
        a: "May in the south and June in the north, after the last frost. Harden the plants off, and keep fleece for a cold night. Seed sown into cold soil tends to rot.",
      },
      {
        q: "Is May too late to plant potatoes?",
        a: "Early potatoes in the north are still planted in April in this list, so May is late for them. Maincrops are an April planting in both regions. A May planting will still grow, but it has a shorter season.",
      },
      {
        q: "What do garden birds need in May?",
        a: "Cover, and to be left alone while they nest. Clean water, changed every day if you put it out. From 1 May, pause seeds and peanuts. Small amounts of mealworms or suet in a hanging feeder are enough if you still want to feed. Hedge cutting can wait.",
      },
    ],
  },
  6: {
    hook: "Plant out the last tender crops, and water once they flower.",
    intro:
      "June is for planting what is still in pots, and for sowing crops that will be ready in late summer and autumn. Frost has usually finished. Water is the limit, especially while beans and courgettes are flowering. In a cold northern garden, this is the month tender plants finally go out.",
    birds:
      "Blackbirds, robins, house sparrows and starlings are often feeding fledglings. The RSPB's May to October advice is to pause seeds and peanuts, including nyjer, and to offer only small amounts of mealworms, fat balls or suet in hanging feeders. Great spotted woodpeckers visit suet, sometimes with a noisy youngster later in the summer. Keep cats away from the feeder, and wash it weekly. Goldfinches can use seed heads in the garden.",
    birdSlugs: ["house-sparrow", "starling", "blackbird", "goldfinch", "robin", "great-spotted-woodpecker"],
    faqs: [
      {
        q: "Is June too late for carrots?",
        a: "No. In the south, outdoor sowing runs through July. In the north this list includes June. Later sowings make smaller roots, which is fine if you pull them young.",
      },
      {
        q: "What still needs planting out in June?",
        a: "Tomatoes, courgettes, cucumbers, sweetcorn, French and runner beans, and the last of the leeks and brassicas you raised in pots. Basil stays under cover until June even in the south, and June is its planting month in the north as well.",
      },
      {
        q: "Young birds are on the lawn. Should I feed them?",
        a: "A small amount of soaked mealworms in a hanging feeder, and water if you can change it every day, is enough. Do not pick fledglings up if they are feathered and moving. Parent birds are usually nearby. Keep the cat in for a few days if you can.",
      },
    ],
  },
  7: {
    hook: "Pick little and often, and sow short rows for autumn.",
    intro:
      "July is a harvesting month as well as a sowing month. Pick beans, courgettes, early potatoes and salads while they are tender. Sow short rows if you want roots and leaves into autumn. Water at the root in a dry spell. A plant that sets flowers and then dries out will drop them.",
    birds:
      "Goldfinches and greenfinches use seed heads in the garden. House sparrows are still in noisy groups, often with young. Wood pigeons and collared doves find brassicas. Blackbirds take fruit. From 1 May to 31 October the RSPB asks you to pause seeds and peanuts, including nyjer. Small amounts of mealworms or suet in a hanging feeder are optional. Water in a bird bath matters in a dry spell if you can change it every day. Clean feeders weekly if you keep them up.",
    birdSlugs: ["goldfinch", "greenfinch", "house-sparrow", "blackbird", "wood-pigeon", "collared-dove", "robin", "song-thrush"],
    faqs: [
      {
        q: "What is worth sowing in July for an autumn picking?",
        a: "In the south, French beans, carrots, beetroot, radishes, lettuce, chard and spring onions are still in the outdoor sowing list. In the north the list is shorter: beetroot, radishes, lettuce, chard and spring onions. Coriander is not a July sowing in this list. It returns in August.",
      },
      {
        q: "Courgettes have slowed down. What should I check?",
        a: "Pick any fruit you left to get large, and water the soil. A fruit with a yellow, withered end was not pollinated. Powdery mildew on the leaves is common later on and does not mean the plant has finished.",
      },
      {
        q: "Should I keep feeding birds in July?",
        a: "You can pause. If you keep a feeder up, follow the RSPB and leave seeds and peanuts off it until 1 November. Small amounts of mealworms or suet in a hanging feeder are enough. Warm, wet weather spoils food faster than a frost does. Empty and wash a feeder that has gone sticky.",
      },
    ],
  },
  8: {
    hook: "Late sowings of spinach and coriander, and maincrop potatoes to lift.",
    intro:
      "August is for picking, and for a few sowings that prefer cooling weather. Spinach and coriander sown now are less inclined to bolt than a sowing made in a June heatwave. Maincrop potatoes are lifted from this month onwards, on a dry day once the tops have died back. Keep watering tomatoes, beans and courgettes.",
    birds:
      "Goldfinches, greenfinches and chaffinches are on seed heads in the garden. Blue tits may return to a suet feeder as the easy insects thin. Wood pigeons are still in the brassicas if the net has slipped. Blackbirds take berries and fallen fruit. Leave a few seed heads standing if you can spare them. Sunflower hearts and other seeds wait until 1 November.",
    birdSlugs: ["goldfinch", "greenfinch", "chaffinch", "blue-tit", "wood-pigeon", "blackbird", "bullfinch"],
    faqs: [
      {
        q: "What can still be sown in August?",
        a: "Radishes and lettuce in the south, spinach in both regions, and coriander in the south. A late spinach sowing is for autumn leaves, not a huge overwintered plant in every garden.",
      },
      {
        q: "When are maincrop potatoes lifted?",
        a: "From August to October in this list, after the tops have died back, on a dry day if you can. Early potatoes are earlier: June and July in the south, July and August in the north.",
      },
      {
        q: "Which birds use seed heads in August?",
        a: "Goldfinches first, then greenfinches and chaffinches. Teasel, sunflower and thistle are the usual plants. The RSPB asks you to pause nyjer and other seeds until 1 November, so standing seed heads in the border are the useful August offer.",
      },
    ],
  },
  9: {
    hook: "The turn toward autumn sowings, while seed feeders wait until November.",
    intro:
      "September is the turn toward winter. Outdoor sowing is a short list: spinach, coriander and, in the south, radishes. Lettuce can be sown under cover for a late picking. In milder southern gardens, overwintering onion sets can be planted. Finish picking tender crops before a frost blackens them. Garlic is next month if the bed is free.",
    birds:
      "Robins become obvious again and sing. Blue tits and great tits may use a suet feeder. Chaffinches and goldfinches are still on seed heads in the garden. Blackbirds start to take fallen apples. The RSPB's pause on seeds and peanuts runs to 31 October, so sunflower hearts wait until 1 November. Small amounts of mealworms or suet can continue in a hanging feeder.",
    birdSlugs: ["robin", "great-tit", "blue-tit", "chaffinch", "goldfinch", "blackbird"],
    faqs: [
      {
        q: "Can broad beans be sown in September?",
        a: "Not in this list. Autumn sowing of broad beans is October and November in the south, and October in the north. September seed often grows too soft before winter.",
      },
      {
        q: "What can be planted in September?",
        a: "Overwintering onion sets in the south. Mint can be moved or split into a pot. Most other planting in this list waits for October, when garlic goes in.",
      },
      {
        q: "When should winter feeding start?",
        a: "Seeds and peanuts can go back out from 1 November, which is when the RSPB's full-range window opens. Until then, small amounts of mealworms or suet in a hanging feeder are enough if you want to keep feeding. Clean water matters if you can change it every day.",
      },
    ],
  },
  10: {
    hook: "Garlic goes in, and broad beans in milder gardens.",
    intro:
      "October is garlic month, in the north and the south, as long as the soil is workable. In the south, broad beans, hardy peas and overwintering onion sets can go in too. Lift maincrop potatoes if they are still in the ground. Parsnips can stay put. Mark rows of roots before the tops disappear.",
    birds:
      "Long-tailed tits return to suet in small flocks. Starlings take suet. Robins and blackbirds take mealworms and apples. Winter thrushes may start to appear on fruit. Seeds, peanuts and nyjer wait until 1 November, when the RSPB's full-range window opens. Do not put out salted or cooked food.",
    birdSlugs: ["robin", "blackbird", "long-tailed-tit", "coal-tit", "goldfinch", "starling", "siskin", "nuthatch"],
    faqs: [
      {
        q: "What is planted in October?",
        a: "Garlic in both regions. In the south, also broad beans, hardy peas and overwintering onion sets. In the north, broad beans can be sown outdoors. Hardy peas and overwintering sets are left off the northern list here.",
      },
      {
        q: "Can parsnips stay in the ground?",
        a: "Yes. Harvest runs from October through winter in both regions. Mark the row, because the foliage dies back and the roots are then invisible.",
      },
      {
        q: "What bird food suits October?",
        a: "Until 31 October, small amounts of mealworms, fat balls or suet in hanging feeders, plus windfall apples for blackbirds. From 1 November you can add sunflower hearts, nyjer and peanuts again. October rain clumps a feeder that was filled too full, so keep amounts small and clean the feeder weekly.",
      },
    ],
  },
  11: {
    hook: "A short sowing list, and the winter vegetables to cut as you need them.",
    intro:
      "November sowing is a short list. In the south, broad beans and hardy peas can still go in, ideally under a cloche. Garlic can be planted while the soil is workable. In the north, outdoor sowing of those beans and peas has finished in this list. The harvest is what is standing: leeks, parsnips, sprouts, kale and the last chard and parsley. Stay off wet soil.",
    birds:
      "This is the core feeding season, inside the RSPB's 1 November to 30 April window. Robins, blackbirds, blue tits, great tits and goldfinches use hearts and suet in hanging feeders. Redwings and fieldfares take berries and windfall apples. Bramblings may join chaffinches on seed spilled under the feeder. Offer less at a time when the weather is wet, because damp seed goes mouldy. Wash a feeder that smells sour, and prefer hanging feeders to a bird table.",
    birdSlugs: ["robin", "blackbird", "blue-tit", "great-tit", "goldfinch", "redwing", "fieldfare", "brambling"],
    faqs: [
      {
        q: "Can broad beans still be sown in November?",
        a: "In the south, yes, using a hardy type, ideally under a cloche. In the north this list stops outdoor broad beans in October. A pot in a cold frame is the alternative if the ground is sodden.",
      },
      {
        q: "What can be harvested in November?",
        a: "Leeks, parsnips, Brussels sprouts and kale in both regions, plus chard and parsley in the south for a bit longer. Take what you need and leave the rest in the ground while it is healthy.",
      },
      {
        q: "How should birds be fed in a wet November?",
        a: "Little and often. Suet and sunflower hearts in a hanging feeder that sheds rain stay usable longer than mixed seed on a table in the open. Clean anything that has clumped, and break ice on the water if you can change it every day.",
      },
    ],
  },
  12: {
    hook: "Little to sow. Feed the birds and pick what is still standing.",
    intro:
      "December is the quietest sowing month. Garlic is the planting if you missed autumn and the soil is not frozen. There is nothing useful to sow outdoors in this list. Harvest leeks, parsnips, sprouts and kale as you need them, and check stored potatoes and onions for rot. Leave the digging if the ground is wet. A windowsill pot of pea shoots is a kitchen job, not a garden row.",
    birds:
      "Short days. Blue tits, coal tits and great spotted woodpeckers use suet and sunflower hearts in hanging feeders. Starlings finish suet quickly. Robins and blackbirds take mealworms and fruit. Fieldfares and redwings take apples on the lawn. A blackcap may take fruit and suet. Collared doves pick up spilled seed. Break ice on a shallow dish if you can change the water every day, and fill feeders in the morning.",
    birdSlugs: ["robin", "blackbird", "blue-tit", "coal-tit", "starling", "fieldfare", "redwing", "blackcap", "collared-dove"],
    faqs: [
      {
        q: "Is there anything to sow outdoors in December?",
        a: "Not in this list. Garlic can still be planted if the soil is workable. Everything else waits. Forcing a row of peas into frozen ground wastes the seed.",
      },
      {
        q: "Which vegetables stand through December?",
        a: "Leeks, parsnips, Brussels sprouts and kale are the ones in this list with a December harvest in both regions. Cut or lift what you will eat and leave the rest until you can work the bed without smearing the soil.",
      },
      {
        q: "What should a December feeder hold?",
        a: "Sunflower hearts and suet in hanging feeders as the base. Nyjer if goldfinches are about. Mealworms in a hanging feeder for robins. Fresh water, with the ice broken, if you can change it every day. Take suet down if a mild spell makes it soft enough to smear on feathers.",
      },
    ],
  },
};

for (const month of Array.from({ length: 12 }, (_, index) => index + 1)) {
  const note = monthNotes[month];
  if (!note) throw new Error(`Missing notes for month ${month}`);
  if (note.faqs.length < 2) throw new Error(`Month ${month} needs two questions`);
  if (note.birdSlugs.length < 4) throw new Error(`Month ${month} should name several birds`);
}

const featured = new Set(Object.values(monthNotes).flatMap((note) => note.birdSlugs));
for (const bird of birds) {
  if (!featured.has(bird.slug)) throw new Error(`${bird.slug} is not mentioned on any month page`);
}
for (const note of Object.values(monthNotes)) {
  for (const slug of note.birdSlugs) {
    if (!birds.some((bird) => bird.slug === slug)) throw new Error(`Unknown bird on a month page: ${slug}`);
  }
}

export function monthsFeaturingBird(slug: string): number[] {
  return Object.entries(monthNotes)
    .filter(([, note]) => note.birdSlugs.includes(slug))
    .map(([month]) => Number(month))
    .sort((a, b) => a - b);
}
