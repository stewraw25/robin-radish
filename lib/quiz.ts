export type BirdGroup = "robins" | "tits" | "finches" | "sparrows" | "starlings" | "mix";
export type Feeder = "hanging" | "nyjer" | "ground" | "suet" | "none";
export type Budget = "one" | "two" | "few";
export type Squirrels = "yes" | "sometimes" | "no";
export type FoodId = "sunflower-hearts" | "nyjer" | "suet" | "mealworms" | "mixed-seed";

export type QuizAnswers = {
  birds: BirdGroup[];
  feeder: Feeder | null;
  budget: Budget | null;
  squirrels: Squirrels | null;
};

export const BIRD_GROUP_LINKS: Record<BirdGroup, { href: string; label: string }[]> = {
  robins: [
    { href: "/birds/robin", label: "Robin" },
    { href: "/birds/blackbird", label: "Blackbird" },
    { href: "/birds/song-thrush", label: "Song thrush" },
    { href: "/birds/redwing", label: "Redwing" },
    { href: "/birds/fieldfare", label: "Fieldfare" },
  ],
  tits: [
    { href: "/birds/blue-tit", label: "Blue tit" },
    { href: "/birds/great-tit", label: "Great tit" },
    { href: "/birds/coal-tit", label: "Coal tit" },
    { href: "/birds/long-tailed-tit", label: "Long-tailed tit" },
  ],
  finches: [
    { href: "/birds/goldfinch", label: "Goldfinch" },
    { href: "/birds/greenfinch", label: "Greenfinch" },
    { href: "/birds/chaffinch", label: "Chaffinch" },
    { href: "/birds/bullfinch", label: "Bullfinch" },
    { href: "/birds/siskin", label: "Siskin" },
    { href: "/birds/brambling", label: "Brambling" },
  ],
  sparrows: [
    { href: "/birds/house-sparrow", label: "House sparrow" },
    { href: "/birds/dunnock", label: "Dunnock" },
  ],
  starlings: [{ href: "/birds/starling", label: "Starling" }],
  mix: [{ href: "/birds", label: "All garden birds" }],
};

export const BIRD_OPTIONS: { id: BirdGroup; label: string }[] = [
  { id: "robins", label: "Robins, blackbirds or other thrushes" },
  { id: "tits", label: "Tits, such as blue tits and great tits" },
  { id: "finches", label: "Finches, such as goldfinches, greenfinches or siskins" },
  { id: "sparrows", label: "Sparrows or dunnocks" },
  { id: "starlings", label: "Starlings" },
  { id: "mix", label: "A mix, or I am not sure yet" },
];

export const FEEDER_OPTIONS: { id: Feeder; label: string; hint: string }[] = [
  { id: "hanging", label: "A hanging seed feeder", hint: "The tube or cage most people start with." },
  { id: "nyjer", label: "A nyjer feeder", hint: "Fine mesh and very small holes." },
  { id: "ground", label: "A ground tray or bird table", hint: "Food sitting low, where robins can land." },
  { id: "suet", label: "A suet cage or fat-ball feeder", hint: "For blocks, pellets or balls." },
  { id: "none", label: "No feeder yet", hint: "You can still put food out while you decide." },
];

export const BUDGET_OPTIONS: { id: Budget; label: string; hint: string }[] = [
  { id: "one", label: "One food", hint: "Keep the routine simple." },
  { id: "two", label: "Two foods", hint: "Enough for most small gardens." },
  { id: "few", label: "A few foods", hint: "Room for a tray as well as a feeder." },
];

export const SQUIRREL_OPTIONS: { id: Squirrels; label: string }[] = [
  { id: "yes", label: "Yes, they empty the feeder" },
  { id: "sometimes", label: "Sometimes" },
  { id: "no", label: "Not a problem here" },
];

export const FOODS: Record<FoodId, { name: string; explanation: string }> = {
  "sunflower-hearts": {
    name: "Sunflower hearts",
    explanation:
      "The kernel of a sunflower seed with the shell taken off. Tits, finches, sparrows and many other garden birds eat them. Shells do not pile up under the feeder. Keep them dry.",
  },
  nyjer: {
    name: "Nyjer seed",
    explanation:
      "A very small oil-rich seed. Goldfinches and siskins take it from a feeder with tiny holes. Most other birds leave it alone, which helps if pigeons clear an ordinary feeder.",
  },
  suet: {
    name: "Suet",
    explanation:
      "A solid fat food sold as blocks, balls or pellets. Tits, starlings and woodpeckers take it in cold weather. Take it down if the weather turns warm enough for it to soften and smear on feathers.",
  },
  mealworms: {
    name: "Mealworms",
    explanation:
      "Dried or live larvae. Robins and blackbirds often take them from a ground tray or a bird table, rather than a hanging tube. Soak dried mealworms in water first so they are easier to eat and carry some moisture.",
  },
  "mixed-seed": {
    name: "Mixed seed",
    explanation:
      "A blend. Read the bag: a mix that is mostly wheat or maize is often left on the ground and can attract pigeons. A mix with more sunflower and millet is eaten by a wider range of small birds. Put out only what is eaten in a day or two, and store the bag dry.",
  },
};

const TIE_BREAK: FoodId[] = ["sunflower-hearts", "suet", "mealworms", "nyjer", "mixed-seed"];

const LIMIT: Record<Budget, number> = { one: 1, two: 2, few: 3 };

export type FoodRecommendation = {
  id: FoodId;
  name: string;
  explanation: string;
  because: string;
};

export type QuizResult = {
  foods: FoodRecommendation[];
  feederNote: string | null;
  squirrelNote: string | null;
};

function add(scores: Record<FoodId, number>, id: FoodId, amount: number) {
  scores[id] += amount;
}

export function recommend(answers: QuizAnswers): QuizResult | { error: string } {
  if (answers.birds.length === 0) return { error: "Choose at least one group of birds." };
  if (!answers.feeder) return { error: "Choose the feeder you use, or say you do not have one yet." };
  if (!answers.budget) return { error: "Choose how many foods you want to keep." };
  if (!answers.squirrels) return { error: "Say whether squirrels take the food." };

  const scores: Record<FoodId, number> = {
    "sunflower-hearts": 0,
    nyjer: 0,
    suet: 0,
    mealworms: 0,
    "mixed-seed": 0,
  };
  const because: Record<FoodId, string[]> = {
    "sunflower-hearts": [],
    nyjer: [],
    suet: [],
    mealworms: [],
    "mixed-seed": [],
  };

  const note = (id: FoodId, text: string, points: number) => {
    add(scores, id, points);
    if (!because[id].includes(text)) because[id].push(text);
  };

  if (answers.birds.includes("robins")) {
    note("mealworms", "Robins and blackbirds often take mealworms from a tray.", 3);
    note("sunflower-hearts", "They also eat sunflower hearts.", 2);
  }
  if (answers.birds.includes("tits")) {
    note("sunflower-hearts", "Tits use a hanging feeder of sunflower hearts through the winter.", 3);
    note("suet", "Suet is a cold-weather food for tits.", 2);
  }
  if (answers.birds.includes("finches")) {
    note("nyjer", "Goldfinches and siskins take nyjer from a fine-mesh feeder.", 3);
    note("sunflower-hearts", "Finches also eat sunflower hearts from a normal seed feeder.", 2);
  }
  if (answers.birds.includes("sparrows")) {
    note("sunflower-hearts", "Sparrows and dunnocks eat sunflower hearts.", 2);
    note("mixed-seed", "A mixed seed with plenty of sunflower and millet suits sparrows on a table.", 2);
  }
  if (answers.birds.includes("starlings")) {
    note("suet", "Starlings take suet readily.", 3);
    note("sunflower-hearts", "They will also eat sunflower hearts.", 1);
  }
  if (answers.birds.includes("mix")) {
    note("sunflower-hearts", "Sunflower hearts are a straightforward food when several species visit.", 3);
    note("suet", "Suet adds a second food for cold days.", 1);
    note("mixed-seed", "A mixed seed is a third option if you want variety on a table.", 1);
  }

  if (answers.feeder === "hanging") {
    note("sunflower-hearts", "They suit the hanging feeder you already have.", 2);
  } else if (answers.feeder === "nyjer") {
    note("nyjer", "You already have the fine-mesh feeder nyjer needs.", 3);
  } else if (answers.feeder === "ground") {
    note("mealworms", "A ground tray or table is the right place for mealworms.", 2);
    note("sunflower-hearts", "Hearts can go on the same tray.", 1);
  } else if (answers.feeder === "suet") {
    note("suet", "You already have somewhere to hang suet.", 2);
  } else {
    note("sunflower-hearts", "A hanging feeder of sunflower hearts is a simple first setup.", 1);
  }

  const ranked = (Object.keys(scores) as FoodId[])
    .filter((id) => scores[id] > 0)
    .sort((a, b) => scores[b] - scores[a] || TIE_BREAK.indexOf(a) - TIE_BREAK.indexOf(b));

  const chosen = ranked.slice(0, LIMIT[answers.budget]);

  let feederNote: string | null = null;
  if (answers.feeder === "none") {
    feederNote =
      "You do not need several feeders to start. A hanging feeder for sunflower hearts, or a simple tray on a stand, is enough while you see who arrives.";
  } else if (answers.feeder === "nyjer" && !chosen.includes("nyjer")) {
    feederNote =
      "Keep the nyjer feeder up if goldfinches visit. This list follows the birds you ticked, and nyjer is aimed at finches.";
  } else if (chosen.includes("nyjer") && answers.feeder !== "nyjer") {
    feederNote = "Nyjer needs its own feeder with tiny holes. It spills straight through a normal seed feeder.";
  } else if (chosen.includes("mealworms") && answers.feeder === "hanging") {
    feederNote = "Mealworms are easier on a ground tray or bird table than in a hanging tube.";
  }

  let squirrelNote: string | null = null;
  if (answers.squirrels === "yes" || answers.squirrels === "sometimes") {
    squirrelNote =
      "Squirrels learn how to reach seed. A baffle on the pole, a caged feeder, or moving the feeder away from a fence they can jump from can slow them down. None of these stop every squirrel. Sunflower hearts and suet are the foods they notice first. Nyjer is less interesting to many of them.";
  }

  return {
    foods: chosen.map((id) => ({
      id,
      name: FOODS[id].name,
      explanation: FOODS[id].explanation,
      because: because[id].join(" "),
    })),
    feederNote,
    squirrelNote,
  };
}
