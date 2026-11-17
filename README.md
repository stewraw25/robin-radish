# Robin & Radish

A UK garden guide in one site: grow food at home, and feed the birds. The first version has a weekly jobs note, a sowing planner, a bird food quiz, and a handful of starter guides.

It is a static-friendly Next.js app (App Router, TypeScript) meant to be deployed on Vercel. Content lives in files. There is no database and no account system.

## Run it locally

```bash
npm install
npm run dev
```

The dev server uses port **43123**: [http://localhost:43123](http://localhost:43123).

Copy `.env.example` to `.env.local` if you want to set the site URL, a contact email, or affiliate IDs. The site runs without them. Shop links then go straight to the retailer, and the contact page says the inbox is not set yet.

```bash
npm run lint
npm run build
npm run check:structured-data
```

`check:structured-data` reads the production build and fails if Product, Offer, Review or AggregateRating markup appears. This is an affiliate guide, so the only JSON-LD types used are Article, BreadcrumbList, FAQPage, WebSite and Organization.

## Add the weekly update

Each week is one JSON file. That is the only file you need to touch for the Monday note.

1. Copy `content/weeks/2026-11-16.json`.
2. Name the copy after the Monday of that week, `YYYY-MM-DD.json`. The `weekOf` field inside the file must be the same Monday.
3. Edit the intro and the four lists: what to sow or plant, what to harvest, which birds to look for, and what to put in the feeder. `also` is a short list of other jobs.
4. Commit and deploy.

The home page and `/this-week` show the latest file whose Monday is today or earlier (Europe/London). A file dated next Monday stays hidden until that day. You can add it early.

Keep the note as general UK seasonal practice. Do not add figures, prices or scores.

## Guides

Starter articles are Markdown files with a small frontmatter block, saved as `.mdx`:

`content/guides/your-slug.mdx`

```md
---
title: Short title
description: One sentence for search results.
date: 2026-11-16
category: grow
---
```

`category` is `grow` or `birds`. Finish the article with a `## Common questions` section. Each `### Question` is followed by the answer paragraph. Those questions are shown on the page and used for FAQ structured data, so the wording has to be the wording a reader sees.

Link to the four shops with their normal addresses (for example `https://www.thompson-morgan.com/`). The site adds tracking when an affiliate ID is set. Internal links look like `[sowing planner](/planner)`.

## Month, crop and bird pages

These are generated. You do not add a new file for each page.

- Month pages (`/what-to-sow/january` and the other eleven) read `lib/crops.ts` for the lists and `lib/month-notes.ts` for the intro, the bird paragraph and the questions.
- Crop pages (`/grow/tomatoes` and the rest) read `lib/crops.ts` for the months and `lib/crop-care.ts` for position, spacing, care and problems. A new crop needs both files.
- Bird pages (`/birds/robin` and fourteen others) are `lib/birds.ts`, with a matching silhouette in `components/bird-silhouette.tsx`.

The weekly note is still the only file that changes every Monday. These pages stay put.

## Affiliate IDs

Edit nothing in the pages. IDs live in the environment, and the shop list lives in `lib/affiliates.ts`.

| Shop | Network | What you set |
| --- | --- | --- |
| Thompson & Morgan | Awin (merchant `2283`) | `AWIN_PUBLISHER_ID` |
| Crocus | Awin (merchant `7833`) | the same Awin publisher ID |
| CJ Wildlife (birdfood.co.uk) | Awin (merchant `111572`) | the same Awin publisher ID |
| Haith's | Webgains (programme `2088`) | `WEBGAINS_CAMPAIGN_ID` |

One Awin publisher ID covers Thompson & Morgan, Crocus and CJ Wildlife. You apply to each programme from your Awin account. Haith's is separate, on Webgains. Confirm that programme is open before you rely on it. If a merchant has moved network, change the ID in `lib/affiliates.ts`.

Placeholders in `.env.example` (`YOUR_AWIN_PUBLISHER_ID`, `YOUR_WEBGAINS_CAMPAIGN_ID`) are not written into links. Until you replace them, links go to the shop itself and are still marked `rel="sponsored nofollow noopener"`.

Set the variables in `.env.local` for local builds, and in the Vercel project for production. **Redeploy after changing them.** They are read when the site builds.

Optional per-shop Awin overrides, if you ever use more than one publisher account: `AWIN_PUBLISHER_ID_THOMPSON_MORGAN`, `AWIN_PUBLISHER_ID_CROCUS`, `AWIN_PUBLISHER_ID_CJ_WILDLIFE`.

## Site URL and contact email

`SITE_URL` is the canonical host, with no trailing slash. The default is `https://robinandradish.co.uk`. Set it in Vercel before you point a domain at the project. This repository does not register a domain or change DNS.

`CONTACT_EMAIL` is the address on the contact and privacy pages. Leave it empty until you have an inbox you will actually read. There is no guessed address.

## Deploy to Vercel

1. Push this project to a Git host Vercel can see.
2. Import it as a Next.js project. The framework preset is enough. Install is `npm install`. Build is `npm run build`.
3. Add environment variables: `SITE_URL`, and, when you have them, `CONTACT_EMAIL`, `AWIN_PUBLISHER_ID`, `WEBGAINS_CAMPAIGN_ID`.
4. Deploy.
5. When you attach a domain, set `SITE_URL` to that `https://` host and redeploy so canonicals, the sitemap and Open Graph URLs match.

Adding a weekly JSON file is a normal commit. Vercel rebuilds from that push.

## What you still need to supply

- An Awin publisher ID, and approval on the Thompson & Morgan, Crocus and CJ Wildlife programmes.
- A Webgains campaign ID for Haith's, after you confirm the programme is open.
- A contact email, if you want the contact page to receive mail.
- The production domain, if it will not be `https://robinandradish.co.uk`. Set `SITE_URL` to match.
