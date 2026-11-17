import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold text-robin">404</p>
      <h1 className="mt-2 font-heading text-4xl">That page is not in the garden</h1>
      <p className="mt-3 text-muted-foreground">The address does not match a guide, a week, or a tool on this site.</p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 px-5")}>
        Back to the home page
      </Link>
    </div>
  );
}
