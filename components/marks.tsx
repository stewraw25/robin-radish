type MarkProps = { className?: string };

export function RobinMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 80 64" aria-hidden="true">
      <path d="M8 40c8 6 18 8 28 4" fill="none" stroke="#7a5436" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="40" cy="36" rx="18" ry="14" fill="#f4efe4" stroke="#1f4d38" strokeWidth="2" />
      <ellipse cx="48" cy="38" rx="9" ry="8" fill="#9a2e28" />
      <circle cx="34" cy="30" r="10" fill="#f4efe4" stroke="#1f4d38" strokeWidth="2" />
      <circle cx="37" cy="28" r="1.6" fill="#1c2b22" />
      <path d="M42 30l12-2-10 5z" fill="#d7a24a" />
      <path d="M22 34c-8-2-12 4-8 8 6-2 10-4 8-8z" fill="#1f4d38" />
      <path d="M36 46l-2 8M44 46l2 8" stroke="#7a5436" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function RadishMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 64 80" aria-hidden="true">
      <path d="M32 28c-8-14-2-24 2-26 6 6 10 16 6 26" fill="#2f6b4f" />
      <path d="M30 28c2-16 14-20 18-16-6 4-10 12-10 18" fill="#1f4d38" />
      <path d="M28 30c-10-6-20-2-22 4 8 0 16-2 22-4z" fill="#3d8a62" />
      <path d="M32 26c14 10 16 28 8 40-2 4-8 6-12 2-8-8-10-28-2-40 2-2 4-3 6-2z" fill="#9a2e28" />
      <path d="M34 34c4 8 4 18 2 26" fill="none" stroke="#f4efe4" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M30 62c2 8 4 12 2 14" fill="none" stroke="#7a5436" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TrayMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 80 64" aria-hidden="true">
      <rect x="8" y="28" width="64" height="24" rx="4" fill="#f4efe4" stroke="#7a5436" strokeWidth="2" />
      <path d="M28 28v24M52 28v24M8 40h64" stroke="#7a5436" strokeWidth="2" />
      <path d="M18 28c0-10 6-16 6-16M40 28c0-12 4-18 4-18M62 28c0-8 5-14 5-14" fill="none" stroke="#2f6b4f" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="12" r="3" fill="#3d8a62" />
      <circle cx="44" cy="10" r="3" fill="#3d8a62" />
      <circle cx="67" cy="14" r="3" fill="#3d8a62" />
    </svg>
  );
}

export function FeederMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 64 80" aria-hidden="true">
      <path d="M32 6v10" stroke="#7a5436" strokeWidth="2" />
      <path d="M14 22h36l-4 8H18z" fill="#1f4d38" />
      <rect x="22" y="30" width="20" height="28" rx="3" fill="#f4efe4" stroke="#1f4d38" strokeWidth="2" />
      <path d="M26 38h12M26 46h12M26 52h8" stroke="#9a2e28" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 58h28" stroke="#7a5436" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 58v12" stroke="#7a5436" strokeWidth="2" />
    </svg>
  );
}
