import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ENTITIES, ENTITY_MAP, type EntitySlug } from "@/brand/entities";
import { EntityMark } from "@/brand/marks/EntityMark";
import { EntityLockup } from "@/brand/marks/Lockup";
import { Section } from "@/components/Section";

export function generateStaticParams() {
  return ENTITIES.map((e) => ({ entity: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { entity: string };
}): Metadata {
  const e = ENTITY_MAP[params.entity as EntitySlug];
  if (!e) return {};
  return {
    title: `${e.name} — ${e.descriptor}`,
    description: e.thesis,
  };
}

export default function EntityPage({ params }: { params: { entity: string } }) {
  const e = ENTITY_MAP[params.entity as EntitySlug];
  if (!e) notFound();

  const cssVars = {
    ["--entity" as string]: e.color,
    ["--entity-soft" as string]: e.colorSoft,
  };

  return (
    <div style={cssVars}>
      <Hero entity={e} />
      <Pillars entity={e} />
      <Kpis entity={e} />
      <Manifesto entity={e} />
      <Cta entity={e} />
      <CrossSell currentSlug={e.slug} />
    </div>
  );
}

function Hero({ entity }: { entity: (typeof ENTITIES)[number] }) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(70% 55% at 50% 0%, ${entity.color}33, transparent 70%)`,
        }}
        aria-hidden
      />
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-shell px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-bone/55 hover:text-bone"
        >
          ← DDS Group
        </Link>
        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <EntityLockup
              slug={entity.slug}
              name={entity.name}
              accent={entity.color}
              descriptor={entity.descriptor}
              size={56}
            />
            <h1 className="mt-10 font-display text-display-lg font-extrabold tracking-tight text-bone">
              {entity.tagline}
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-bone/70">
              {entity.thesis}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full px-5 py-3 text-sm font-semibold text-ink transition"
                style={{ background: entity.color }}
              >
                Discuter de {entity.name}
              </a>
              <Link
                href="/"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-bone transition hover:border-white/30"
              >
                Voir les autres entités
              </Link>
            </div>
          </div>
          <div className="shrink-0 self-start md:self-center">
            <EntityMark
              slug={entity.slug}
              accent={entity.color}
              secondary={entity.accent}
              width={240}
              height={240}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars({ entity }: { entity: (typeof ENTITIES)[number] }) {
  return (
    <Section eyebrow="Piliers produit" title={`Ce que ${entity.name} opère.`}>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {entity.pillars.map((p, i) => (
          <div
            key={p}
            className="rounded-2xl border border-white/10 bg-ink-800/60 p-6"
          >
            <div
              className="font-mono text-xs"
              style={{ color: entity.color }}
            >{`0${i + 1}`}</div>
            <div className="mt-4 font-display text-lg font-semibold leading-snug text-bone">
              {p}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Kpis({ entity }: { entity: (typeof ENTITIES)[number] }) {
  return (
    <section
      className="border-y border-white/5 py-16"
      style={{ background: `${entity.color}0D` }}
    >
      <div className="mx-auto grid max-w-shell grid-cols-1 gap-8 px-6 md:grid-cols-3">
        {entity.kpis.map((k) => (
          <div key={k.label}>
            <div
              className="font-display text-display-md font-extrabold"
              style={{ color: entity.color }}
            >
              {k.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-bone/60">
              {k.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Manifesto({ entity }: { entity: (typeof ENTITIES)[number] }) {
  const copy: Record<EntitySlug, string> = {
    tibok:
      "À Maurice, l'accès aux soins n'a plus à dépendre de la distance ni de l'heure. TIBOK connecte le patient au bon praticien en moins de huit minutes, route la prescription au laboratoire, et maintient le suivi chronique là où le patient parle déjà — WhatsApp.",
    lexora:
      "La conformité MRA, la paie multi-juridictions, la réconciliation bancaire : des tâches à haute valeur administrative, longtemps épuisantes. LEXORA transforme ces workflows en conversations avec un agent qui comprend le plan comptable et les spécificités africaines.",
    axon:
      "AXON est la fabrique d'agents du groupe. Orchestration multi-modèles, mémoire métier, garde-fous, tests de régression. Ce que nous déployons pour TIBOK, LEXORA, BPO et OCC, nous le commercialisons aussi pour les cabinets et opérations qui veulent industrialiser l'IA.",
    bpo:
      "Dix-sept ans à traiter du dossier médical nous ont appris une chose : la qualité naît de l'alliance entre l'expert humain et la machine. BPO Medical opère cette alliance à grande échelle pour les payeurs, les cliniques et les réseaux de santé.",
    occ:
      "Le dispositif S2 permet à un patient britannique d'être opéré en France aux frais du NHS. Encore faut-il que quelqu'un orchestre l'éligibilité, l'hôpital, la logistique, le suivi. OCC est ce chef d'orchestre — avec les chirurgiens, les centres et l'accompagnement longitudinal.",
  };
  return (
    <Section eyebrow="Manifeste" title="Pourquoi cette entité existe.">
      <p className="mt-8 max-w-4xl text-xl leading-relaxed text-bone/75">
        {copy[entity.slug]}
      </p>
      <div
        className="mt-10 h-px w-24"
        style={{ background: entity.color }}
        aria-hidden
      />
    </Section>
  );
}

function Cta({ entity }: { entity: (typeof ENTITIES)[number] }) {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-shell px-6">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 p-10 md:p-14"
          style={{
            background: `linear-gradient(135deg, ${entity.color}22, transparent 60%)`,
          }}
        >
          <div
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-30 blur-3xl"
            style={{ background: entity.color }}
            aria-hidden
          />
          <h2 className="relative max-w-3xl font-display text-display-md font-bold text-bone">
            Prêt à parler à l'équipe {entity.name} ?
          </h2>
          <p className="relative mt-5 max-w-2xl text-lg text-bone/70">
            Nous prenons quinze minutes pour comprendre votre contexte, trente
            pour chiffrer un pilote. Tout commence par une conversation.
          </p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:hello@digital-data-solutions.net?subject=${entity.name}%20—%20demande%20de%20contact`}
              className="rounded-full px-5 py-3 text-sm font-semibold text-ink"
              style={{ background: entity.color }}
            >
              Écrire à l'équipe
            </a>
            <Link
              href="/"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-bone hover:border-white/30"
            >
              Revenir au groupe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CrossSell({ currentSlug }: { currentSlug: EntitySlug }) {
  const others = ENTITIES.filter((e) => e.slug !== currentSlug).slice(0, 4);
  return (
    <section className="border-t border-white/5 py-16">
      <div className="mx-auto max-w-shell px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-bone/50">
          Explorer les autres entités
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((e) => (
            <Link
              key={e.slug}
              href={`/${e.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-800/50 p-4 transition hover:border-white/25"
            >
              <EntityMark slug={e.slug} accent={e.color} width={36} height={36} />
              <div className="min-w-0">
                <div className="truncate font-display font-semibold text-bone">
                  {e.name}
                </div>
                <div className="truncate text-xs text-bone/55">{e.descriptor}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
