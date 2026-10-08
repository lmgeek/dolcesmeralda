import type { ReactNode, AnchorHTMLAttributes } from "react";

const base = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold tracking-wide uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]";
export const btn = {
  primary: `${base} bg-primary text-primary-foreground shadow-soft hover:bg-primary-deep`,
  gold: `${base} bg-gold text-ink hover:brightness-105`,
  outline: `${base} border border-primary/40 text-primary-deep hover:bg-accent`,
  ghostLight: `${base} border border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10`,
};

export function ExtA({ children, ...p }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return <a target="_blank" rel="noopener noreferrer" {...p}>{children}</a>;
}

export function SectionHead({ eyebrow, title, sub, center = true }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? "text-center mx-auto" : ""} max-w-2xl`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-4xl font-medium text-primary-deep sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="italic text-muted-foreground">{children}</span>;
}
