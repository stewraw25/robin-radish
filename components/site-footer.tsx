import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const columns = [
  {
    title: "Garden",
    links: [
      { href: "/start-here", label: "Start here" },
      { href: "/sowing-calendar-2027", label: "Sowing calendar 2027" },
      { href: "/this-week", label: "This week in the garden" },
      { href: "/what-to-sow", label: "What to sow by month" },
      { href: "/grow", label: "Vegetables and herbs" },
      { href: "/planner", label: "Sowing planner" },
    ],
  },
  {
    title: "Birds",
    links: [
      { href: "/birds", label: "Garden birds" },
      { href: "/quiz", label: "Bird food quiz" },
      { href: "/guides/feeding-birds-spring-summer", label: "Feeding birds in spring and summer" },
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
