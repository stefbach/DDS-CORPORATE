import Link from "next/link";
import { NeuralMark } from "@/brand/marks/NeuralMark";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="mx-auto flex max-w-shell flex-col items-start px-6">
        <NeuralMark width={80} height={80} />
        <p className="mt-8 text-xs uppercase tracking-[0.28em] text-signal">404</p>
        <h1 className="mt-2 font-display text-display-lg font-extrabold text-bone">
          Page introuvable.
        </h1>
        <p className="mt-4 max-w-md text-lg text-bone/70">
          Le lien a peut-être changé. Revenez à la page d'accueil pour explorer
          les cinq entités du groupe.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-ink"
        >
          Retour à DDS Group
        </Link>
      </div>
    </section>
  );
}
