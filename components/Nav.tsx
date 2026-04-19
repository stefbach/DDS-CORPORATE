import Link from "next/link";
import { HoldingLockup } from "@/brand/marks/Lockup";
import { ENTITIES } from "@/brand/entities";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-shell items-center justify-between px-6 py-4">
        <Link href="/" aria-label="DDS Group — Accueil">
          <HoldingLockup size={34} />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-bone/80 md:flex">
          <Link href="/#thesis" className="hover:text-bone">
            Thèse
          </Link>
          <div className="group relative">
            <button className="hover:text-bone">Entités</button>
            <div className="absolute right-0 top-full hidden w-72 pt-3 group-hover:block">
              <div className="rounded-xl border border-white/10 bg-ink-800 p-2 shadow-card">
                {ENTITIES.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/${e.slug}`}
                    className="flex flex-col gap-0.5 rounded-lg px-3 py-2 hover:bg-white/5"
                  >
                    <span className="flex items-center gap-2 text-bone">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: e.color }}
                        aria-hidden
                      />
                      {e.name}
                    </span>
                    <span className="text-xs text-bone/55">{e.descriptor}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/#approach" className="hover:text-bone">
            Approche
          </Link>
          <Link href="/#contact" className="hover:text-bone">
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="hidden rounded-full border border-signal/40 bg-signal/10 px-4 py-2 text-sm font-medium text-signal transition hover:bg-signal/20 md:inline-flex"
        >
          Parler à un expert
        </Link>
      </div>
    </header>
  );
}
