import Link from "next/link";

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-[22px] font-semibold leading-tight">{title}</h2>
      {children}
    </section>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-card border border-black/10 bg-white p-4 shadow-sm ${className}`}>{children}</div>;
}

export function Chip({
  active,
  children,
  onClick,
  ariaLabel
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`min-h-12 rounded-button border px-4 py-2 text-sm font-medium ${
        active ? "border-primary bg-primary text-white" : "border-black/10 bg-white text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-12 items-center justify-center rounded-button bg-primary px-4 py-2 font-semibold text-white">
      {children}
    </Link>
  );
}

export function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-28 items-end gap-2 rounded-card bg-surface p-3">
      {values.map((value, index) => (
        <div key={index} className="flex flex-1 flex-col items-center gap-1">
          <div className="w-full rounded-t bg-primary" style={{ height: `${Math.max(12, (value / max) * 84)}px` }} />
          <span className="text-xs text-ink/60">{index + 1}</span>
        </div>
      ))}
    </div>
  );
}
