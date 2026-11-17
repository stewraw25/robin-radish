import Link from "next/link";

export function AffiliateNotice() {
  return (
    <p className="rounded-lg border border-border bg-secondary/70 px-3 py-2 text-sm leading-relaxed text-foreground">
      <strong className="font-semibold">Affiliate notice. </strong>
      Some links on this page go to seed or bird-food shops. If an affiliate ID is set, Robin & Radish may earn a commission when you buy, at no extra cost to you. Shop links open in a new tab.{" "}
      <Link href="/disclosure" className="font-medium underline decoration-soil/60 underline-offset-2">
        Full disclosure
      </Link>
      .
    </p>
  );
}
