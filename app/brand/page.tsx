import type { Metadata } from "next";
import { LogoLockup } from "@/components/logo-lockup";

export const metadata: Metadata = {
  title: { absolute: "Robin & Radish logo" },
  description: "Unlisted Robin & Radish logo, for checking the mark.",
  robots: { index: false, follow: false },
};

/** Unlisted lockup, for checking the mark. Not linked in the nav. */
export default function BrandPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <h1 className="sr-only">Robin & Radish logo</h1>
      <LogoLockup large />
    </div>
  );
}
