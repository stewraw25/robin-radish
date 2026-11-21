import { birds } from "@/lib/birds";
import { crops, MONTHS } from "@/lib/crops";
import { getGuides } from "@/lib/guides";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

/**
 * /llms.txt — a plain Markdown map of the site for AI assistants (llmstxt.org format).
 * Built from the same content files as the sitemap, so it stays in step with the site.
 */
export const dynamic = "force-static";

function oneLine(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function GET() {
  const guides = getGuides();
  const lines: string[] = [];

  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(
    "> A UK garden guide to growing vegetables and herbs at home and feeding garden birds. " +
      "Sowing dates are general ranges for the north and south of the UK, with a separate Ireland page. " +
      "Bird feeding notes describe ordinary foods and how to offer them. Some links go to seed and bird-food shops and are labelled as affiliate links. " +
      "The site does not publish scores, star ratings or prices.",
  );
  lines.push("");

  lines.push("## Start here");
  lines.push(`- [Start here](${absoluteUrl("/start-here")}): a short path through the sowing planner, bird food quiz, this month, and the first guides`);
  lines.push(`- [This week](${absoluteUrl("/this-week")}): the weekly note on what to sow, harvest, and put in the feeder`);
  lines.push(`- [What to sow by month](${absoluteUrl("/what-to-sow")}): month-by-month sowing and planting lists for the UK`);
  lines.push(`- [2027 sowing calendar](${absoluteUrl("/sowing-calendar-2027")}): the year at a glance, with printable A3 PDFs`);
  lines.push(`- [Sowing planner](${absoluteUrl("/planner")}): pick crops and region to get sowing windows`);
  lines.push(`- [Bird food quiz](${absoluteUrl("/quiz")}): which food suits which garden birds`);
  lines.push(`- [Ireland sowing dates](${absoluteUrl("/ie/sowing")}): sowing ranges for Ireland`);
  lines.push("");

  lines.push("## What to sow each month");
  for (const month of MONTHS) {
    lines.push(`- [What to sow in ${month.label}](${absoluteUrl(`/what-to-sow/${month.slug}`)})`);
  }
  lines.push("");

  lines.push("## Guides");
  for (const guide of guides) {
    lines.push(`- [${oneLine(guide.title)}](${absoluteUrl(`/guides/${guide.slug}`)}): ${oneLine(guide.description)}`);
  }
  lines.push("");

  lines.push("## Crops");
  for (const crop of crops) {
    lines.push(`- [How to grow ${crop.name.toLowerCase()}](${absoluteUrl(`/grow/${crop.slug}`)})`);
  }
  lines.push("");

  lines.push("## Garden birds");
  for (const bird of birds) {
    lines.push(`- [${bird.name}: what it eats and how to feed it](${absoluteUrl(`/birds/${bird.slug}`)})`);
  }
  lines.push("");

  lines.push("## Optional");
  lines.push(`- [About](${absoluteUrl("/about")})`);
  lines.push(`- [Affiliate disclosure](${absoluteUrl("/disclosure")})`);
  lines.push(`- [Contact](${absoluteUrl("/contact")})`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
