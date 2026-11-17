"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadishMark, RobinMark } from "@/components/marks";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/this-week", label: "This week" },
  { href: "/planner", label: "Sowing planner" },
  { href: "/quiz", label: "Bird food quiz" },
  { href: "/guides", label: "Guides" },
];

function active(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 rounded-md text-foreground">
          <span className="flex items-end">
            <RobinMark className="h-9 w-11" />
            <RadishMark className="-ml-1 h-9 w-7" />
          </span>
          <span className="font-heading text-lg leading-none sm:text-xl">Robin & Radish</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active(pathname, link.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground",
                active(pathname, link.href) && "bg-secondary text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </Button>
      </div>
      <nav id="site-menu" aria-label="Mobile" className={open ? "border-t border-border md:hidden" : "hidden"} hidden={!open}>
        <ul className="mx-auto flex w-full max-w-5xl flex-col px-4 py-2 sm:px-6">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active(pathname, link.href) ? "page" : undefined}
                className="block rounded-md px-2 py-3 text-base font-medium hover:bg-secondary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
