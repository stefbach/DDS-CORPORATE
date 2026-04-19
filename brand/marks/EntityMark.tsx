import type { SVGProps } from "react";
import type { EntitySlug } from "../entities";

/**
 * Entity marks inherit the DDS neural DNA: a core node plus an entity-specific
 * glyph that expresses the business. Each glyph sits inside the same 64×64
 * grid as the master mark for systemic cohesion.
 */

type Props = {
  slug: EntitySlug;
  accent: string;
  ink?: string;
  core?: string;
  secondary?: string;
} & SVGProps<SVGSVGElement>;

export function EntityMark({
  slug,
  accent,
  ink = "#FAFAF7",
  core = "#0A0E1A",
  secondary,
  ...props
}: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${slug} mark`}
      {...props}
    >
      {slug === "tibok" && <TibokGlyph accent={accent} ink={ink} core={core} />}
      {slug === "lexora" && <LexoraGlyph accent={accent} ink={ink} core={core} />}
      {slug === "axon" && <AxonGlyph accent={accent} ink={ink} core={core} />}
      {slug === "bpo" && <BpoGlyph accent={accent} ink={ink} core={core} />}
      {slug === "occ" && (
        <OccGlyph accent={accent} ink={ink} core={core} secondary={secondary ?? "#FF6B6B"} />
      )}
    </svg>
  );
}

type GlyphProps = { accent: string; ink: string; core: string; secondary?: string };

// TIBOK — abstract stethoscope pulse : arc + heartbeat line through core
function TibokGlyph({ accent, ink, core }: GlyphProps) {
  return (
    <g>
      <circle cx="32" cy="32" r="24" fill="none" stroke={ink} strokeWidth="1.4" opacity="0.25" />
      <path
        d="M14 32 L22 32 L26 22 L32 42 L38 26 L42 32 L50 32"
        fill="none"
        stroke={accent}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="5" fill={core} stroke={ink} strokeWidth="1.4" />
      <circle cx="32" cy="32" r="1.8" fill={accent} />
    </g>
  );
}

// LEXORA — ascending bars forming a rising gradient into the neural core
function LexoraGlyph({ accent, ink, core }: GlyphProps) {
  const bars = [
    { x: 14, h: 10 },
    { x: 22, h: 18 },
    { x: 30, h: 26 },
    { x: 38, h: 34 },
    { x: 46, h: 42 },
  ];
  return (
    <g>
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={54 - b.h}
          width="4"
          height={b.h}
          rx="1"
          fill={i === bars.length - 1 ? accent : ink}
          opacity={i === bars.length - 1 ? 1 : 0.35 + i * 0.12}
        />
      ))}
      <circle cx="48" cy={54 - 42} r="3.6" fill={core} stroke={accent} strokeWidth="1.4" />
    </g>
  );
}

// AXON — dense neural network, the archetype of multi-agent orchestration
function AxonGlyph({ accent, ink, core }: GlyphProps) {
  const nodes = [
    { x: 32, y: 32, r: 6, primary: true },
    { x: 14, y: 20, r: 2.4 },
    { x: 14, y: 44, r: 2.4 },
    { x: 50, y: 20, r: 2.4 },
    { x: 50, y: 44, r: 2.4 },
    { x: 32, y: 10, r: 2.4 },
    { x: 32, y: 54, r: 2.4 },
  ];
  return (
    <g>
      {nodes.slice(1).map((n, i) => (
        <line
          key={`l${i}`}
          x1="32"
          y1="32"
          x2={n.x}
          y2={n.y}
          stroke={ink}
          strokeWidth="1.2"
          opacity="0.55"
        />
      ))}
      <line x1="14" y1="20" x2="50" y2="44" stroke={accent} strokeWidth="1" opacity="0.45" />
      <line x1="14" y1="44" x2="50" y2="20" stroke={accent} strokeWidth="1" opacity="0.45" />
      {nodes.map((n, i) =>
        n.primary ? (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={core} stroke={accent} strokeWidth="1.4" />
            <circle cx={n.x} cy={n.y} r="2" fill={accent} />
          </g>
        ) : (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={ink} />
        )
      )}
    </g>
  );
}

// BPO — double helix: human expertise twinned with IA
function BpoGlyph({ accent, ink, core }: GlyphProps) {
  return (
    <g>
      <path
        d="M20 10 C 48 22, 16 42, 44 54"
        fill="none"
        stroke={ink}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M44 10 C 16 22, 48 42, 20 54"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[16, 24, 32, 40, 48].map((y) => (
        <line
          key={y}
          x1={y < 32 ? 24 : 24}
          y1={y}
          x2={y < 32 ? 40 : 40}
          y2={y}
          stroke={ink}
          strokeWidth="0.9"
          opacity="0.35"
        />
      ))}
      <circle cx="32" cy="32" r="3.4" fill={core} stroke={accent} strokeWidth="1.2" />
    </g>
  );
}

// OCC — arch connecting two shores (UK → France), coral accent on the keystone
function OccGlyph({ accent, ink, core, secondary }: GlyphProps) {
  return (
    <g>
      <path
        d="M10 46 Q 32 10 54 46"
        fill="none"
        stroke={accent}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <line x1="10" y1="50" x2="24" y2="50" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="50" x2="54" y2="50" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="20" r="3.4" fill={secondary} />
      <circle cx="32" cy="46" r="4" fill={core} stroke={ink} strokeWidth="1.4" />
      <circle cx="32" cy="46" r="1.6" fill={accent} />
    </g>
  );
}
