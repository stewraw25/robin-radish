import { cn } from "@/lib/utils";

export const SPONSORED_REL = "sponsored nofollow noopener";

export function ShopLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "font-medium text-leaf underline decoration-soil/60 underline-offset-2 hover:decoration-robin",
        className,
      )}
      rel={SPONSORED_REL}
      target="_blank"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
