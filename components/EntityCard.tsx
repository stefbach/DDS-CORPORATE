import Link from "next/link";
import { EntityMark } from "@/brand/marks/EntityMark";
import type { Entity } from "@/brand/entities";

export function EntityCard({ entity }: { entity: Entity }) {
  return (
    <Link
      href={`/${entity.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 p-6 transition hover:-translate-y-0.5 hover:border-white/20"
      style={{ ["--entity" as string]: entity.color }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-0 blur-3xl transition group-hover:opacity-60"
        style={{ background: entity.color }}
        aria-hidden
      />
      <div className="relative flex items-start justify-between">
        <EntityMark slug={entity.slug} accent={entity.color} width={56} height={56} />
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em]"
          style={{ background: `${entity.color}22`, color: entity.color }}
        >
          {entity.slug.toUpperCase()}
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-bone">
        {entity.name}
      </h3>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-bone/55">
        {entity.descriptor}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-bone/75">{entity.tagline}</p>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-entity">
        Explorer
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M3 7h8m0 0L7 3m4 4L7 11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}
