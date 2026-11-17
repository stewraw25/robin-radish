import { RadishMark, RobinMark } from "@/components/marks";
import { cn } from "@/lib/utils";

export function LogoLockup({ large = false }: { large?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", large ? "gap-4" : "gap-2")}>
      <span className="flex items-end">
        <RobinMark className={large ? "h-28 w-36" : "h-9 w-11"} />
        <RadishMark className={large ? "-ml-3 h-32 w-24" : "-ml-1 h-9 w-7"} />
      </span>
      <span className={cn("font-heading leading-none text-foreground", large ? "text-5xl sm:text-6xl" : "text-lg sm:text-xl")}>
        Robin & Radish
      </span>
    </span>
  );
}
