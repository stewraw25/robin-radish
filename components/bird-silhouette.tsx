import type { BirdSlug } from "@/lib/birds";

type Props = { slug: BirdSlug; className?: string };

/**
 * Flat silhouettes. They show posture and proportions, not colour.
 * The page text carries the field marks.
 */
export function BirdSilhouette({ slug, className }: Props) {
  return (
    <svg viewBox="0 0 160 100" className={className} aria-hidden="true">
      <g fill="currentColor">{shape(slug)}</g>
    </svg>
  );
}

function shape(slug: BirdSlug) {
  switch (slug) {
    case "robin":
      return (
        <>
          <polygon points="58,58 30,46 36,68 56,66" />
          <ellipse cx="78" cy="60" rx="24" ry="18" />
          <circle cx="98" cy="46" r="13" />
          <polygon points="108,44 128,48 108,54" />
          <rect x="70" y="74" width="4" height="14" rx="1" />
          <rect x="88" y="74" width="4" height="14" rx="1" />
        </>
      );
    case "blue-tit":
      return (
        <>
          <polygon points="78,56 58,52 62,64" />
          <ellipse cx="92" cy="60" rx="18" ry="14" />
          <circle cx="108" cy="50" r="11" />
          <polygon points="116,48 130,51 116,55" />
          <rect x="86" y="72" width="3" height="12" rx="1" />
          <rect x="100" y="72" width="3" height="12" rx="1" />
        </>
      );
    case "great-tit":
      return (
        <>
          <polygon points="70,54 38,46 44,66" />
          <ellipse cx="90" cy="60" rx="24" ry="16" />
          <circle cx="112" cy="48" r="12" />
          <polygon points="122,46 140,50 122,55" />
          <rect x="84" y="74" width="4" height="12" rx="1" />
          <rect x="100" y="74" width="4" height="12" rx="1" />
        </>
      );
    case "coal-tit":
      return (
        <>
          <polygon points="82,56 64,54 66,64" />
          <ellipse cx="96" cy="60" rx="16" ry="13" />
          <circle cx="110" cy="50" r="10" />
          <polygon points="118,48 130,51 118,55" />
          <rect x="90" y="71" width="3" height="12" rx="1" />
          <rect x="102" y="71" width="3" height="12" rx="1" />
        </>
      );
    case "long-tailed-tit":
      return (
        <>
          <polygon points="92,56 18,62 22,70 92,62" />
          <ellipse cx="104" cy="56" rx="14" ry="11" />
          <circle cx="116" cy="48" r="8" />
          <polygon points="122,46 136,48 122,52" />
        </>
      );
    case "blackbird":
      return (
        <>
          <polygon points="62,54 24,46 30,68" />
          <ellipse cx="84" cy="60" rx="28" ry="16" />
          <circle cx="110" cy="48" r="12" />
          <polygon points="120,46 144,50 120,56" />
          <rect x="76" y="74" width="4" height="14" rx="1" />
          <rect x="96" y="74" width="4" height="14" rx="1" />
        </>
      );
    case "house-sparrow":
      return (
        <>
          <polygon points="68,56 46,52 50,66" />
          <ellipse cx="86" cy="60" rx="22" ry="16" />
          <circle cx="106" cy="48" r="12" />
          <polygon points="114,44 132,50 114,56" />
          <rect x="80" y="74" width="4" height="12" rx="1" />
          <rect x="96" y="74" width="4" height="12" rx="1" />
        </>
      );
    case "goldfinch":
      return (
        <>
          <polygon points="78,52 50,44 58,56" />
          <polygon points="78,60 50,68 58,58" />
          <ellipse cx="94" cy="58" rx="18" ry="13" />
          <circle cx="110" cy="48" r="10" />
          <polygon points="118,46 142,48 118,52" />
        </>
      );
    case "greenfinch":
      return (
        <>
          <polygon points="66,54 40,48 46,66" />
          <ellipse cx="88" cy="60" rx="26" ry="17" />
          <circle cx="112" cy="48" r="12" />
          <polygon points="120,44 142,52 120,58" />
          <rect x="82" y="74" width="4" height="12" rx="1" />
          <rect x="100" y="74" width="4" height="12" rx="1" />
        </>
      );
    case "chaffinch":
      return (
        <>
          <polygon points="70,52 34,44 40,66" />
          <ellipse cx="90" cy="58" rx="22" ry="15" />
          <circle cx="110" cy="46" r="11" />
          <polygon points="118,44 136,48 118,54" />
          <rect x="84" y="71" width="3" height="14" rx="1" />
          <rect x="100" y="71" width="3" height="14" rx="1" />
        </>
      );
    case "starling":
      return (
        <>
          <polygon points="64,54 46,50 48,64" />
          <ellipse cx="86" cy="58" rx="26" ry="18" />
          <circle cx="110" cy="48" r="11" />
          <polygon points="118,46 142,40 122,54" />
          <rect x="78" y="74" width="4" height="12" rx="1" />
          <rect x="98" y="74" width="4" height="12" rx="1" />
        </>
      );
    case "wren":
      return (
        <>
          <polygon points="86,58 74,28 82,26 94,56" />
          <ellipse cx="100" cy="64" rx="16" ry="12" />
          <circle cx="114" cy="56" r="9" />
          <polygon points="121,54 136,56 121,60" />
          <rect x="96" y="74" width="3" height="10" rx="1" />
        </>
      );
    case "dunnock":
      return (
        <>
          <polygon points="74,54 40,48 46,64" />
          <ellipse cx="92" cy="58" rx="24" ry="12" />
          <circle cx="114" cy="52" r="9" />
          <polygon points="121,50 140,52 121,56" />
          <rect x="86" y="68" width="3" height="14" rx="1" />
          <rect x="102" y="68" width="3" height="14" rx="1" />
        </>
      );
    case "wood-pigeon":
      return (
        <>
          <polygon points="52,54 22,46 28,68" />
          <ellipse cx="82" cy="60" rx="36" ry="20" />
          <circle cx="116" cy="44" r="10" />
          <polygon points="124,42 138,45 124,48" />
          <rect x="70" y="76" width="5" height="12" rx="1" />
          <rect x="96" y="76" width="5" height="12" rx="1" />
        </>
      );
    case "great-spotted-woodpecker":
      return (
        <>
          <rect x="118" y="10" width="16" height="80" rx="3" />
          <polygon points="96,68 102,90 112,88 104,66" />
          <ellipse cx="98" cy="50" rx="16" ry="22" />
          <circle cx="104" cy="30" r="11" />
          <polygon points="112,28 128,24 114,36" />
          <polygon points="108,58 122,62 108,66" />
        </>
      );
    case "song-thrush":
      return (
        <>
          <polygon points="62,56 34,44 40,66 60,64" />
          <ellipse cx="82" cy="58" rx="22" ry="16" />
          <circle cx="102" cy="46" r="11" />
          <polygon points="110,44 128,46 110,52" />
          <rect x="74" y="72" width="3" height="14" rx="1" />
          <rect x="90" y="72" width="3" height="14" rx="1" />
        </>
      );
    case "nuthatch":
      return (
        <>
          <rect x="18" y="8" width="14" height="84" rx="3" />
          <polygon points="40,58 48,78 58,76 48,56" />
          <ellipse cx="62" cy="48" rx="18" ry="12" />
          <circle cx="80" cy="40" r="10" />
          <polygon points="88,38 108,34 90,46" />
        </>
      );
    case "bullfinch":
      return (
        <>
          <polygon points="70,58 48,50 54,66" />
          <ellipse cx="88" cy="60" rx="22" ry="16" />
          <circle cx="108" cy="50" r="12" />
          <polygon points="118,48 132,52 118,56" />
          <rect x="80" y="74" width="3" height="12" rx="1" />
          <rect x="96" y="74" width="3" height="12" rx="1" />
        </>
      );
    case "siskin":
      return (
        <>
          <polygon points="78,54 58,46 62,60 74,58" />
          <ellipse cx="90" cy="58" rx="16" ry="11" />
          <circle cx="104" cy="50" r="8" />
          <polygon points="110,48 124,50 110,54" />
          <rect x="84" y="68" width="2" height="10" rx="1" />
          <rect x="96" y="68" width="2" height="10" rx="1" />
        </>
      );
    case "redwing":
      return (
        <>
          <polygon points="66,56 40,46 46,66 64,62" />
          <ellipse cx="84" cy="58" rx="20" ry="14" />
          <circle cx="102" cy="46" r="10" />
          <polygon points="110,44 126,46 110,52" />
          <rect x="76" y="70" width="3" height="14" rx="1" />
          <rect x="90" y="70" width="3" height="14" rx="1" />
        </>
      );
    case "fieldfare":
      return (
        <>
          <polygon points="58,54 22,42 30,68 56,64" />
          <ellipse cx="80" cy="58" rx="28" ry="17" />
          <circle cx="106" cy="44" r="12" />
          <polygon points="116,42 138,46 116,52" />
          <rect x="72" y="72" width="4" height="14" rx="1" />
          <rect x="92" y="72" width="4" height="14" rx="1" />
        </>
      );
    case "brambling":
      return (
        <>
          <polygon points="72,52 36,44 42,66" />
          <ellipse cx="90" cy="58" rx="22" ry="15" />
          <circle cx="110" cy="46" r="11" />
          <polygon points="118,44 134,48 118,54" />
          <rect x="84" y="71" width="3" height="14" rx="1" />
          <rect x="100" y="71" width="3" height="14" rx="1" />
        </>
      );
    case "blackcap":
      return (
        <>
          <polygon points="84,56 68,50 72,62" />
          <ellipse cx="96" cy="58" rx="16" ry="12" />
          <circle cx="110" cy="50" r="9" />
          <polygon points="117,48 132,50 117,54" />
          <rect x="90" y="68" width="2" height="12" rx="1" />
          <rect x="102" y="68" width="2" height="12" rx="1" />
        </>
      );
    case "collared-dove":
      return (
        <>
          <polygon points="70,54 28,40 36,66" />
          <ellipse cx="88" cy="58" rx="26" ry="14" />
          <circle cx="112" cy="46" r="9" />
          <polygon points="118,44 134,46 118,50" />
          <polygon points="64,62 18,70 22,78 66,68" />
          <rect x="80" y="70" width="3" height="14" rx="1" />
          <rect x="98" y="70" width="3" height="14" rx="1" />
        </>
      );
    default: {
      const exhaustive: never = slug;
      return exhaustive;
    }
  }
}
