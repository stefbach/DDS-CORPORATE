import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./brand/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0E1A",
          900: "#0A0E1A",
          800: "#111827",
          700: "#1F2937",
          600: "#374151",
        },
        bone: {
          DEFAULT: "#FAFAF7",
          200: "#F3F3EE",
          300: "#E7E6DE",
        },
        signal: {
          DEFAULT: "#00D4FF",
          soft: "#7FEAFF",
          deep: "#0095B8",
        },
        tibok: "#0066CC",
        lexora: "#5B21B6",
        axon: "#D4AF37",
        bpo: "#0D9488",
        occ: {
          DEFAULT: "#1E3A8A",
          accent: "#FF6B6B",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        shell: "1280px",
        prose: "68ch",
      },
      boxShadow: {
        signal: "0 0 0 1px rgba(0,212,255,0.35), 0 20px 60px -20px rgba(0,212,255,0.25)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
