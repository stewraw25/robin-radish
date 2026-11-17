import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const columns = [
  {
    title: "Garden",
    links: [
      { href: "/this-week", label: "This week in the garden" },
      { href: "/planner", label: "Sowing planner" },
      { href: "/guides/what-to-sow-in-winter", label: "What to sow in winter" },
      { href: "/guides/starting-a-veg-patch", label: "Starting a vegetable patch" },
    ],
  },
  {
    title: "Birds",
    links: [
      { href: "/quiz", label: "Bird food quiz" },
      { href: "/guides/bird-food-for-winter", label: "Bird food for winter" },
      { href: "/guides/feeder-hygiene", label: "Cleaning feeders" },
      { href: "/guides/attracting-robins", label: "Attracting robins" },
    ],
  },
  {
    title: "About the site",
    links: [
      { href: "/about", label: "About" },
      { href: "/disclosure", label: "Affiliate disclosure" },
      { href: "/privacy", label: "Privacy" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/50">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        {columns.map((column) => (
          <div key={column.title}>
            <p className="font-heading text-base text-foreground">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-foreground/80 underline-offset-2 hover:text-foreground hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Separator />
        <p className="py-4 text-sm text-muted-foreground">
          Robin & Radish. Grow food and feed garden birds in the UK. Some links to seed and bird-food shops are affiliate links.{" "}
          <Link href="/disclosure" className="underline underline-offset-2 hover:text-foreground">
            Affiliate disclosure
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
