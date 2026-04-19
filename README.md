# DDS Group — Corporate Site

Site corporate de la holding **DDS Group** (`digital-data-solutions.net`).

Holding basée à Maurice, fédérant cinq entités opérationnelles autour d'une
thèse unique : **mettre l'intelligence artificielle au service des métiers experts**.

## Entités

| Slug | Entité | Domaine |
|---|---|---|
| `tibok` | TIBOK | Health OS — télémédecine intelligente |
| `lexora` | LEXORA | ERP & Comptabilité IA |
| `axon` | AXON AI | Agents IA experts métier |
| `bpo` | BPO Medical | Externalisation médicale augmentée |
| `occ` | OCC | Coordination bariatrique NHS S2 |

## Stack

- **Next.js 14** (App Router)
- **TypeScript** strict
- **Tailwind CSS** avec design tokens centralisés
- **Inter** + **Manrope** (Google Fonts via `next/font`)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Arborescence

```
app/
  layout.tsx          · Layout racine (Nav + Footer + fonts)
  page.tsx            · Landing holding
  [entity]/page.tsx   · Route dynamique : /tibok, /lexora, /axon, /bpo, /occ
  brand/page.tsx      · Page identité visuelle (design system public)
  globals.css         · CSS tokens + utilitaires
brand/
  entities.ts         · Source unique de vérité pour les 5 entités
  marks/
    NeuralMark.tsx    · Logo master DDS Group
    EntityMark.tsx    · 5 glyphes filiales
    Lockup.tsx        · Combinaisons logo + wordmark
components/
  Nav.tsx · Footer.tsx · EntityCard.tsx · Section.tsx
```

## Système visuel

- **Primaire** : `#0A0E1A` (ink) + `#FAFAF7` (bone)
- **Accent signature IA** : `#00D4FF` (cyan)
- **Couleurs filiales** :
  TIBOK `#0066CC` · LEXORA `#5B21B6` · AXON `#D4AF37` · BPO `#0D9488` ·
  OCC `#1E3A8A` + `#FF6B6B`
- **Grille logo** : 64×64. Toutes les marques partagent cette grille.
- **Master** : nœud neural — 1 cœur + 5 satellites (= les 5 entités).

La page `/brand` expose le système complet : logos, palette, typographie.
