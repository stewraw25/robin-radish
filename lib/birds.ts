export const birdSlugs = [
  "robin",
  "blue-tit",
  "great-tit",
  "coal-tit",
  "long-tailed-tit",
  "blackbird",
  "house-sparrow",
  "goldfinch",
  "greenfinch",
  "chaffinch",
  "starling",
  "wren",
  "dunnock",
  "wood-pigeon",
  "great-spotted-woodpecker",
  "song-thrush",
  "nuthatch",
  "bullfinch",
  "siskin",
] as const;

export type BirdSlug = (typeof birdSlugs)[number];

export type Bird = {
  slug: BirdSlug;
  name: string;
  summary: string;
  recognise: string;
  food: string;
  nesting: string;
  /** Feeder food is part of the page, so a shop link is relevant. */
  feeder: boolean;
  related: BirdSlug[];
  faqs: { q: string; a: string }[];
};

export const birds: Bird[] = [
  {
    slug: "robin",
    name: "Robin",
    summary: "A small, upright bird with an orange-red breast that feeds on the ground.",
    recognise:
      "Smaller than a blackbird, with an orange-red face and breast, brown upper parts and a pale belly. The beak is thin. It hops, stops, and often flicks its wings. Males and females look alike. A robin defends a patch of garden and will chase another robin off.",
    food: "Mealworms on a ground tray or bird table are the food robins take most readily. Soak dried mealworms first. Sunflower hearts and suet crumbs on the same tray are useful in winter, when insects are scarce. They also turn leaf litter for beetles and worms. A hanging tube is a poor first choice. They will sometimes learn one, but the tray is the reliable offer.",
    nesting:
      "Robins nest low, in a hollow, thick ivy, a shed, or an open-fronted nest box hidden in a shrub. The nest is a cup of leaves and moss. They can raise more than one brood from spring into summer. Put a box up in autumn or winter, face it out of the wettest wind, and then leave it alone.",
    feeder: true,
    related: ["blackbird", "dunnock", "wren"],
    faqs: [
      {
        q: "Why has the robin in my garden disappeared?",
        a: "Robins hide while they moult, and they move around a territory. A second robin may have driven the first one off. Check that the tray is clean, that the food is fresh, and that a cat is not sitting under it.",
      },
      {
        q: "Will a robin use a nest box with a small hole?",
        a: "That box is aimed at tits. Robins use an open front, sited low and tucked into cover. Many boxes are never used. Shrubs and ivy are nest sites with no box at all.",
      },
    ],
  },
  {
    slug: "blue-tit",
    name: "Blue tit",
    summary: "A tiny, acrobatic tit with a blue cap and yellow underparts.",
    recognise:
      "Smaller than a sparrow. Blue cap, white face with a dark line through the eye, yellow underparts and blue-grey wings. It hangs upside down on feeders and on the ends of twigs. The similar great tit is larger, with a black head and a black stripe down a yellow belly.",
    food: "Sunflower hearts in a hanging feeder, and suet in cold weather. Peanuts belong in a rigid mesh feeder so the bird chips pieces off, rather than loose where a whole nut can be carried to a nest. They also take insects and caterpillars from leaves, which is most of the diet once spring arrives.",
    nesting:
      "A hole nester. A nest box with a hole about 25 mm across suits blue tits and keeps larger birds out. Site it around two metres up, facing somewhere between north and east if you can, and out of full sun. Clean the box out in autumn, not while birds are using it. They line the nest with moss, grass and feathers.",
    feeder: true,
    related: ["great-tit", "coal-tit", "long-tailed-tit"],
    faqs: [
      {
        q: "What size of nest-box hole suits a blue tit?",
        a: "About 25 mm. A larger hole lets house sparrows and great tits in more easily. The box still may not be used. Put it up before the breeding season and leave it undisturbed.",
      },
      {
        q: "Do blue tits need food in summer?",
        a: "They find a lot of insects once the leaves are out. You can keep a clean feeder up, with small amounts, or pause. If you offer peanuts in the breeding season, keep them in a mesh feeder.",
      },
    ],
  },
  {
    slug: "great-tit",
    name: "Great tit",
    summary: "The largest common tit, with a black head, white cheeks and a stripe down the belly.",
    recognise:
      "Bigger and longer-tailed than a blue tit, still smaller than a blackbird. Glossy black head, large white cheeks, yellow belly with a black stripe down the middle. The stripe is often wider on males. The song is a repeated two-note phrase, sometimes written as teacher-teacher.",
    food: "Sunflower hearts and suet on a hanging feeder or a table. They also take peanuts from a mesh feeder. In the breeding season they hunt caterpillars in trees. They are assertive at a feeder and will displace blue tits.",
    nesting:
      "A hole or a nest box. A hole around 28 mm lets great tits in. Blue tits can still use a box that size, so if you want to favour blue tits, use the smaller hole on a second box. The nest is moss and hair. They usually raise one brood, sometimes two.",
    feeder: true,
    related: ["blue-tit", "coal-tit", "starling"],
    faqs: [
      {
        q: "How do I tell a great tit from a blue tit?",
        a: "The great tit has a black head and white cheeks, and a dark line down the yellow belly. The blue tit has a blue cap and a white face with a dark eye stripe, and no full black bib.",
      },
      {
        q: "Will a great tit empty the peanut feeder?",
        a: "It will take a steady share. Offer mesh-feeder peanuts as well as sunflower hearts, and put out what will be eaten while it is fresh rather than a feeder that sits full for a week.",
      },
    ],
  },
  {
    slug: "coal-tit",
    name: "Coal tit",
    summary: "A small, grey-buff tit with a white patch on the back of the neck.",
    recognise:
      "Smaller than a great tit and about the size of a blue tit, without the blue tit’s yellow belly. Black cap and bib, white cheeks, and a white stripe on the nape that shows from behind. The back is grey and the underparts are buff. It often snatches a seed and flies off to hide it.",
    food: "Sunflower hearts and suet. It is a regular on hanging feeders, especially where there are conifers nearby, and it caches food in bark and in the ground. Peanuts in a mesh feeder are taken too.",
    nesting:
      "A hole nester, often low, including holes in banks and stumps as well as nest boxes. A 25 mm hole is suitable. The nest is moss and hair. Leave established ivy and dead wood if you want those natural sites.",
    feeder: true,
    related: ["blue-tit", "great-tit", "long-tailed-tit"],
    faqs: [
      {
        q: "Why does a coal tit take one seed and leave?",
        a: "It stores food. A seed hidden in bark or in the ground is how it deals with a busy feeder. That is ordinary behaviour, not a sign that the food is wrong.",
      },
      {
        q: "Is a coal tit a sign of a particular garden?",
        a: "They are widespread in the UK and are especially at home where there are conifers, but they also use ordinary broadleaf gardens and feeders.",
      },
    ],
  },
  {
    slug: "long-tailed-tit",
    name: "Long-tailed tit",
    summary: "A tiny pink, black and white bird with a tail longer than its body.",
    recognise:
      "A small round body and a very long, narrow tail. Black and white, with a pinkish wash on the flanks. They travel in parties and call constantly, a thin high note. They are not shaped like a blue tit. The tail is the feature you see first.",
    food: "Insects in summer. In winter they come to suet, fat balls and sometimes sunflower hearts, often as a group that arrives and leaves together. A suet cage is the feeder they use. They rarely sit and eat a pile of mixed seed.",
    nesting:
      "A remarkable domed nest of moss, lichen and spider silk, usually in a fork of a shrub such as gorse, bramble or a garden bush. They do not use a standard hole-fronted tit box. Leave dense shrubs uncut through spring. Parties in winter often include young birds from more than one nest, and birds roost huddled together.",
    feeder: true,
    related: ["blue-tit", "coal-tit", "goldfinch"],
    faqs: [
      {
        q: "Will long-tailed tits use a nest box?",
        a: "Not a typical tit box. They build their own domed nest in a shrub. The useful thing in a garden is dense cover that is not trimmed in the nesting season.",
      },
      {
        q: "What should I put out when a flock arrives?",
        a: "Suet, in a cage, is the food they come for in cold weather. They may ignore a feeder of mixed grain. The flock often stays only a few minutes.",
      },
    ],
  },
  {
    slug: "blackbird",
    name: "Blackbird",
    summary: "A familiar thrush. Males are black with a yellow beak. Females are brown.",
    recognise:
      "About the size of a small dove, with a long tail. The male is black with a yellow-orange beak and a yellow ring around the eye. The female is brown, with a darker beak and a mottled breast. They hop and run on lawns, and the song is a leisurely fluty phrase from a roof or a tree. Young birds are brown and speckled.",
    food: "Worms, insects and fruit. On a feeder they take mealworms and fruit from a tray or the ground, not from a hanging tube. Windfall apples are useful in autumn and winter. Sunflower hearts and suet crumbs on a low tray are taken as well. Soak dried mealworms.",
    nesting:
      "A cup of grass and mud in a hedge, a climber, a shed or a dense shrub, often not very high. They can raise several broods from early spring into summer. Leave hedges uncut while birds are nesting. The male may sing from the same perch each morning.",
    feeder: true,
    related: ["robin", "dunnock", "wood-pigeon"],
    faqs: [
      {
        q: "A brown bird is following the black one. Is that a different species?",
        a: "Usually it is a female blackbird. She is brown rather than black, with a speckled breast. Young blackbirds are brown too. A song thrush is smaller, with a neatly spotted breast and no plain brown female of a black male.",
      },
      {
        q: "Will blackbirds eat apples?",
        a: "Yes. Halve a windfall or a soft apple and leave it on the ground. That is a winter food, separate from the seed feeder. Do not put out cooked or salted food.",
      },
    ],
  },
  {
    slug: "house-sparrow",
    name: "House sparrow",
    summary: "A stocky, sociable brown bird with a thick beak, often in a noisy group.",
    recognise:
      "The male has a grey crown, chestnut sides to the head, a black bib and pale cheeks. The female is plainer brown, with a pale stripe behind the eye. The beak is thick. They chirp, they hop, and they usually arrive as a group. A dunnock is slimmer, with a fine bill, and it shuffles alone under the feeder.",
    food: "Sunflower hearts, and a mixed seed that contains sunflower and millet rather than mostly wheat. They feed on the ground, on a table and on hanging feeders. They also take insects while they are raising young, and buds and seed from the garden.",
    nesting:
      "A hole in a building, a nest box, or a dense climber such as ivy. They nest in loose colonies, so a row of boxes or a terrace of sparrow boxes is sometimes used where a single box is ignored. The nest is an untidy mass of grass and feathers. Leave ivy on a wall if sparrows are using it.",
    feeder: true,
    related: ["dunnock", "starling", "chaffinch"],
    faqs: [
      {
        q: "How do I tell a house sparrow from a dunnock?",
        a: "The sparrow has a thick seed-eater’s beak and, in the male, a black bib. The dunnock is slimmer and greyer, with a thin bill, and it creeps on the ground rather than chirping from the gutter in a flock.",
      },
      {
        q: "What nest box suits house sparrows?",
        a: "A hole about 32 mm, or a dedicated sparrow terrace with several compartments. They like to nest near each other. Fix boxes under the eaves, out of the strong sun, before spring.",
      },
    ],
  },
  {
    slug: "goldfinch",
    name: "Goldfinch",
    summary: "A small finch with a red, white and black face and a yellow bar on the wing.",
    recognise:
      "Smaller than a sparrow. Red face with black and white markings, a brown back, and a broad yellow band on a black wing. The beak is fine and pointed. The tail is slightly forked. They often feed in a small group and twitter as they fly. A greenfinch is larger, greener, and has a heavy beak.",
    food: "Nyjer seed in a feeder with very small holes, and sunflower hearts in an ordinary seed feeder. They also feed on teasels, thistles and other seed heads. If you can leave some of those standing, the birds will use them. Nyjer poured into a normal feeder spills straight through.",
    nesting:
      "A neat cup of grass, moss and lichen, often towards the end of a branch or in a garden tree or shrub. They nest later than tits, commonly from late spring, and may have two broods. Leave hedges until the nesting season is over.",
    feeder: true,
    related: ["greenfinch", "chaffinch", "blue-tit"],
    faqs: [
      {
        q: "Why is the nyjer feeder ignored?",
        a: "Goldfinches can take a while to find a new feeder. Hang it near a feeder they already use, keep the seed dry, and give it a couple of weeks. Nyjer that has gone damp is refused.",
      },
      {
        q: "Do goldfinches eat sunflower hearts?",
        a: "Yes. Hearts in a normal hanging feeder are taken as well as nyjer. You do not have to offer both, but a garden that already has finches will often use both.",
      },
    ],
  },
  {
    slug: "greenfinch",
    name: "Greenfinch",
    summary: "A stocky olive-green finch with a heavy beak and yellow in the wing.",
    recognise:
      "Sparrow-sized or a little larger, with a forked tail and a pale, conical beak. Males are olive green with yellow on the wing and the side of the tail. Females are duller and more streaked. In dull light they can look plain grey-green. The call is a wheezy note.",
    food: "Sunflower hearts are the straightforward food. They also take sunflower seed in the shell and will use a table or a hanging feeder. They are less interested in nyjer than goldfinches are. Keep the feeder clean. Finches are the birds that suffer first when dirty feeders are left up.",
    nesting:
      "A cup of twigs, grass and moss in a dense shrub or a conifer. They often nest in loose groups. Leave evergreen cover untrimmed through spring and summer. The cleaning guide explains when to take feeders down if birds look fluffed and listless.",
    feeder: true,
    related: ["goldfinch", "chaffinch", "house-sparrow"],
    faqs: [
      {
        q: "Greenfinches at the feeder look fluffed and sleepy. What should I do?",
        a: "Take the feeders and the bird bath down, clean them, rake up spilled seed, and pause feeding for a couple of weeks. That is the usual step when several finches look unwell. It is general garden practice, not a diagnosis. The feeder hygiene guide sets out the cleaning.",
      },
      {
        q: "Will greenfinches use a nyjer feeder?",
        a: "Sometimes, but sunflower hearts are the food to offer first. Nyjer is aimed at goldfinches and siskins, which have finer beaks.",
      },
    ],
  },
  {
    slug: "chaffinch",
    name: "Chaffinch",
    summary: "A sparrow-sized finch. Males are pink and blue-grey, with white wing bars.",
    recognise:
      "Both sexes have two clear white bars on the wing and white outer tail feathers, easiest to see when they fly. The male has a blue-grey cap, a chestnut back and a pink breast. The female is brown and olive, with the same wing pattern. They often feed on the ground under a feeder rather than on it.",
    food: "Sunflower hearts and a mixed seed scattered on a tray or the ground. They will also use a hanging feeder, but a lot of their feeding is under it, on what other birds drop. In the wider countryside they eat weed seeds and insects.",
    nesting:
      "A neat cup of moss and lichen in a fork of a tree or a shrub. They are territorial in the breeding season, so you may see one pair rather than a flock. Winter flocks, sometimes with other finches, use fields and larger gardens.",
    feeder: true,
    related: ["goldfinch", "greenfinch", "dunnock"],
    faqs: [
      {
        q: "Why do chaffinches stay on the ground?",
        a: "That is how they usually feed. A tray or a little seed on bare ground, where they can see around them, suits them better than a tube they have to cling to. Sweep the ground if hulls build up.",
      },
      {
        q: "The brown birds have the same wing bars as the colourful one. Are they the same species?",
        a: "Yes. Female chaffinches are brown, with the white wing bars of the male. A female house sparrow lacks those bold white bars.",
      },
    ],
  },
  {
    slug: "starling",
    name: "Starling",
    summary: "A noisy, short-tailed bird that looks black, and spotted in winter.",
    recognise:
      "Smaller than a blackbird, with a short tail and a pointed beak. At a distance it looks black. In good light the feathers are glossy purple and green, and in winter they are spangled with pale spots. It walks rather than hops. Flocks are loud. Young birds are plain brown.",
    food: "Suet is the feeder food they clear first. They also eat sunflower hearts and mealworms, often in a group that arrives together. On a lawn they probe for leatherjackets and other soil insects. A suet cage disappears quickly if a flock has found it. Put out what you are willing to see gone in one visit.",
    nesting:
      "A hole in a building, a tree or a nest box with a hole about 45 mm. They are colonial and noisy around the nest. The nest is an untidy lining of grass and feathers. Leave the box alone once birds are going in and out.",
    feeder: true,
    related: ["house-sparrow", "blackbird", "great-spotted-woodpecker"],
    faqs: [
      {
        q: "Starlings empty the suet in a morning. Should I stop?",
        a: "Only if you do not want to feed them. They are doing what a flock does. Offer a smaller piece, or accept that suet is a starling food as well as a tit food. They also eat a lot of lawn grubs.",
      },
      {
        q: "Are the brown birds young starlings?",
        a: "Plain brown, short-tailed birds with a pointed beak, following the glossy adults in summer, are juvenile starlings. They gain the spots as they moult.",
      },
    ],
  },
  {
    slug: "wren",
    name: "Wren",
    summary: "A tiny brown bird with a cocked tail and a very loud song.",
    recognise:
      "One of the smallest birds in a UK garden. Warm brown, finely barred, with a thin beak and a short tail held upright. It creeps through hedges and woodpiles like a mouse. The song is a long, loud trill, surprising for the size of the bird. It is not a treecreeper, which is longer-billed and works up a trunk.",
    food: "Insects and spiders. Wrens rarely eat seed, and they are not a reason to buy a particular mix. A messy corner of leaf litter, a log pile and a dense hedge feed them. If they visit a tray at all, it is usually for a few mealworms or crumbs of suet in hard weather. Do not expect them to become feeder birds.",
    nesting:
      "A domed nest of moss and leaves tucked into a hollow, a nest box used on its side, ivy, or a shed. The male may build several nests. The female lines the one she uses. Leave piles of brush and thick climbers through the spring.",
    feeder: false,
    related: ["robin", "dunnock", "blue-tit"],
    faqs: [
      {
        q: "What food brings wrens to a feeder?",
        a: "Usually none. They hunt insects in cover. A garden with leaf litter and a hedge is more useful than a seed mix. In a hard freeze they may take a few soaked mealworms from a tray.",
      },
      {
        q: "Something tiny is singing very loudly in the hedge. Is it a wren?",
        a: "Very likely. The song is long and powerful for a bird that is barely the size of a ping-pong ball, and the tail is cocked when it pops out.",
      },
    ],
  },
  {
    slug: "dunnock",
    name: "Dunnock",
    summary: "A quiet, sparrow-like bird with a fine bill that shuffles under the feeder.",
    recognise:
      "About sparrow-sized but slimmer, with a thin bill rather than a thick seed beak. Grey head and breast, brown streaked back and flanks. It creeps and shuffles, and it flicks its wings. It is often alone or in a pair, under a bush, not chirping from the roof in a flock. People sometimes call it a hedge sparrow. It is not a sparrow.",
    food: "Insects, and small seeds on the ground. Under a feeder it takes what tits drop, including broken sunflower hearts. A ground tray with a little heart and a few mealworms suits it better than a hanging tube it will not cling to. It does not dominate a feeder.",
    nesting:
      "A neat cup low in a hedge or a dense shrub. Dunnocks have a complicated breeding life, with more than one male or female sometimes involved at one nest. For the gardener the practical point is the same as for robins: do not cut the hedge in spring, and keep a bit of cover near the ground.",
    feeder: true,
    related: ["robin", "house-sparrow", "wren"],
    faqs: [
      {
        q: "Is a dunnock a female sparrow?",
        a: "No. A female house sparrow has a thicker beak and a pale stripe behind the eye, and she is usually with other sparrows. A dunnock has a fine bill and a grey throat, and it shuffles on the ground.",
      },
      {
        q: "Where should I put food for dunnocks?",
        a: "On the ground or a low tray, near cover but not so hidden that a cat can sit in it. They pick up small seeds and the broken bits under a hanging feeder.",
      },
    ],
  },
  {
    slug: "wood-pigeon",
    name: "Wood pigeon",
    summary: "A large grey pigeon with a white neck patch and a white bar on the wing.",
    recognise:
      "Much larger than a blackbird. Plump and grey, with a small head, a white patch on each side of the neck, and a white bar across the wing that shows in flight. The tail has a dark band at the end. They clap their wings as they take off. A collared dove is smaller, paler, and has a thin black half-collar rather than a white neck patch.",
    food: "Seed, buds, leaves and spilled grain. They eat brassicas in a vegetable plot and will clear a tray of mixed seed. They are not a bird most people are trying to attract. If pigeons empty the feeder, nyjer is less useful to them because their beaks do not suit the small holes, and a caged feeder lets small birds in while keeping pigeons out. Net the cabbage and the kale.",
    nesting:
      "A thin platform of sticks in a tree or a tall shrub, used from spring well into autumn. You may find the nest surprisingly flimsy. The eggs are white. In a garden the practical response to damaged brassicas is to net the crop.",
    feeder: false,
    related: ["blackbird", "starling", "chaffinch"],
    faqs: [
      {
        q: "Wood pigeons are eating the kale. What helps?",
        a: "Net the bed, pegged down so birds cannot walk underneath. A feeder full of wheat and maize will also draw them in, so a mix that is mostly sunflower, or a cage around the feeder, gives them less of a reason to camp in the vegetable plot.",
      },
      {
        q: "Should I put out food specially for wood pigeons?",
        a: "No. They find spilled seed and garden plants without help. This site’s feeder notes are about the smaller birds. Pigeons are mentioned so you can tell them apart and keep them off the brassicas.",
      },
    ],
  },
  {
    slug: "great-spotted-woodpecker",
    name: "Great spotted woodpecker",
    summary: "A black-and-white woodpecker, starling-sized, that clings upright to trunks and feeders.",
    recognise:
      "Bold black and white, with a red patch under the tail. The male has a red patch on the back of the head. Females lack that nape patch. Young birds have a red crown. It is about the size of a starling, with a stiff tail that it braces against bark, and a straight, chisel-shaped beak. Flight is undulating. The smaller lesser spotted woodpecker is sparrow-sized and much less often seen in gardens.",
    food: "Insects under bark, and in gardens suet and peanuts in a mesh feeder. They also take sunflower hearts. A suet cake hung against a trunk, or a feeder they can cling to, is the usual setup. They can dominate a feeder for a few minutes and then leave. In spring they drum on dead wood. That is a display, not them drilling the house for food.",
    nesting:
      "They excavate a hole in a tree, often a dead trunk or a soft deciduous tree, and do not use a standard nest box. If you have a dead tree that is safe to leave, it is more useful than a box. They usually raise one brood. Starlings sometimes take over a woodpecker hole.",
    feeder: true,
    related: ["starling", "great-tit", "blue-tit"],
    faqs: [
      {
        q: "Something is drumming on the tree in spring. Is it feeding?",
        a: "A short, rapid drum in spring is a great spotted woodpecker declaring a territory. Feeding sounds are slower taps while the bird works along a branch. Drumming on a metal vent or a television aerial is the same display.",
      },
      {
        q: "Will a woodpecker use a nest box?",
        a: "Not the boxes sold for tits. They dig their own hole in wood. Leaving a standing dead trunk, where it cannot fall on anything, is the practical help.",
      },
    ],
  },
  {
    slug: "song-thrush",
    name: "Song thrush",
    summary: "A spotted thrush, smaller than a blackbird, that hunts on the lawn and smashes snail shells.",
    recognise:
      "Warm brown above, and a cream breast densely marked with arrow-shaped spots. It stands more upright than a blackbird and is smaller. The song is loud and repeats short phrases. A mistle thrush is larger, greyer, and has rounder spots. Young blackbirds are mottled, but they have a dark bill and a less neatly spotted breast.",
    food: "Worms, insects and snails from the lawn and the beds. They also take fallen fruit and berries. On a table or the ground they will take mealworms and soft fruit. They are not seed-feeder birds, and a tube of sunflower will not bring them in. A song thrush using a stone as an anvil, with broken snail shells around it, is feeding, not vandalising the path.",
    nesting:
      "A cup nest in a hedge, shrub or climber, lined with a smooth mud cup. They often raise more than one brood. Leave dense cover, and do not tidy the ivy off a wall in the nesting season. A standard hole-fronted nest box is not what they use.",
    feeder: true,
    related: ["blackbird", "robin", "dunnock"],
    faqs: [
      {
        q: "What should I feed a song thrush?",
        a: "Live or dried mealworms, and soft fruit such as apple, on the ground or a low table. They hunt snails and worms themselves if the lawn is not treated and the soil is not paved over. Seed mixes are for the finches and tits, not for thrushes.",
      },
      {
        q: "Something is smashing snail shells on the path. What is it?",
        a: "A song thrush. It carries snails to a favourite stone and breaks the shell. Broken shells in one spot are the sign. It is useful in a garden, and it is not a reason to put down slug pellets.",
      },
    ],
  },
  {
    slug: "nuthatch",
    name: "Nuthatch",
    summary: "A blue-grey bird with a black eye-stripe that runs head-first down a tree trunk.",
    recognise:
      "Blue-grey above, warm buff underneath, with a black stripe through the eye and a stout pointed bill. It is about sparrow-sized, with a very short tail. It climbs up and down trunks. No other common garden bird walks down a tree head first. The call is a loud, ringing “twit”.",
    food: "Insects from bark, and in gardens sunflower hearts and peanuts in a mesh feeder. They wedge nuts in bark and hammer them. A suet cake on a trunk suits them. They are assertive and will chase tits off a feeder for a minute. In warm weather, do not put out suet that is soft.",
    nesting:
      "A hole in a tree. They plaster mud around the entrance until it fits them, which keeps larger birds out. They do not use an open-fronted box. A hole-fronted box is sometimes taken if the hole is the right size, and they may mud it. Leaving old trees with holes is the more reliable help.",
    feeder: true,
    related: ["great-tit", "great-spotted-woodpecker", "blue-tit"],
    faqs: [
      {
        q: "What should I feed a nuthatch?",
        a: "Sunflower hearts, and peanuts in a mesh feeder they can cling to. They also take suet when it is firm. They do not need a ground tray. A feeder hung where they can fly straight to a nearby trunk is the usual setup.",
      },
      {
        q: "Will a nuthatch use a nest box?",
        a: "Sometimes, if it is a hole-fronted box and the bird can plaster the hole with mud. A tree with a natural hole is what they look for first. Do not widen the hole for them.",
      },
    ],
  },
  {
    slug: "bullfinch",
    name: "Bullfinch",
    summary: "A plump finch with a black cap and a short, heavy bill. The male has a rose-pink breast.",
    recognise:
      "Both sexes have a black cap, black wings with a pale bar, a white rump and a short thick bill. The male’s breast is pink. The female is grey-brown underneath. They are quiet for finches, with a soft piping call, and they often stay in a pair. A chaffinch has a longer bill and no black cap.",
    food: "Buds, seeds and fruit stones. In gardens they take sunflower hearts. They are not nyjer specialists in the way a goldfinch or a siskin is. In spring they eat flower buds on fruit trees. That is normal feeding, not a reason to trap them. Netting a small tree is the practical answer if you need the fruit. Peg the net so birds cannot get under it, and check it.",
    nesting:
      "A twig cup in a dense hedge or thick shrub. They like cover more than an open lawn. A hole-fronted nest box is not their nest. Keep a thick hedge, and do not cut it in the nesting season.",
    feeder: true,
    related: ["chaffinch", "goldfinch", "greenfinch"],
    faqs: [
      {
        q: "What should I feed a bullfinch?",
        a: "Sunflower hearts on a feeder or a tray. They also take seed from the ground under the feeder. Nyjer is optional. They will still come for the buds on a fruit tree in spring whether or not you feed them.",
      },
      {
        q: "Bullfinches are eating the buds on my fruit tree. What helps?",
        a: "Net the tree while the buds are swelling, and take the net off once the fruit has set if you can, so it is not there for the whole summer. Check the net for trapped birds. Do not use a loose net that sags onto the branches.",
      },
    ],
  },
  {
    slug: "siskin",
    name: "Siskin",
    summary: "A small, streaky yellow-green finch that hangs on nyjer and alder cones, often in winter.",
    recognise:
      "Smaller than a greenfinch, with a fine pointed bill and a forked tail. The male has a black crown and a yellow-green body with dark streaks. The female is greyer and more streaked, with less black on the head. They often arrive in a small flock and feed upside down. A greenfinch is bulkier and has a heavier bill.",
    food: "Seeds, especially from alder and birch, and in gardens nyjer and sunflower hearts. A nyjer feeder is the usual way people see them. They also take the finer seed that goldfinches spill. They are often winter visitors to a garden and may be absent in summer. Do not assume an empty feeder in July means the food is wrong.",
    nesting:
      "High in a conifer, not in a garden nest box. Most gardens will not host a nest. Feeding them in winter does not mean they should be nesting in the hedge. Leave the nest boxes for the tits and sparrows.",
    feeder: true,
    related: ["goldfinch", "greenfinch", "chaffinch"],
    faqs: [
      {
        q: "What should I feed a siskin?",
        a: "Nyjer in a fine-mesh feeder, or sunflower hearts. They are small and they cling. A feeder with perches that only fit a larger bird will not suit them as well. Keep the feeder clean. Finches share diseases when the ports are clogged.",
      },
      {
        q: "Siskins came all winter and then vanished. Did I do something wrong?",
        a: "Often, no. Many gardens only see them from autumn to spring, when they move looking for seed. They may be feeding on alder and birch instead. Keep the nyjer fresh and dry. Damp nyjer goes stale and they ignore it.",
      },
    ],
  },
];

const seen = new Set<string>();
for (const bird of birds) {
  if (seen.has(bird.slug)) throw new Error(`Duplicate bird: ${bird.slug}`);
  seen.add(bird.slug);
  if (bird.faqs.length < 2) throw new Error(`${bird.slug} needs two questions`);
  for (const related of bird.related) {
    if (related === bird.slug) throw new Error(`${bird.slug} lists itself as related`);
  }
}
for (const slug of birdSlugs) {
  if (!seen.has(slug)) throw new Error(`Missing bird page for ${slug}`);
}
if (birds.length !== birdSlugs.length) {
  throw new Error(`Expected ${birdSlugs.length} birds, found ${birds.length}`);
}

export function getBird(slug: string): Bird | undefined {
  return birds.find((bird) => bird.slug === slug);
}

export function relatedBirds(bird: Bird): Bird[] {
  return bird.related
    .map((slug) => getBird(slug))
    .filter((item): item is Bird => Boolean(item));
}
