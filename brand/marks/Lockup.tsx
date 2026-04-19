import { NeuralMark } from "./NeuralMark";
import { EntityMark } from "./EntityMark";
import type { EntitySlug } from "../entities";

type HoldingLockupProps = {
  size?: number;
  accent?: string;
  inverted?: boolean;
  className?: string;
};

export function HoldingLockup({
  size = 36,
  accent = "#00D4FF",
  inverted = false,
  className,
}: HoldingLockupProps) {
  const textColor = inverted ? "#0A0E1A" : "#FAFAF7";
  return (
    <div className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <NeuralMark
        accent={accent}
        ink={textColor}
        core={inverted ? "#FAFAF7" : "#0A0E1A"}
        width={size}
        height={size}
      />
      <div className="flex flex-col leading-none">
        <span
          className="font-display font-extrabold tracking-tight"
          style={{ color: textColor, fontSize: size * 0.6 }}
        >
          DDS
          <span style={{ color: accent }}>.</span>
        </span>
        <span
          className="font-display font-medium tracking-[0.28em] uppercase"
          style={{ color: textColor, fontSize: size * 0.24, opacity: 0.75 }}
        >
          Group
        </span>
      </div>
    </div>
  );
}

type EntityLockupProps = {
  slug: EntitySlug;
  name: string;
  accent: string;
  descriptor?: string;
  size?: number;
  className?: string;
};

export function EntityLockup({
  slug,
  name,
  accent,
  descriptor,
  size = 36,
  className,
}: EntityLockupProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <EntityMark slug={slug} accent={accent} width={size} height={size} />
      <div className="flex flex-col leading-none">
        <span
          className="font-display font-extrabold tracking-tight text-bone"
          style={{ fontSize: size * 0.58 }}
        >
          {name}
        </span>
        {descriptor && (
          <span
            className="font-display tracking-[0.18em] uppercase text-bone/65"
            style={{ fontSize: size * 0.22 }}
          >
            {descriptor}
          </span>
        )}
      </div>
    </div>
  );
}
