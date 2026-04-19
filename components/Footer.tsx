import Link from "next/link";
import { HoldingLockup } from "@/brand/marks/Lockup";
import { ENTITIES } from "@/brand/entities";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-shell px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <HoldingLockup size={40} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone/60">
              Nous construisons l'infrastructure IA des métiers experts — santé,
              finance, opérations — en Afrique et dans l'Océan Indien. Basés à
              Maurice, déployés sur 3 continents.
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-bone/40">
              digital-data-solutions.net
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-bone/50">Entités</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {ENTITIES.map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/${e.slug}`}
                    className="flex items-center gap-2 text-bone/80 transition hover:text-bone"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: e.color }}
                      aria-hidden
                    />
                    {e.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-bone/50">Groupe</h4>
            <ul className="mt-4 space-y-2 text-sm text-bone/80">
              <li>
                <Link href="/#thesis" className="hover:text-bone">
                  Thèse
                </Link>
              </li>
              <li>
                <Link href="/#approach" className="hover:text-bone">
                  Approche
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-bone">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/brand" className="hover:text-bone">
                  Identité visuelle
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-bone/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} DDS Group. Tous droits réservés.</span>
          <span>
            Maurice · Océan Indien · UE — L'IA au service des métiers experts.
          </span>
        </div>
      </div>
    </footer>
  );
}
