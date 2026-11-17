#!/usr/bin/env node
/**
 * Fail if Product, Offer, Review or AggregateRating structured data
 * appears in the Next.js build output.
 *
 *   npm run build && npm run check:structured-data
 *
 * This site is an affiliate guide. Allowed JSON-LD types are Article,
 * BreadcrumbList, FAQPage, WebSite and Organization.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const FORBIDDEN = ["Product", "Offer", "Review", "AggregateRating"];
const ALLOWED = ["Article", "BreadcrumbList", "FAQPage", "WebSite", "Organization"];
const root = path.resolve(process.argv[2] || path.join(".next", "server"));

function patternsFor(name) {
  return [
    new RegExp(`"@type"\\s*:\\s*"${name}"`),
    new RegExp(`"@type"\\s*:\\s*\\[\\s*"${name}"`),
    new RegExp(`\\\\"@type\\\\"\\s*:\\s*\\\\"${name}\\\\"`),
    new RegExp(`schema\\.org/${name}\\b`),
    new RegExp(`itemtype\\s*=\\s*["']https?://schema\\.org/${name}["']`, "i"),
  ];
}

export function findForbidden(text) {
  const hits = [];
  for (const name of FORBIDDEN) {
    for (const pattern of patternsFor(name)) {
      if (pattern.test(text)) hits.push(name);
    }
  }
  return [...new Set(hits)];
}

function findAllowed(text) {
  const hits = [];
  for (const name of ALLOWED) {
    if (new RegExp(`"@type"\\s*:\\s*"${name}"`).test(text) || new RegExp(`\\\\"@type\\\\"\\s*:\\s*\\\\"${name}\\\\"`).test(text)) {
      hits.push(name);
    }
  }
  return hits;
}

function assert(name, text, shouldFail) {
  const hits = findForbidden(text);
  const failed = shouldFail ? hits.length === 0 : hits.length > 0;
  if (failed) {
    throw new Error(`${name}: ${hits.join(", ") || "no hits"}`);
  }
}

function selfTest() {
  assert("article is allowed", '{"@type":"Article","headline":"Garlic"}', false);
  assert("organization is allowed", '{"@type":"Organization","name":"Robin & Radish"}', false);
  assert("plain English is allowed", "We do not publish product reviews or star ratings.", false);
  assert("product type fails", '{"@type":"Product","name":"Seed"}', true);
  assert("offer type fails", '{"@type": "Offer", "price": "0"}', true);
  assert("review type fails", '{"@type":"Review","reviewBody":"Nice"}', true);
  assert("aggregate rating fails", '{"@type":"AggregateRating","ratingValue":"5"}', true);
  assert("schema.org product url fails", '<div itemtype="https://schema.org/Product"></div>', true);
  assert("escaped product fails", '{\\"@type\\":\\"Product\\"}', true);
  assert("review action is not a review type", "https://schema.org/ReviewAction", false);
}

async function collect(dir) {
  const files = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error && error.code === "ENOENT") return files;
    throw error;
  }
  for (const entry of entries) {
    if (entry.name === "cache" || entry.name.endsWith(".map")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collect(full)));
    } else if (/\.(html|rsc|js|json|body)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  try {
    selfTest();
  } catch (error) {
    console.error(`Structured-data checker self-test failed:\n${error.message}`);
    process.exit(1);
  }

  const files = await collect(root);
  if (files.length === 0) {
    console.error(`No build files under ${root}. Run npm run build first.`);
    process.exit(1);
  }

  const problems = [];
  const allowed = new Set();
  for (const file of files) {
    const text = await readFile(file, "utf8");
    for (const name of findAllowed(text)) allowed.add(name);
    const hits = findForbidden(text);
    if (hits.length > 0) {
      problems.push(`${path.relative(process.cwd(), file)}: ${hits.join(", ")}`);
    }
  }

  console.log(`Checked ${files.length} files under ${path.relative(process.cwd(), root) || "."}.`);
  console.log(`Allowed types seen: ${[...allowed].sort().join(", ") || "(none)"}`);

  if (allowed.size === 0) {
    problems.push("No Article, BreadcrumbList, FAQPage, WebSite or Organization JSON-LD was found in the build.");
  }

  if (problems.length > 0) {
    console.error(`\n${problems.length} structured-data problem(s):`);
    for (const problem of problems) console.error(`- ${problem}`);
    process.exit(1);
  }

  console.log("Structured data check passed. No Product, Offer, Review or AggregateRating markup.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
