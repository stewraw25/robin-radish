#!/usr/bin/env node
/**
 * Tell Bing (and the other IndexNow engines: Yandex, Seznam, Naver) which URLs changed.
 * Bing's index feeds Copilot and ChatGPT search, so this is how new pages reach them quickly.
 *
 * Run by hand after a deploy is live:   node scripts/indexnow.mjs            (every URL in the live sitemap)
 *                                        node scripts/indexnow.mjs /blog/x    (only the paths given)
 * The key file must already be live at https://robinandradish.co.uk/74e089b9624a1531d2c804e482a0b70a.txt.
 * Nothing runs this automatically.
 */
const HOST = 'robinandradish.co.uk';
const KEY = '74e089b9624a1531d2c804e482a0b70a';
const SITE = `https://${HOST}`;

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((p) => (p.startsWith('http') ? p : `${SITE}${p.startsWith('/') ? p : '/' + p}`)) : await sitemapUrls();

const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file ${SITE}/${KEY}.txt is not live yet. Deploy first.`);
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status >= 300) process.exit(1);
