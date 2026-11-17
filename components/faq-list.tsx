import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/schema";

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="mt-12">
      <h2 className="font-heading text-2xl">Common questions</h2>
      <div className="mt-4 space-y-3">
        {faqs.map((faq) => (
          <details key={faq.q} className="rounded-xl border border-border bg-card px-4 py-3">
            <summary className="cursor-pointer font-medium">{faq.q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(faqs)} />
    </section>
  );
}
