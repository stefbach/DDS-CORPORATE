import Link from "next/link";
import { NeuralMark } from "@/brand/marks/NeuralMark";
import { Section } from "@/components/Section";
import { EntityCard } from "@/components/EntityCard";
import { ENTITIES } from "@/brand/entities";

export default function Home() {
  return (
    <>
      <Hero />
      <Thesis />
      <Entities />
      <Approach />
      <Footprint />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="bg-radial-signal absolute inset-0" aria-hidden />
      <div className="relative mx-auto flex max-w-shell flex-col items-start px-6 pb-32 pt-24 md:pb-48 md:pt-32">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-signal">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" aria-hidden />
          Holding — Maurice · Océan Indien · UE
        </div>
        <h1 className="font-display text-display-xl font-extrabold tracking-tight text-bone">
          L'infrastructure IA{" "}
          <span className="text-signal">des métiers experts.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-bone/70 md:text-2xl">
          DDS Group réunit cinq entités opérationnelles autour d'une même thèse :
          mettre l'intelligence artificielle au service des experts — santé,
          finance, opérations — pour livrer ce que la théorie seule ne peut pas.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="#entities"
            className="rounded-full bg-signal px-5 py-3 text-sm font-semibold text-ink transition hover:bg-signal-soft"
          >
            Découvrir les 5 entités
          </Link>
          <Link
            href="#thesis"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-bone transition hover:border-white/30"
          >
            Lire la thèse
          </Link>
        </div>
        <div className="pointer-events-none absolute right-6 top-24 hidden md:block">
          <NeuralMark width={340} height={340} accent="#00D4FF" />
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <Section
      id="thesis"
      eyebrow="Notre thèse"
      title="L'IA ne remplace pas l'expert. Elle lui rend ses heures, sa précision, son échelle."
      intro="Dans les métiers régulés — médecine, comptabilité, conformité — la valeur se crée à l'interface entre le jugement humain et la machine. DDS Group industrialise cette interface, entité par entité, domaine par domaine."
    >
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            k: "01",
            t: "Métiers experts d'abord",
            d: "Nous partons du workflow réel du professionnel — pas de la démo. Un médecin, un comptable, un coordinateur bariatrique.",
          },
          {
            k: "02",
            t: "IA industrialisée",
            d: "Agents multi-modèles, garde-fous, mémoire long-terme, auditabilité. L'IA passe de prototype à production critique.",
          },
          {
            k: "03",
            t: "Ancrage Sud-Sud",
            d: "Maurice comme hub. L'Océan Indien et l'Afrique comme terrain. L'Europe comme débouché réglementaire.",
          },
        ].map((b) => (
          <div
            key={b.k}
            className="rounded-2xl border border-white/10 bg-ink-800/60 p-8"
          >
            <div className="font-mono text-xs text-signal/80">{b.k}</div>
            <h3 className="mt-3 font-display text-xl font-bold text-bone">{b.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-bone/65">{b.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Entities() {
  return (
    <Section
      id="entities"
      eyebrow="Les cinq entités"
      title="Cinq verticales. Une infrastructure. Une thèse."
      intro="Chaque entité est autonome, rentable, ancrée dans son métier. Ensemble elles partagent une plateforme IA, une exigence de qualité, et un même pari : l'expert reste au centre."
    >
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ENTITIES.map((e) => (
          <EntityCard key={e.slug} entity={e} />
        ))}
      </div>
    </Section>
  );
}

function Approach() {
  const steps = [
    {
      n: "01",
      t: "Cartographier le geste expert",
      d: "Nous passons du temps dans la salle d'op, au cabinet, au bureau de clôture. La friction y est visible.",
    },
    {
      n: "02",
      t: "Outiller, ne pas remplacer",
      d: "Nous livrons des agents qui enlèvent la charge administrative, documentaire, cognitive — jamais la décision.",
    },
    {
      n: "03",
      t: "Mesurer en production",
      d: "Précision, temps cycle, conformité, satisfaction. Une entité se juge sur des indicateurs métier, pas sur des démos.",
    },
    {
      n: "04",
      t: "Industrialiser par la plateforme",
      d: "Les briques — identité, agents, monitoring, audit — sont mutualisées via AXON AI au bénéfice des quatre autres.",
    },
  ];
  return (
    <Section
      id="approach"
      eyebrow="Notre approche"
      title="De l'atelier au produit en six mois, pas en six ans."
      intro="Nous refusons l'opposition classique conseil / éditeur. Chaque entité DDS est à la fois opérateur — dans le soin, dans la comptabilité, dans la coordination — et éditeur du logiciel qui l'outille."
    >
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {steps.map((s) => (
          <div
            key={s.n}
            className="flex gap-5 rounded-2xl border border-white/10 bg-ink-800/60 p-7"
          >
            <div className="font-mono text-xs text-signal/80">{s.n}</div>
            <div>
              <h3 className="font-display text-lg font-bold text-bone">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone/65">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Footprint() {
  const stats = [
    { v: "5", l: "Entités opérationnelles" },
    { v: "17", l: "Années d'expertise BPO santé" },
    { v: "3", l: "Continents opérés" },
    { v: "40+", l: "Agents IA en production" },
  ];
  return (
    <section className="border-y border-white/5 bg-ink-800/40 py-16">
      <div className="mx-auto grid max-w-shell grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="font-display text-display-md font-extrabold text-bone">
              {s.v}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-bone/55">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Parler à DDS"
      title="Une conversation d'expert à expert."
      intro="Vous dirigez une clinique, un cabinet, une opération. Vous cherchez à comprendre ce que l'IA industrialisée change concrètement dans votre métier. Parlons-nous."
    >
      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
        <a
          href="mailto:hello@digital-data-solutions.net"
          className="rounded-full bg-signal px-5 py-3 text-sm font-semibold text-ink transition hover:bg-signal-soft"
        >
          hello@digital-data-solutions.net
        </a>
        <span className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-bone/80">
          Siège : Ébène, Maurice · Présence UE & UK
        </span>
      </div>
    </Section>
  );
}
