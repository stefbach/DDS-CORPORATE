import type { Metadata } from "next";
import { NeuralMark } from "@/brand/marks/NeuralMark";
import { EntityMark } from "@/brand/marks/EntityMark";
import { HoldingLockup, EntityLockup } from "@/brand/marks/Lockup";
import { ENTITIES } from "@/brand/entities";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Identité visuelle",
  description:
    "Système d'identité visuelle DDS Group : logo master, cinq déclinaisons filiales, palette, typographie et usages.",
};

const palette = [
  { name: "Ink", token: "--ink", hex: "#0A0E1A", note: "Primaire holding — fonds & typographie" },
  { name: "Bone", token: "--bone", hex: "#FAFAF7", note: "Blanc cassé — typographie sur fond ink" },
  { name: "Signal", token: "--signal", hex: "#00D4FF", note: "Accent IA — le fil rouge du groupe" },
  { name: "TIBOK", token: "--brand-tibok", hex: "#0066CC", note: "Bleu médical" },
  { name: "LEXORA", token: "--brand-lexora", hex: "#5B21B6", note: "Violet expert" },
  { name: "AXON", token: "--brand-axon", hex: "#D4AF37", note: "Or graphite" },
  { name: "BPO", token: "--brand-bpo", hex: "#0D9488", note: "Teal médical" },
  { name: "OCC", token: "--brand-occ", hex: "#1E3A8A", note: "Bleu nuit" },
  { name: "OCC accent", token: "--brand-occ-accent", hex: "#FF6B6B", note: "Corail — keystone OCC" },
];

export default function BrandPage() {
  return (
    <>
      <section className="border-b border-white/5 py-20">
        <div className="mx-auto max-w-shell px-6">
          <p className="text-xs uppercase tracking-[0.28em] text-signal">Design system</p>
          <h1 className="mt-4 max-w-3xl font-display text-display-lg font-extrabold tracking-tight text-bone">
            Un système d'identité. Une thèse. Cinq expressions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-bone/70">
            Toutes les entités DDS partagent un ADN graphique : une grille 64×64,
            un nœud central, une famille typographique et un accent cyan signature.
            Chaque entité active sa couleur et son glyphe métier.
          </p>
        </div>
      </section>

      <Section eyebrow="Logo master" title="DDS Group — le nœud neural.">
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-ink-800/60 p-16">
            <NeuralMark width={220} height={220} />
          </div>
          <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-bone p-16">
            <NeuralMark width={220} height={220} ink="#0A0E1A" core="#FAFAF7" accent="#0095B8" />
          </div>
          <div className="md:col-span-2 rounded-3xl border border-white/10 bg-ink-800/60 p-10">
            <HoldingLockup size={64} />
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-bone/60">
              Lockup horizontal par défaut. La typographie Manrope Extra Bold assure
              la présence, le point cyan rythme et signe le fil IA.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Famille filiales" title="Même grille, cinq glyphes métier.">
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ENTITIES.map((e) => (
            <div
              key={e.slug}
              className="rounded-3xl border border-white/10 bg-ink-800/60 p-8"
            >
              <div className="flex items-center justify-between">
                <EntityMark
                  slug={e.slug}
                  accent={e.color}
                  secondary={e.accent}
                  width={80}
                  height={80}
                />
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em]"
                  style={{ background: `${e.color}22`, color: e.color }}
                >
                  {e.slug}
                </span>
              </div>
              <div className="mt-6">
                <EntityLockup
                  slug={e.slug}
                  name={e.name}
                  accent={e.color}
                  descriptor={e.descriptor}
                  size={34}
                />
              </div>
              <p className="mt-5 text-sm text-bone/60">{e.tagline}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Palette" title="Noir profond. Blanc cassé. Un accent qui signe.">
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((c) => (
            <div
              key={c.token}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-800/60 p-4"
            >
              <div
                className="h-16 w-16 shrink-0 rounded-xl border border-white/10"
                style={{ background: c.hex }}
                aria-hidden
              />
              <div className="min-w-0">
                <div className="font-display font-semibold text-bone">{c.name}</div>
                <div className="font-mono text-xs text-bone/55">{c.hex}</div>
                <div className="mt-1 text-xs text-bone/50">{c.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Typographie" title="Manrope pour l'affirmation. Inter pour la lecture.">
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-ink-800/60 p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-bone/55">
              Display — Manrope
            </p>
            <p className="mt-4 font-display text-6xl font-extrabold tracking-tight text-bone">
              Aa Bb Cc
            </p>
            <p className="mt-8 font-display text-2xl text-bone/80">
              L'IA au service des métiers experts.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-ink-800/60 p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-bone/55">
              Texte — Inter
            </p>
            <p className="mt-4 font-sans text-5xl text-bone">Aa Bb Cc</p>
            <p className="mt-8 max-w-md text-base leading-relaxed text-bone/70">
              Inter est utilisé pour tout le contenu courant : paragraphes,
              navigation, composants, UI produit. Son dessin neutre supporte
              aussi bien le français, l'anglais que les jeux étendus.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
