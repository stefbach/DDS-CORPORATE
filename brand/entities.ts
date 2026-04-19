export type EntitySlug = "tibok" | "lexora" | "axon" | "bpo" | "occ";

export interface Entity {
  slug: EntitySlug;
  name: string;
  descriptor: string;
  tagline: string;
  thesis: string;
  color: string;
  colorSoft: string;
  accent?: string;
  pillars: string[];
  kpis: { label: string; value: string }[];
}

export const ENTITIES: Entity[] = [
  {
    slug: "tibok",
    name: "TIBOK",
    descriptor: "Health Operating System — Maurice",
    tagline: "Le système d'exploitation santé de Maurice.",
    thesis:
      "Télémédecine intelligente, IA médicale embarquée et monitoring chronique via WhatsApp : une infrastructure unique qui unifie patients, praticiens et laboratoires.",
    color: "#0066CC",
    colorSoft: "#4D9BE0",
    pillars: [
      "Téléconsultation IA-augmentée",
      "Dossier patient unifié",
      "Monitoring chronique WhatsApp",
      "Prescription & labo intégrés",
    ],
    kpis: [
      { label: "Praticiens connectés", value: "180+" },
      { label: "Délai de consultation", value: "< 8 min" },
      { label: "Couverture île", value: "100 %" },
    ],
  },
  {
    slug: "lexora",
    name: "LEXORA",
    descriptor: "ERP & Comptabilité IA — Océan Indien",
    tagline: "L'ERP intelligent pour entreprises africaines.",
    thesis:
      "Facturation électronique MRA, paie multi-juridictions, réconciliation bancaire et consolidation multi-devises — pilotées par des agents IA qui comprennent le métier comptable.",
    color: "#5B21B6",
    colorSoft: "#8B5CF6",
    pillars: [
      "e-Invoicing MRA natif",
      "Paie multi-pays",
      "Réconciliation IA",
      "Consolidation multi-devises",
    ],
    kpis: [
      { label: "Conformité MRA", value: "100 %" },
      { label: "Devises supportées", value: "14" },
      { label: "Gain temps clôture", value: "−62 %" },
    ],
  },
  {
    slug: "axon",
    name: "AXON AI",
    descriptor: "Agents IA experts métier — Transversal",
    tagline: "Des agents IA qui pensent comme vos experts.",
    thesis:
      "Plateforme multi-agents bâtie sur Claude Code : orchestration, mémoire long-terme, garde-fous métier et pipelines d'automatisation pour les workflows experts les plus exigeants.",
    color: "#D4AF37",
    colorSoft: "#E8C96B",
    pillars: [
      "Orchestration multi-agents",
      "Mémoire & RAG métier",
      "Garde-fous & audit",
      "Intégration outils experts",
    ],
    kpis: [
      { label: "Agents déployés", value: "40+" },
      { label: "Temps cycle expert", value: "−70 %" },
      { label: "Précision validée", value: "98.4 %" },
    ],
  },
  {
    slug: "bpo",
    name: "BPO MEDICAL",
    descriptor: "Digital Data Solutions — 17 ans d'expertise",
    tagline: "L'intelligence humaine + IA au service de la santé.",
    thesis:
      "Externalisation médicale augmentée par IA : codage ICD, transcription clinique, gestion documentaire et facturation santé — opérée par des équipes expertes et des agents spécialisés.",
    color: "#0D9488",
    colorSoft: "#2DD4BF",
    pillars: [
      "Codage médical IA-assisté",
      "Transcription clinique",
      "Gestion documentaire santé",
      "Facturation & recouvrement",
    ],
    kpis: [
      { label: "Années d'expertise", value: "17" },
      { label: "Dossiers traités", value: "3.2 M" },
      { label: "Qualité audit", value: "99.6 %" },
    ],
  },
  {
    slug: "occ",
    name: "OCC",
    descriptor: "Obesity Care Clinic — NHS S2 cross-border",
    tagline: "La santé sans frontières.",
    thesis:
      "Coordination complète de la chirurgie bariatrique UK → France via le dispositif NHS S2 : éligibilité, logistique, opération, suivi post-opératoire et remboursement.",
    color: "#1E3A8A",
    colorSoft: "#3B5BDB",
    accent: "#FF6B6B",
    pillars: [
      "Éligibilité NHS S2",
      "Parcours bariatrique complet",
      "Logistique cross-border",
      "Suivi post-op longitudinal",
    ],
    kpis: [
      { label: "Patients accompagnés", value: "600+" },
      { label: "Taux de réussite S2", value: "94 %" },
      { label: "Partenaires chirurgie", value: "12" },
    ],
  },
];

export const ENTITY_MAP: Record<EntitySlug, Entity> = ENTITIES.reduce(
  (acc, e) => ({ ...acc, [e.slug]: e }),
  {} as Record<EntitySlug, Entity>
);
