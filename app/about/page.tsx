import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";
import { BYLINE } from "@/lib/site";

export const metadata = pageMeta({
  title: "About",
  description: "What Robin & Radish is: a UK guide to growing food at home and feeding garden birds, published under one byline.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <h1 className="font-heading text-4xl">About</h1>
      <div className="mt-6 space-y-4 leading-relaxed">
        <p>
          Robin & Radish is a UK garden guide with two subjects that usually live on different websites: growing food, and feeding garden birds. The weekly note covers both, because that is how a lot of gardens actually get used.
        </p>
        <p>
          The sowing dates are general ranges for the north and south of the country. The bird notes describe ordinary foods and how to offer them. They are not a forecast, a soil test, or a promise that a particular bird will turn up.
        </p>
        <p>
          Pages are published under the byline {BYLINE}. There is no separate author profile on this site.
        </p>
        <p>
          This is not a shop. Some links go to seed merchants and bird-food shops. Read the affiliate disclosure before you follow them. The site does not publish scores, star ratings or prices.
        </p>
      </div>
    </div>
  );
}
