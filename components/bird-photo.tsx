import Image from "next/image";
import { birdPhoto } from "@/lib/bird-photos";
import type { BirdSlug } from "@/lib/birds";
import { publicAsset } from "@/lib/site";
import { cn } from "@/lib/utils";

type Variant = "hero" | "card" | "thumb";

type Props = {
  slug: BirdSlug;
  variant?: Variant;
  className?: string;
  /** When false, render only the credit line (for use beside a linked image). */
  creditOnly?: boolean;
  /** When false, render only the image (for use inside a parent link). */
  imageOnly?: boolean;
  priority?: boolean;
};

function frameClass(variant: Variant) {
  if (variant === "hero") return "aspect-[4/3] w-full sm:w-72 md:w-80";
  if (variant === "thumb") return "aspect-[4/3] w-20 shrink-0";
  return "aspect-[4/3] w-full";
}

export function BirdPhotoCredit({
  slug,
  className,
}: {
  slug: BirdSlug;
  className?: string;
}) {
  const photo = birdPhoto(slug);
  return (
    <p className={cn("text-[0.7rem] leading-snug text-muted-foreground", className)}>
      Photo: {photo.author},{" "}
      <a href={photo.licenseUrl} className="underline decoration-soil/50 underline-offset-2" rel="license">
        {photo.license}
      </a>{" "}
      via{" "}
      <a href={photo.filePageUrl} className="underline decoration-soil/50 underline-offset-2">
        Wikimedia Commons
      </a>
    </p>
  );
}

export function BirdPhoto({
  slug,
  variant = "card",
  className,
  creditOnly,
  imageOnly,
  priority,
}: Props) {
  const photo = birdPhoto(slug);
  if (creditOnly) return <BirdPhotoCredit slug={slug} className={className} />;

  const image = (
    <div className={cn("overflow-hidden rounded-lg bg-secondary", imageOnly ? className : frameClass(variant))}>
      <Image
        src={publicAsset(photo.src)}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        unoptimized
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  );

  if (imageOnly) return image;

  return (
    <figure className={cn("min-w-0", className)}>
      {image}
      <figcaption className="mt-1.5">
        <BirdPhotoCredit slug={slug} className={variant === "hero" ? "text-xs" : undefined} />
      </figcaption>
    </figure>
  );
}
