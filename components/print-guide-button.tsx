"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PrintGuideButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "print:hidden", className)}
    >
      Print this guide
    </button>
  );
}
