import type { SVGProps } from "react";

/**
 * Master DDS GROUP symbol — a neural node: one core connected to five
 * satellites. Five satellites = five operating entities, unified by one core.
 * Designed on a 64×64 grid; scales vector-perfect at any size.
 */
export function NeuralMark({
  accent = "#00D4FF",
  ink = "#FAFAF7",
  core = "#0A0E1A",
  ...props
}: { accent?: string; ink?: string; core?: string } & SVGProps<SVGSVGElement>) {
  const cx = 32;
  const cy = 32;
  const r = 22;
  const satellites = Array.from({ length: 5 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });

  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="DDS Group neural mark"
      {...props}
    >
      {satellites.map((p, i) => (
        <line
          key={`l-${i}`}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke={ink}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.55"
        />
      ))}
      {satellites.map((p, i) => (
        <circle
          key={`s-${i}`}
          cx={p.x}
          cy={p.y}
          r={i === 0 ? 3.4 : 2.6}
          fill={i === 0 ? accent : ink}
        />
      ))}
      <circle cx={cx} cy={cy} r={7.2} fill={core} stroke={ink} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r={2.6} fill={accent} />
    </svg>
  );
}
