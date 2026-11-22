import Link from "next/link";

export function AffiliateNotice() {
  return (
    <p className="rounded-lg border border-border bg-secondary/70 px-3 py-2 text-sm leading-relaxed text-foreground print:hidden">
      <strong className="font-semibold">Affiliate notice. </strong>
      As an Amazon Associate we earn from qualifying purchases. Some other links go to seed or bird-food shops. If you buy after following a link, Robin & Radish may earn a commission, at no extra cost to you. Shop links open in a new tab.{" "}
      <Link href="/disclosure" className="font-medium underline decoration-soil/60 underline-offset-2">
        Full disclosure
      </Link>
      .
    </p>
  );
}
