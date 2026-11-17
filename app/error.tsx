"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-4xl">This page did not load</h1>
      <p className="mt-3 text-muted-foreground">Something went wrong while rendering the page. You can try again.</p>
      <Button type="button" size="lg" className="mt-6 h-11 px-5" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
