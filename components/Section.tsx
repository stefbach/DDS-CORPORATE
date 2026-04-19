import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className ?? ""}`}>
      <div className="mx-auto max-w-shell px-6">
        {(eyebrow || title || intro) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-signal">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-display-md font-bold text-bone">{title}</h2>
            )}
            {intro && (
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-bone/70">{intro}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
