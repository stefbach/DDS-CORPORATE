import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digital-data-solutions.net"),
  title: {
    default: "DDS Group — L'infrastructure IA des métiers experts",
    template: "%s · DDS Group",
  },
  description:
    "DDS Group construit l'infrastructure IA des métiers experts — santé, finance, opérations — en Afrique et dans l'Océan Indien. TIBOK, LEXORA, AXON AI, BPO Medical, OCC.",
  openGraph: {
    title: "DDS Group — L'infrastructure IA des métiers experts",
    description:
      "Holding basée à Maurice. 5 entités unifiées par une thèse : l'IA au service des métiers experts.",
    url: "https://digital-data-solutions.net",
    siteName: "DDS Group",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-ink font-sans text-bone antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
