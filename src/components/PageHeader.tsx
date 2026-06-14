import type { ReactNode } from "react";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-gold tracking-wider">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-2 italic">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="divider-ornate mt-4" />
    </div>
  );
}