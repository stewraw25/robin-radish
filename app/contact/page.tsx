import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";
import { getContactEmail } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description: "How to contact Robin & Radish. The inbox is shown here once the owner has set one.",
  path: "/contact",
});

export default function ContactPage() {
  const email = getContactEmail();
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <h1 className="font-heading text-4xl">Contact</h1>
      <div className="mt-6 space-y-4 leading-relaxed">
        {email ? (
          <p>
            Email{" "}
            <a className="font-medium underline decoration-soil/60 underline-offset-2" href={`mailto:${email}`}>
              {email}
            </a>
            . There is no contact form on this site.
          </p>
        ) : (
          <p>
            A contact email has not been published yet. Until one is added, this page cannot take messages.
          </p>
        )}
        <p>Robin & Radish is a garden guide. It is not a shop, and it does not take orders.</p>
      </div>
    </div>
  );
}
