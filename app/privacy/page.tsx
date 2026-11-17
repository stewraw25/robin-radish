import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";
import { getContactEmail, SITE_NAME } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy",
  description: "What Robin & Radish collects. This version has no accounts, no newsletter and no analytics script.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const email = getContactEmail();
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }]} />
      <h1 className="font-heading text-4xl">Privacy</h1>
      <p className="mt-3 text-sm text-muted-foreground">17 November 2026</p>
      <div className="mt-6 space-y-4 leading-relaxed">
        <p>
          {SITE_NAME} is a small UK garden guide. This page describes this version of the site. It is not a shop account and it does not ask you to sign in.
        </p>
        <h2 className="pt-2 font-heading text-2xl">What this site stores</h2>
        <p>
          There is no account, no newsletter and no analytics script in this version. The sowing planner and the bird food quiz run in your browser. Your answers are not sent to a server.
        </p>
        <p>
          The host may keep ordinary server logs, such as the address of a page request. That is the host&apos;s processing, not a mailing list.
        </p>
        <h2 className="pt-2 font-heading text-2xl">Shop links</h2>
        <p>
          If you follow a link to Thompson & Morgan, Crocus, Haith&apos;s or CJ Wildlife, you leave this site. The shop, and the affiliate network it uses (Awin or Webgains), may set their own cookies and see that the visit came from here when an affiliate ID is switched on. Their privacy notices apply from that point.
        </p>
        <h2 className="pt-2 font-heading text-2xl">Contact</h2>
        <p>
          {email ? (
            <>
              The contact address is <a className="underline underline-offset-2" href={`mailto:${email}`}>{email}</a>. A message you send there is read so it can be answered. It is not added to a marketing list.
            </>
          ) : (
            "Contact email coming soon."
          )}
        </p>
        <p>No postal address is published on this site.</p>
      </div>
    </div>
  );
}
