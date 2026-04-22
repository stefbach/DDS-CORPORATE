const { useState, useEffect, useRef, useMemo } = React;

// ============ TWEAKS ============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#C9A961",
  "showVideo": true,
  "show3D": true
}/*EDITMODE-END*/;

const COMPANY_NAME = "Digital Data Solutions";
const COMPANY_EMAIL = "sbach@digital-data-solutions.net";
const COMPANY_PHONE = "+230 5259 1043";
const COMPANY_PHONE_INTL = "+23052591043";
const FOUNDER_NAME = "Dr Stéphane Bach";

// ============ LOGO ============
function DDSLogo({ size = 22, showWordmark = true, className = "", accent = "currentColor" }) {
  return (
    <span className={"inline-flex items-center gap-3 " + className}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        {/* outer rotated square */}
        <rect x="8" y="8" width="24" height="24" transform="rotate(45 20 20)" stroke={accent} strokeWidth="1.2" opacity="0.85" />
        {/* inner filled diamond */}
        <rect x="14" y="14" width="12" height="12" transform="rotate(45 20 20)" fill={accent} opacity="0.55" />
        {/* central dot */}
        <circle cx="20" cy="20" r="1.8" fill={accent} />
        {/* corner ticks (data nodes) */}
        <circle cx="20" cy="4" r="1.2" fill={accent} opacity="0.7" />
        <circle cx="36" cy="20" r="1.2" fill={accent} opacity="0.7" />
        <circle cx="20" cy="36" r="1.2" fill={accent} opacity="0.7" />
        <circle cx="4" cy="20" r="1.2" fill={accent} opacity="0.7" />
      </svg>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[15px] md:text-[16px] tracking-[0.02em] text-white">Digital Data Solutions</span>
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/40 mt-1">DDS · Mauritius</span>
        </span>
      )}
    </span>
  );
}

// ============ DATA ============
const BRANDS = [
  {
    id: "tibok",
    num: "01",
    name: "TIBOK",
    tagline: "Le Health OS — télémédecine et présentiel augmentés par l'IA",
    desc: "Care system nouvelle génération : téléconsultation, consultation en présentiel, pilotage d'agents IA cliniques, ordonnances digitales et suivi salariés — dans une seule plateforme.",
    bullets: [
      "Health OS : téléconsultation + présentiel + modules",
      "Pilotage d'agents IA cliniques",
      "Incubé MRIC / NSIS"
    ],
    url: "https://tibok.mu/",
    color: "#14B8A6",
    colorSoft: "rgba(20,184,166,0.14)",
  },
  {
    id: "lexora",
    num: "02",
    name: "LEXORA",
    tagline: "La comptabilité augmentée par l'intelligence artificielle",
    desc: "ERP IA-native conforme MRA. Compta, paie, fiscal, juridique et santé salariés dans une seule plateforme.",
    bullets: [
      "6 agents IA spécialisés 24/7",
      "Conforme MRA · WRA 2019 · IFRS",
      "Cible : cabinets comptables + PME"
    ],
    url: "https://www.lexora.finance/",
    color: "#C9A961",
    colorSoft: "rgba(201,169,97,0.14)",
  },
  {
    id: "axon",
    num: "03",
    name: "AXON AI",
    tagline: "Des agents IA qui travaillent pour vous",
    desc: "Agents vocaux white-label. Décrochent le téléphone, gèrent WhatsApp, envoient les emails, 24 heures sur 24.",
    bullets: [
      "Stack : Vapi, n8n, ElevenLabs",
      "Déploiement 48 heures",
      "Français · Anglais · Créole mauricien"
    ],
    url: "https://axon-ai-iota.vercel.app/",
    color: "#8B7CF6",
    colorSoft: "rgba(139,124,246,0.14)",
  },
  {
    id: "occ",
    num: "04",
    name: "OBESITY CARE CLINIC",
    tagline: "Le parcours bariatrique transfrontalier de référence",
    desc: "Parcours NHS S2 UK → France. Chirurgiens européens de premier plan, téléconsultation préopératoire incluse.",
    bullets: [
      "Dossiers NHS S2 · 82% acceptation",
      "Partenaires cliniques ELSAN et Almaviva",
      "Téléconsultation préopératoire gratuite"
    ],
    url: "https://obesity-care-clinic.com/",
    color: "#5B93D1",
    colorSoft: "rgba(91,147,209,0.14)",
  },
  {
    id: "cvmi",
    num: "05",
    name: "CVMI",
    tagline: "Where nature, health & serenity meet",
    desc: "Cabo Verde Medical International — projet hospitalier et tourisme médical de 50 M€ sur l'île de Sal (Murdeira). Pré-accord stratégique avec le groupe GGZTE.",
    bullets: [
      "Sal Island · baie de Murdeira, Cap-Vert",
      "Projet 50 M€ · 100% solaire",
      "Clinique · Villas · Lifestyle (spa, golf, padel)"
    ],
    url: "https://www.cvmi.international/",
    color: "#E8B86A",
    colorSoft: "rgba(232,184,106,0.14)",
  },
  {
    id: "bpo",
    num: "06",
    name: "DDS BPO Santé",
    tagline: "Accompagnement digital des patients francophones",
    desc: "Business Process Outsourcing dédié à la santé. Accompagnement de patients français pour accéder à une consultation en ligne sur les plateformes partenaires — Qare et Livi notamment.",
    bullets: [
      "Orientation patient vers téléconsultation",
      "Plateformes partenaires : Qare, Livi",
      "Équipe francophone dédiée · Maurice"
    ],
    url: "#",
    color: "#A1A1AA",
    colorSoft: "rgba(161,161,170,0.14)",
  },
];

const VERTICALS = BRANDS;

const KPIS = [
  { value: "01", label: "Entité · une équipe" },
  { value: "06", label: "Marques" },
  { value: "27", label: "Collaborateurs" },
  { value: "03", label: "Continents actifs" },
  { value: "24/7", label: "Opérations" },
];

const MILESTONES = [
  { year: "1995", text: "Médecin santé publique — début de parcours clinique" },
  { year: "2008", text: "Premier exit healthcare — €5M" },
  { year: "2017", text: "Second exit healthcare — €8M" },
  { year: "2020", text: "Fondation Digital Data Solutions Ltd — Flic en Flac" },
];

// ============ 3D CONSTELLATION (canvas) ============
function Constellation({ enabled }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate sphere points
    const N = 380;
    const nodes = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      nodes.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      });
    }

    // 5 featured "hub" points for the brands
    const hubIdx = [40, 110, 180, 255, 330];
    const hubColors = BRANDS.map(v => v.color);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - r.left) / r.width - 0.5;
      mouseRef.current.y = (e.clientY - r.top) / r.height - 0.5;
      mouseRef.current.active = true;
    };
    const onLeave = () => { mouseRef.current.active = false; };
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let t0 = performance.now();

    const render = () => {
      const t = (performance.now() - t0) / 1000;
      const mx = mouseRef.current.x * 0.4;
      const my = mouseRef.current.y * 0.4;

      const rotY = t * 0.08 + mx;
      const rotX = Math.sin(t * 0.05) * 0.15 + my;

      const cy = Math.cos(rotY), sy = Math.sin(rotY);
      const cx = Math.cos(rotX), sx = Math.sin(rotX);

      ctx.clearRect(0, 0, W, H);

      const cX = W / 2, cY = H / 2;
      const R = Math.min(W, H) * 0.38;

      // Project all nodes
      const projected = nodes.map((n, i) => {
        // rotate Y
        let x = n.x * cy + n.z * sy;
        let z = -n.x * sy + n.z * cy;
        let y = n.y;
        // rotate X
        const y2 = y * cx - z * sx;
        const z2 = y * sx + z * cx;
        y = y2; z = z2;
        const depth = (z + 1) / 2; // 0..1
        return { x: cX + x * R, y: cY + y * R, z, depth, idx: i };
      });

      // Draw connections between close-ish nodes (only on front hemisphere)
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        if (a.z < -0.1) continue;
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          if (b.z < -0.1) continue;
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 2800) {
            const alpha = (1 - d2 / 2800) * 0.12 * ((a.depth + b.depth) / 2);
            ctx.strokeStyle = `rgba(230, 220, 200, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of projected) {
        const isHub = hubIdx.indexOf(p.idx);
        if (isHub !== -1) continue;
        const size = 0.6 + p.depth * 1.2;
        const a = 0.15 + p.depth * 0.5;
        ctx.fillStyle = `rgba(240, 230, 210, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw hubs on top — glowing
      for (let k = 0; k < hubIdx.length; k++) {
        const p = projected[hubIdx[k]];
        const color = hubColors[k];
        const size = 2.5 + p.depth * 3;
        const pulse = 0.6 + Math.sin(t * 1.5 + k) * 0.2;

        // glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 6);
        grad.addColorStop(0, hexToRgba(color, 0.7 * pulse * (0.3 + p.depth * 0.7)));
        grad.addColorStop(1, hexToRgba(color, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 6, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = hexToRgba(color, 0.4 + p.depth * 0.6);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)" }}
    />
  );
}

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ============ ABSTRACT VIDEO (canvas — generative, no external file) ============
function AbstractVideo({ color = "#C9A961", style = {}, className = "", variant = "flow" }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf = 0, t0 = performance.now();
    const resize = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const render = () => {
      const t = (performance.now() - t0) / 1000;
      const r = c.getBoundingClientRect();
      const W = r.width, H = r.height;
      ctx.clearRect(0, 0, W, H);

      // base dark wash
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, W, H);

      if (variant === "flow") {
        // flowing sine ribbons
        for (let k = 0; k < 6; k++) {
          ctx.beginPath();
          const phase = t * 0.5 + k * 0.8;
          const amp = 28 + k * 4;
          const freq = 0.008 + k * 0.001;
          const yOff = H * 0.2 + k * (H * 0.12);
          for (let x = 0; x <= W; x += 4) {
            const y = yOff + Math.sin(x * freq + phase) * amp + Math.cos(x * freq * 2 + phase) * 12;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = hexToRgba(color, 0.18 - k * 0.015);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // scanning glow
        const sx = (Math.sin(t * 0.3) * 0.5 + 0.5) * W;
        const g = ctx.createRadialGradient(sx, H / 2, 0, sx, H / 2, W * 0.4);
        g.addColorStop(0, hexToRgba(color, 0.15));
        g.addColorStop(1, hexToRgba(color, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      } else if (variant === "grid") {
        // rotating perspective grid
        const cells = 18;
        const cellW = W / cells;
        ctx.strokeStyle = hexToRgba(color, 0.25);
        ctx.lineWidth = 1;
        for (let i = 0; i <= cells; i++) {
          const x = i * cellW + (Math.sin(t * 0.4 + i * 0.3) * 2);
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        const rows = Math.floor(H / cellW);
        for (let j = 0; j <= rows; j++) {
          const y = j * cellW;
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
        // pulsing cells
        for (let k = 0; k < 5; k++) {
          const cx = ((Math.sin(t * 0.5 + k * 1.7) * 0.5 + 0.5) * (cells - 1)) | 0;
          const cy = ((Math.cos(t * 0.4 + k * 2.1) * 0.5 + 0.5) * (rows - 1)) | 0;
          ctx.fillStyle = hexToRgba(color, 0.4 + Math.sin(t * 2 + k) * 0.2);
          ctx.fillRect(cx * cellW, cy * cellW, cellW, cellW);
        }
      } else if (variant === "orbit") {
        // concentric orbits with points
        const cX = W / 2, cY = H / 2;
        for (let ring = 1; ring <= 5; ring++) {
          const rad = ring * Math.min(W, H) * 0.08;
          ctx.strokeStyle = hexToRgba(color, 0.12);
          ctx.beginPath(); ctx.arc(cX, cY, rad, 0, Math.PI * 2); ctx.stroke();
          const count = ring * 4;
          for (let i = 0; i < count; i++) {
            const a = t * (0.2 + ring * 0.06) + i * (Math.PI * 2 / count);
            const px = cX + Math.cos(a) * rad;
            const py = cY + Math.sin(a) * rad;
            ctx.fillStyle = hexToRgba(color, 0.5);
            ctx.beginPath(); ctx.arc(px, py, 1.4, 0, Math.PI * 2); ctx.fill();
          }
        }
        // center pulse
        const p = 20 + Math.sin(t * 2) * 4;
        const grad = ctx.createRadialGradient(cX, cY, 0, cX, cY, p * 2);
        grad.addColorStop(0, hexToRgba(color, 0.6));
        grad.addColorStop(1, hexToRgba(color, 0));
        ctx.fillStyle = grad;
        ctx.fillRect(cX - p * 2, cY - p * 2, p * 4, p * 4);
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [color, variant]);
  return <canvas ref={ref} className={className} style={style} />;
}

// ============ SUBSECTIONS ============
function Nav({ accentColor }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <DDSLogo size={22} accent={accentColor} />
        </a>
        <div className="hidden md:flex items-center gap-8 text-[13px] text-white/60">
          <a href="#verticales" className="hover:text-white transition">Marques</a>
          <a href="#recherche" className="hover:text-white transition">Recherche</a>
          <a href="#fondateur" className="hover:text-white transition">À propos</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-[13px] text-black bg-white hover:bg-white/90 transition px-4 py-2 rounded-full">
          Investisseurs
          <span>→</span>
        </a>
        <button className="md:hidden text-white/80" onClick={() => setOpen(!open)} aria-label="menu">
          <div className="space-y-1.5">
            <div className="w-5 h-px bg-white/80" />
            <div className="w-5 h-px bg-white/80" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 bg-black/80 px-6 py-4 space-y-3 text-sm text-white/70">
          <a href="#verticales" className="block">Marques</a>
          <a href="#recherche" className="block">Recherche</a>
          <a href="#fondateur" className="block">À propos</a>
          <a href="#contact" className="block">Contact</a>
        </div>
      )}
    </nav>
  );
}

function Hero({ accentColor, show3D, showVideo }) {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const HEADLINES = [
    ["Bâtir l'infrastructure", "numérique de demain."],
    ["Données, intelligence,", "décision augmentée."],
    ["Une holding. Cinq verticales.", "Un même socle de données."],
  ];
  const h = HEADLINES[headlineIdx];

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center border-b border-white/5">
      {/* Video bg */}
      {showVideo && (
        <div className="absolute inset-0 opacity-50">
          <AbstractVideo color={accentColor} variant="flow" className="w-full h-full" />
        </div>
      )}
      {/* 3D constellation */}
      <div className="absolute inset-0">
        <Constellation enabled={show3D} />
      </div>
      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 w-full py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.25em] text-white/50 uppercase mb-8">
            <span className="inline-block w-8 h-px bg-white/30" />
            Digital Data Solutions Ltd · Maurice · 2020
          </div>

          <h1 className="font-serif text-[44px] md:text-[72px] leading-[0.98] tracking-[-0.02em] text-white">
            {h[0]}<br />
            <span className="italic text-white/70">{h[1]}</span>
          </h1>

          <p className="mt-8 text-[17px] md:text-[19px] text-white/60 max-w-xl leading-relaxed">
            Une entreprise technologique mauricienne, quatre marques produits. Santé, finance, intelligence artificielle,
            parcours cliniques — conçus et opérés par une même équipe, sur un socle opérationnel commun.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="#verticales" className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-[14px] font-medium hover:bg-white/90 transition">
              Découvrir nos verticales
              <span className="text-lg leading-none">→</span>
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-full text-[14px] hover:bg-white/5 transition">
              Contact investisseurs
            </a>
          </div>

          {/* headline switcher */}
          <div className="mt-16 flex items-center gap-3 text-[11px] text-white/40 uppercase tracking-[0.2em]">
            <span>Variante</span>
            {HEADLINES.map((_, i) => (
              <button key={i} onClick={() => setHeadlineIdx(i)} className={"w-8 h-px transition " + (i === headlineIdx ? "bg-white" : "bg-white/20 hover:bg-white/50")} />
            ))}
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/30 flex flex-col items-center gap-2">
        scroll
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section id="these" className="relative py-28 md:py-40 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">§ 01 — Thèse</div>
        </div>
        <div className="md:col-span-8">
          <p className="font-serif text-[26px] md:text-[38px] leading-[1.25] tracking-[-0.01em] text-white/90" style={{ textWrap: "pretty" }}>
            Nous sommes <em className="text-white/60">une seule entreprise</em> — une équipe de 27 personnes,
            un socle d'ingénierie, une discipline opérationnelle — qui publie six marques produits :
            santé, finance, intelligence artificielle, parcours cliniques, wellness, BPO santé.
            Depuis Maurice, pour l'Afrique et l'Europe.
          </p>
        </div>
      </div>
    </section>
  );
}

function Verticals() {
  const [hover, setHover] = useState(null);
  return (
    <section id="verticales" className="relative py-28 md:py-40 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-4">§ 02 — Nos marques</div>
            <h2 className="font-serif text-[42px] md:text-[60px] leading-[1] tracking-[-0.02em] text-white">
              Une équipe.<br />
              <span className="italic text-white/50">Six marques.</span>
            </h2>
          </div>
          <div className="hidden md:block text-right text-[11px] uppercase tracking-[0.25em] text-white/40">
            2020 — présent<br />Flic en Flac, Maurice
          </div>
        </div>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {VERTICALS.map((v, i) => (
            <VerticalRow key={v.id} v={v} hover={hover === v.id} setHover={() => setHover(v.id)} unsetHover={() => setHover(null)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VerticalRow({ v, hover, setHover, unsetHover }) {
  return (
    <a
      href={v.url}
      target={v.url.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={setHover}
      onMouseLeave={unsetHover}
      className="group block relative py-10 md:py-14 transition"
    >
      {/* animated accent line */}
      <div
        className="absolute top-0 left-0 h-px transition-all duration-700 ease-out"
        style={{ width: hover ? "100%" : "0%", background: v.color }}
      />

      <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
        <div className="md:col-span-1 text-[11px] tracking-[0.2em] text-white/40">{v.num}</div>

        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: v.color }} />
            <span className="font-serif text-[28px] md:text-[36px] tracking-[-0.01em] text-white">{v.name}</span>
          </div>
          <p className="text-[14px] md:text-[15px] text-white/50 leading-relaxed max-w-sm">{v.tagline}</p>
        </div>

        <div className="md:col-span-4">
          <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed mb-5">{v.desc}</p>
          <ul className="space-y-2 text-[13px] text-white/50">
            {v.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-white/30">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10" style={{ background: "#050505" }}>
            <AbstractVideo color={v.color} variant={i3Variant(v.id)} className="absolute inset-0 w-full h-full" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/60">
              <span>visit {v.id}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
function i3Variant(id) {
  if (id === "tibok") return "orbit";
  if (id === "lexora") return "grid";
  if (id === "axon") return "flow";
  if (id === "occ") return "orbit";
  if (id === "cvmi") return "flow";
  if (id === "bpo") return "grid";
  return "grid";
}

// Orbital agent visualization — central pulsing core + agents orbiting + signal bursts
function AxonOrbit({ agents, selected, onSelect, color }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Signal bursts pool
    const bursts = [];
    const spawnBurst = (angle, ring) => {
      bursts.push({ angle, ring, life: 0, outward: Math.random() > 0.4 });
    };

    let t0 = performance.now();
    const N = agents.length;

    const render = () => {
      const t = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      const cX = W / 2, cY = H / 2;
      const baseR = Math.min(W, H) * 0.36;
      const ringR = [baseR * 0.55, baseR * 0.85, baseR * 1.1];

      // Ring circles
      for (let i = 0; i < ringR.length; i++) {
        ctx.strokeStyle = hexToRgba(color, 0.06 + i * 0.02);
        ctx.setLineDash([2, 6]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cX, cY, ringR[i], 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Core glow (pulsing)
      const pulse = 0.8 + Math.sin(t * 1.8) * 0.2;
      const coreR = baseR * 0.22;
      const coreGrad = ctx.createRadialGradient(cX, cY, 0, cX, cY, coreR * 3);
      coreGrad.addColorStop(0, hexToRgba(color, 0.5 * pulse));
      coreGrad.addColorStop(0.4, hexToRgba(color, 0.15 * pulse));
      coreGrad.addColorStop(1, hexToRgba(color, 0));
      ctx.fillStyle = coreGrad;
      ctx.fillRect(cX - coreR * 3, cY - coreR * 3, coreR * 6, coreR * 6);

      // Ripples emanating from core
      for (let k = 0; k < 3; k++) {
        const phase = (t * 0.5 + k * 0.33) % 1;
        const r = coreR + phase * baseR * 1.4;
        const a = (1 - phase) * 0.22;
        ctx.strokeStyle = hexToRgba(color, a);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cX, cY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Core inner shape (diamond of DDS brand)
      ctx.save();
      ctx.translate(cX, cY);
      ctx.rotate(t * 0.3);
      ctx.strokeStyle = hexToRgba(color, 0.7);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const s = coreR * 0.55;
      ctx.moveTo(0, -s); ctx.lineTo(s, 0); ctx.lineTo(0, s); ctx.lineTo(-s, 0); ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = hexToRgba(color, 0.15 * pulse);
      ctx.fill();
      ctx.restore();

      // Core dot
      ctx.fillStyle = hexToRgba(color, 0.95);
      ctx.beginPath();
      ctx.arc(cX, cY, 3.5 + pulse, 0, Math.PI * 2);
      ctx.fill();

      // Agents distributed across 3 rings — return positions to draw HTML labels
      const positions = [];
      for (let i = 0; i < N; i++) {
        const ringIdx = i % 3;
        const r = ringR[ringIdx];
        const perRing = Math.ceil(N / 3);
        const ringSpeed = 0.08 + ringIdx * 0.04;
        const angleOffset = ringIdx * 0.4;
        const a = (i / perRing) * Math.PI * 2 + t * ringSpeed * (ringIdx % 2 === 0 ? 1 : -1) + angleOffset;
        const x = cX + Math.cos(a) * r;
        const y = cY + Math.sin(a) * r;
        positions.push({ x, y, a, r, i });

        // Connection line to core (faint) for selected
        const isSel = selected === i;
        if (isSel) {
          const grad = ctx.createLinearGradient(cX, cY, x, y);
          grad.addColorStop(0, hexToRgba(color, 0.6));
          grad.addColorStop(1, hexToRgba(color, 0));
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cX, cY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // Agent node
        const nodeR = isSel ? 7 : 4.5;
        const nodeGrad = ctx.createRadialGradient(x, y, 0, x, y, nodeR * 4);
        nodeGrad.addColorStop(0, hexToRgba(color, isSel ? 0.55 : 0.3));
        nodeGrad.addColorStop(1, hexToRgba(color, 0));
        ctx.fillStyle = nodeGrad;
        ctx.fillRect(x - nodeR * 4, y - nodeR * 4, nodeR * 8, nodeR * 8);

        ctx.fillStyle = isSel ? "#ffffff" : hexToRgba(color, 0.9);
        ctx.beginPath();
        ctx.arc(x, y, nodeR, 0, Math.PI * 2);
        ctx.fill();

        if (isSel) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, y, nodeR + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Random signal bursts
      if (Math.random() < 0.15) {
        spawnBurst(Math.random() * Math.PI * 2, Math.floor(Math.random() * 3));
      }
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.life += 0.02;
        if (b.life > 1) { bursts.splice(i, 1); continue; }
        const targetR = ringR[b.ring];
        const startR = b.outward ? 0 : targetR;
        const endR = b.outward ? targetR : 0;
        const r = startR + (endR - startR) * b.life;
        const x = cX + Math.cos(b.angle) * r;
        const y = cY + Math.sin(b.angle) * r;
        ctx.fillStyle = hexToRgba(color, (1 - b.life) * 0.8);
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Store positions on canvas for label overlay
      canvas._positions = positions;

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [agents, color, selected]);

  return (
    <div className="relative w-full aspect-square max-w-[620px] mx-auto">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Click zones on top of nodes */}
      <div className="absolute inset-0">
        {agents.map((a, i) => {
          // Initial positions (will be updated by CSS via state read — but we use static placeholder clicks via buttons elsewhere)
          return null;
        })}
      </div>
      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/40">AXON AI</div>
          <div className="font-serif text-[17px] md:text-[20px] text-white mt-1">Core Engine</div>
          <div className="font-mono text-[9px] tracking-[0.2em] text-white/30 mt-1">vapi · anthropic · n8n</div>
        </div>
      </div>
    </div>
  );
}

function AxonShowcase({ accentColor }) {
  const AGENTS = [
    { name: "Orchestrateur", tag: "MULTI-AGENTS", metric: "100%", metricL: "traçabilité", desc: "Coordonne les agents spécialisés sur un processus bout-en-bout." },
    { name: "Réservation", tag: "UNIVERSEL", metric: "−50%", metricL: "no-show", desc: "RDV par téléphone, confirmation WhatsApp + email." },
    { name: "Rédacteur scientifique", tag: "PUBLICATIONS", metric: "−70%", metricL: "temps rédaction", desc: "Processus IMRAD, donnée brute au manuscrit final." },
    { name: "Comptes rendus médicaux", tag: "TIBOK", metric: ">85%", metricL: "acceptation", desc: "Dictée → CR structuré → validation 1 clic." },
    { name: "Commercial & CRM", tag: "VENTES", metric: "×3", metricL: "conversion", desc: "Qualification leads, devis PDF en 60s, relances multicanal." },
    { name: "Service client", tag: "SUPPORT 24/7", metric: "70%", metricL: "résolution auto", desc: "Escalade intelligente avec contexte complet." },
    { name: "RH & Onboarding", tag: "RH", metric: "−60%", metricL: "charge admin", desc: "Accueil vocal J+1, parcours d'intégration automatisé." },
    { name: "Comptabilité", tag: "LEXORA", metric: "−80%", metricL: "saisie manuelle", desc: "Saisie factures, rapprochement bancaire, TVA." },
    { name: "Service appels", tag: "VOCAL", metric: "24/7", metricL: "disponibilité", desc: "Décroche, transfère, prend des messages sans pause." },
  ];

  const [selected, setSelected] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSelected(s => (s + 1) % AGENTS.length), 2400);
    return () => clearInterval(id);
  }, [AGENTS.length]);

  const sel = AGENTS[selected];
  const axonPurple = "#8B7CF6";

  return (
    <section className="relative py-28 md:py-40 border-b border-white/5 overflow-hidden">
      {/* ambient video */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <AbstractVideo color={axonPurple} variant="flow" className="w-full h-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-6 items-end mb-14 md:mb-16">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/40 mb-5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: axonPurple }} />
              § 03 — Focus produit · AXON AI
            </div>
            <h2 className="font-serif text-[42px] md:text-[60px] leading-[1] tracking-[-0.02em] text-white">
              Un noyau.<br />
              <span className="italic text-white/60">Des agents en orbite.</span>
            </h2>
          </div>
          <div className="md:col-span-5 text-[14px] text-white/55 leading-relaxed">
            Un moteur central, une mémoire unifiée, des agents spécialisés qui tournent en continu autour.
            8 secteurs, 42+ métiers, 130+ cas d'usage — déployés en 48 heures.
          </div>
        </div>

        {/* ORBIT — main visual */}
        <div className="relative grid md:grid-cols-12 gap-6 md:gap-10 items-center mb-20 md:mb-28">
          <div className="md:col-span-7 relative">
            <AxonOrbit agents={AGENTS} selected={selected} onSelect={setSelected} color={axonPurple} />
          </div>

          {/* Selected agent panel */}
          <div className="md:col-span-5">
            <div className="relative border border-white/10 bg-black/60 backdrop-blur p-6 md:p-8 overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-full" style={{ background: `linear-gradient(90deg, ${axonPurple}, transparent)` }} />
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: axonPurple }}>
                  Agent {String(selected + 1).padStart(2, "0")} / {String(AGENTS.length).padStart(2, "0")}
                </div>
                <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/40">{sel.tag}</div>
              </div>
              <div className="font-serif text-[28px] md:text-[34px] text-white leading-[1.05] tracking-[-0.01em] mb-4">
                {sel.name}
              </div>
              <p className="text-[14px] text-white/60 leading-relaxed min-h-[64px]">{sel.desc}</p>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-baseline gap-3">
                <div className="font-serif text-[48px] leading-none tracking-[-0.02em]" style={{ color: axonPurple }}>
                  {sel.metric}
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">{sel.metricL}</div>
              </div>

              {/* Live signal */}
              <div className="mt-6 flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-white/40">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: axonPurple }} />
                LIVE · ORBITE ACTIVE
              </div>
            </div>

            {/* Agent selector pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {AGENTS.map((a, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={"text-[10px] font-mono tracking-[0.1em] px-2.5 py-1.5 border transition " +
                    (selected === i ? "border-white text-white bg-white/10" : "border-white/15 text-white/50 hover:border-white/40 hover:text-white/80")}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 stat bars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mb-20 md:mb-28">
          {[
            { v: "−80%", l: "tâches répétitives" },
            { v: "24/7", l: "disponibilité" },
            { v: "48h", l: "déploiement" },
            { v: "×10", l: "capacité" },
          ].map((s, i) => (
            <div key={i} className="bg-black py-7 px-6 relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700" style={{ background: axonPurple }} />
              <div className="font-serif text-[38px] md:text-[46px] leading-none tracking-[-0.02em] text-white">{s.v}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>

        {/* CTA + tech stack */}
        <div className="border border-white/15 p-6 md:p-8 grid md:grid-cols-12 gap-6 items-center" style={{ background: `linear-gradient(90deg, rgba(139,124,246,0.06), transparent)` }}>
          <div className="md:col-span-8">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: axonPurple }}>SUR MESURE · 48H</div>
            <div className="font-serif text-[20px] md:text-[26px] text-white leading-tight">
              Votre métier n'est pas dans l'orbite ? On l'y place en 48 heures.
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono">
              <span className="text-white/50">PROPULSÉ PAR</span>
              <span>Anthropic</span>
              <span className="text-white/20">·</span>
              <span>Retell</span>
              <span className="text-white/20">·</span>
              <span>Vapi</span>
              <span className="text-white/20">·</span>
              <span>ElevenLabs</span>
              <span className="text-white/20">·</span>
              <span>n8n</span>
            </div>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a href="https://axon-ai-iota.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[12px] bg-white text-black px-5 py-3 rounded-full hover:bg-white/90 transition">
              Découvrir AXON AI →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function KpiStrip() {
  return (
    <section className="relative py-20 md:py-24 border-b border-white/5 bg-[#0D0D0D]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/5">
          {KPIS.map((k, i) => (
            <div key={i} className="bg-[#0D0D0D] py-10 px-6 flex flex-col items-start">
              <div className="font-serif text-[44px] md:text-[56px] leading-none tracking-[-0.03em] text-white">{k.value}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/40">{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section id="recherche" className="relative py-28 md:py-40 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-4">§ 03 — Recherche & Science</div>
          <h2 className="font-serif text-[34px] md:text-[46px] leading-[1.05] tracking-[-0.02em] text-white">
            Une recherche validée par la donnée.
          </h2>
          <p className="mt-6 text-[14px] text-white/50 leading-relaxed max-w-sm">
            Modèles conçus en partenariat avec l'<em className="text-white/80">unité INSERM de Marseille</em> et
            un consortium international de chirurgiens bariatriques.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
            <div>— INSERM Marseille</div>
            <div>— Consortium bariatrique EU</div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-6">
          <ResearchCard
            code="BSD Score"
            title="Stratification du risque cardiovasculaire"
            metric1={{ v: "0.931", l: "AUC" }}
            metric2={{ v: "59 204", l: "Cohorte" }}
            note="Recherche en partenariat avec l'unité INSERM de Marseille. Modèle supervisé multi-cohorte, validation externe européenne."
          />
          <ResearchCard
            code="BMN Score v3.5"
            title="Risque métabolique & réponse aux GLP-1"
            metric1={{ v: "0.876", l: "AUC" }}
            metric2={{ v: "22 807", l: "Cohorte" }}
            note="Partenariat avec un consortium de médecins et chirurgiens bariatriques de renommée internationale (France, UK, Italie)."
          />
          <div className="text-[11px] text-white/30 leading-relaxed pt-4 border-t border-white/5">
            Protocoles validés par le comité éthique, anonymisation conforme DPA 2017.
          </div>
        </div>
      </div>
    </section>
  );
}

function ResearchCard({ code, title, metric1, metric2, note }) {
  return (
    <div className="border border-white/10 p-6 md:p-8 hover:border-white/20 transition group">
      <div className="grid md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{code}</div>
          <div className="font-serif text-[22px] md:text-[26px] text-white mt-2 leading-[1.2]">{title}</div>
        </div>
        <div className="md:col-span-3 flex gap-6">
          <div>
            <div className="font-serif text-[30px] text-white leading-none">{metric1.v}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">{metric1.l}</div>
          </div>
          <div>
            <div className="font-serif text-[30px] text-white/60 leading-none">{metric2.v}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">{metric2.l}</div>
          </div>
        </div>
        <div className="md:col-span-4 text-[12px] text-white/50 leading-relaxed">{note}</div>
      </div>
    </div>
  );
}

function Founder({ accentColor }) {
  return (
    <section id="fondateur" className="relative py-28 md:py-44 border-b border-white/5 overflow-hidden">
      {/* ambient bg */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <AbstractVideo color={accentColor} variant="orbit" className="w-full h-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-10">§ 04 — L'architecte</div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-5 md:sticky md:top-24">
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden bg-[#0A0A0A] border border-white/10">
                <img
                  src={(typeof window !== "undefined" && window.__resources && window.__resources.drBach) || "assets/dr-bach.avif"}
                  alt="Dr Stéphane Bach"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="font-serif text-[24px] md:text-[28px] text-white leading-tight">Dr Stéphane Bach</div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-white/70 mt-2">MD · MPH</div>
                  <div className="text-[11px] text-white/60 mt-1">Fondateur & CEO — Digital Data Solutions Ltd</div>
                  <div className="text-[11px] text-white/60">Président du Conseil — CVMI SA</div>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t border-l border-white/30" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b border-r" style={{ borderColor: accentColor }} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="border border-white/10 p-3">
                <div className="font-serif text-[24px] text-white leading-none">30</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mt-2">années d'expertise</div>
              </div>
              <div className="border border-white/10 p-3">
                <div className="font-serif text-[24px] text-white leading-none">02</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mt-2">exits · ~13 M€</div>
              </div>
              <div className="border border-white/10 p-3">
                <div className="font-serif text-[24px] text-white leading-none">03</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mt-2">continents actifs</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-12">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: accentColor }}>
                L'architecte de l'ensemble
              </div>
              <h2 className="font-serif text-[38px] md:text-[58px] leading-[1] tracking-[-0.02em] text-white">
                Un médecin.<br />
                <span className="italic text-white/60">Cinq marques.</span><br />
                Trois continents.
              </h2>
              <p className="mt-8 text-[16px] md:text-[17px] text-white/75 leading-relaxed" style={{ textWrap: "pretty" }}>
                Médecin de santé publique, entrepreneur en série et architecte de systèmes de santé
                augmentés par l'IA, <em className="text-white">Dr Stéphane Bach</em> met trente ans d'expertise
                médicale et économique au service d'une nouvelle génération d'infrastructures digitales et hospitalières,
                entre l'Europe, l'Afrique de l'Est et l'Afrique de l'Ouest.
              </p>
            </div>

            {/* Parcours */}
            <div className="pt-8 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-5">Parcours</div>
              <p className="text-[14px] text-white/65 leading-relaxed">
                Diplômé en médecine, titulaire d'un <em className="text-white/85">Master of Public Health</em>. Consultant référent
                sur la Tarification à l'Activité (T2A) auprès de plus de <em className="text-white/85">100 établissements hospitaliers</em>
                français, il a co-conçu le <em className="text-white/85">Palmarès National des Hôpitaux</em> publié par <em>Le Figaro</em>,
                devenu une référence dans l'évaluation de la performance hospitalière.
              </p>
              <p className="mt-4 text-[14px] text-white/65 leading-relaxed">
                Entrepreneur depuis toujours : deux entreprises de santé fondées, développées puis cédées —
                une clinique revendue jusqu'à <em className="text-white/85">10 M€</em> et une plateforme e-commerce santé
                cédée pour <em className="text-white/85">3 M€</em>, pour un cumul de sorties avoisinant
                <em className="text-white/85"> 13 M€</em>.
              </p>
            </div>

            {/* Recherche */}
            <div className="pt-8 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-5">Travaux scientifiques</div>
              <p className="text-[14px] text-white/65 leading-relaxed mb-4">
                Co-auteur de deux algorithmes épidémiologiques validés à grande échelle, développés avec les
                <em className="text-white/85"> Professeurs Sampol et Dignat-George</em> :
              </p>
              <ul className="space-y-3 text-[13px] text-white/65">
                <li className="flex gap-4 pl-4 border-l border-white/10">
                  <span><em className="text-white">Score BSD</em> — stratification du risque cardiovasculaire, validé sur NHANES (N = 59 204, AUC 0,931–0,965), déployé sous le nom <em>SilentCheck</em>.</span>
                </li>
                <li className="flex gap-4 pl-4 border-l border-white/10">
                  <span><em className="text-white">Score BMN v3.5</em> — risque métabolique et profilage de la réponse aux analogues GLP-1 (N = 22 807, AUC 0,876).</span>
                </li>
              </ul>
            </div>

            {/* Aujourd'hui — écosystème */}
            <div className="pt-8 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-5">Aujourd'hui · écosystème tri-continental</div>
              <p className="text-[14px] text-white/65 leading-relaxed">
                Depuis Maurice, il dirige <em className="text-white">Digital Data Solutions Ltd</em>, qui fédère
                cinq entités digitales et opérationnelles complémentaires : TIBOK, Lexora, Axon AI,
                Obesity Care Clinic, DDS BPO.
              </p>
              <p className="mt-4 text-[14px] text-white/65 leading-relaxed">
                En parallèle, il préside <em className="text-white">Cabo Verde Medical International SA (CVMI)</em>,
                porteuse d'un projet hospitalier et de tourisme médical de
                <em className="text-white/85"> 50 M€ sur l'île de Sal, au Cap-Vert</em> (site de Murdeira),
                avec un pré-accord stratégique signé avec le groupe <em className="text-white/85">GGZTE</em>.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 text-[11px]">
                <div className="border border-white/10 p-4">
                  <div className="uppercase tracking-[0.2em]" style={{ color: accentColor }}>Europe</div>
                  <div className="text-white/50 mt-2 leading-snug">France, UK — Obesity Care Clinic, partenariats scientifiques</div>
                </div>
                <div className="border border-white/10 p-4">
                  <div className="uppercase tracking-[0.2em]" style={{ color: accentColor }}>Afrique de l'Est</div>
                  <div className="text-white/50 mt-2 leading-snug">Maurice — hub groupe, 27 collaborateurs</div>
                </div>
                <div className="border border-white/10 p-4">
                  <div className="uppercase tracking-[0.2em]" style={{ color: accentColor }}>Afrique de l'Ouest</div>
                  <div className="text-white/50 mt-2 leading-snug">Cap-Vert — CVMI, projet 50 M€, île de Sal</div>
                </div>
              </div>
            </div>

            {/* Affiliations */}
            <div className="pt-8 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-5">Reconnaissances & affiliations</div>
              <ul className="space-y-2 text-[13px] text-white/60">
                <li className="flex gap-3"><span className="text-white/30">—</span><span>Président du Conseil d'Administration de <em className="text-white/85">CVMI SA</em> (projet 50 M€, Sal, Cap-Vert)</span></li>
                <li className="flex gap-3"><span className="text-white/30">—</span><span>Pré-accord stratégique avec <em className="text-white/85">GGZTE</em> pour le déploiement de CVMI</span></li>
                <li className="flex gap-3"><span className="text-white/30">—</span><span>Incubé <em className="text-white/85">MRIC / NSIS</em> (National Smart Island Scheme) avec TIBOK</span></li>
                <li className="flex gap-3"><span className="text-white/30">—</span><span>Co-directeur d'<em className="text-white/85">Obesity Care Clinic Ltd</em> avec le Dr Thierry Manos</span></li>
                <li className="flex gap-3"><span className="text-white/30">—</span><span>Interlocuteur actif des réseaux <em className="text-white/85">ELSAN</em> et <em className="text-white/85">Almaviva Santé</em> sur les pathways NHS S2</span></li>
              </ul>
            </div>

            {/* Citation */}
            <div className="pt-10 border-t border-white/10 relative">
              <div className="absolute top-10 left-0 font-serif text-[60px] leading-none opacity-20" style={{ color: accentColor }}>“</div>
              <div className="pl-8">
                <p className="font-serif italic text-[20px] md:text-[24px] text-white/85 leading-[1.35]" style={{ textWrap: "pretty" }}>
                  L'intelligence artificielle ne remplacera jamais la décision du médecin.
                  Elle la rendra plus juste, plus précoce, et plus humaine.
                </p>
                <div className="mt-4 text-[11px] uppercase tracking-[0.25em] text-white/40">— Dr S. Bach</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ accentColor }) {
  const blocks = [
    {
      t: "Investisseurs",
      d: "Présentation groupe, data room et opportunités d'entrée au capital.",
      e: COMPANY_EMAIL
    },
    {
      t: "Partenariats",
      d: "Intégrations ERP, cliniques partenaires, distribution white-label d'agents IA, incubations croisées.",
      e: COMPANY_EMAIL
    },
    {
      t: "Carrières",
      d: "Ingénierie, science clinique, produit, opérations. Maurice, Paris, Londres.",
      e: COMPANY_EMAIL
    },
  ];
  return (
    <section id="contact" className="relative py-28 md:py-40 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-4">§ 05 — Contact</div>
        <h2 className="font-serif text-[42px] md:text-[60px] leading-[1] tracking-[-0.02em] text-white mb-16">
          Parlons.
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {blocks.map((b, i) => (
            <div key={i} className="bg-black p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.25em]" style={{ color: accentColor }}>{b.t}</div>
              <p className="mt-6 text-[14px] text-white/60 leading-relaxed">{b.d}</p>
              <a href={`mailto:${b.e}`} className="mt-8 inline-flex items-center gap-2 text-[13px] text-white border-b border-white/30 pb-1 hover:border-white transition">
                {b.e}
                <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* Direct line to founder */}
        <div className="mt-12 border border-white/15 p-6 md:p-8 grid md:grid-cols-12 gap-6 items-center" style={{ background: `linear-gradient(90deg, ${accentColor}10, transparent)` }}>
          <div className="md:col-span-8">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: accentColor }}>LIGNE DIRECTE · FONDATEUR</div>
            <div className="font-serif text-[22px] md:text-[28px] text-white leading-tight">
              {FOUNDER_NAME} <span className="text-white/50 italic">— pour les dossiers stratégiques</span>
            </div>
            <p className="text-[12px] text-white/50 mt-3 leading-relaxed max-w-2xl">
              Investissement, partenariats groupe, co-développement d'agents IA sectoriels. Réponse sous 24h.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right flex flex-col items-start md:items-end gap-3">
            <a href={`tel:${COMPANY_PHONE_INTL}`} className="inline-flex items-center gap-2 text-[14px] bg-white text-black px-5 py-3 rounded-full hover:bg-white/90 transition font-mono tracking-wider">
              <span aria-hidden>☎</span>
              {COMPANY_PHONE}
            </a>
            <a href={`https://wa.me/${COMPANY_PHONE_INTL.replace('+','')}`} target="_blank" rel="noreferrer" className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/50 hover:text-white border-b border-white/20 hover:border-white/60 transition pb-0.5">
              WhatsApp →
            </a>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Siège</div>
            <div className="font-serif text-[22px] text-white">Flic en Flac</div>
            <div className="text-[14px] text-white/50 mt-1 leading-relaxed">
              7 Ocean Avenue, Sea View<br />
              Les Jardins d'Anna<br />
              Flic en Flac · Maurice
            </div>
            <div className="mt-4 font-mono text-[11px] text-white/50"><a href={`tel:${COMPANY_PHONE_INTL}`} className="hover:text-white transition">{COMPANY_PHONE}</a></div>
          </div>
          <div className="font-mono text-[11px] text-white/40 space-y-1">
            <div>Digital Data Solutions Ltd</div>
            <div>BRN · C20173522</div>
            <div>Company · C173522</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ accentColor }) {
  return (
    <footer className="py-14 bg-black">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-5 gap-10 mb-14">
          <div className="md:col-span-2">
            <div className="mb-4">
              <DDSLogo size={20} accent={accentColor} />
            </div>
            <p className="text-[12px] text-white/40 max-w-xs leading-relaxed">
              Une entreprise technologique mauricienne. Santé, finance, intelligence artificielle, opérations — six marques, une équipe.
            </p>
          </div>
          <FooterCol title="Marques" items={BRANDS.map(v => ({ label: v.name, href: v.url && v.url !== "#" ? v.url : "#verticales", external: v.url && v.url !== "#" }))} />
          <FooterCol title="Groupe" items={[
            { label: "Thèse", href: "#these" },
            { label: "Recherche", href: "#recherche" },
            { label: "Fondateur", href: "#fondateur" },
            { label: "Contact", href: "#contact" },
          ]} />
          <FooterCol title="Légal" items={[{ label: "Mentions légales", href: "mentions-legales.html" }, "Confidentialité", "BRN C20173522", "Company C173522"]} />
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[11px] text-white/30 font-mono">
          <div>© 2026 Digital Data Solutions Ltd · Flic en Flac, Mauritius</div>
          <div>Conçu à Maurice — déployé globalement</div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">{title}</div>
      <ul className="space-y-2 text-[12px] text-white/60">
        {items.map((t, i) => {
          const label = typeof t === "string" ? t : t.label;
          const href = typeof t === "string" ? "#" : (t.href || "#");
          const external = typeof t !== "string" && t.external;
          return (
            <li key={i}>
              <a
                href={href}
                className="hover:text-white transition"
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ============ TWEAKS PANEL ============
function TweaksPanel({ state, setState, onClose }) {
  const set = (k, v) => {
    const next = { ...state, [k]: v };
    setState(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };
  const NAMES = null;
  const ACCENTS = [
    { name: "Or", v: "#C9A961" },
    { name: "Bleu nuit", v: "#6B8FB5" },
    { name: "Cuivre", v: "#B4693F" },
  ];
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-[#0A0A0A] border border-white/15 w-80 text-white shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="text-[11px] uppercase tracking-[0.2em]">Tweaks</div>
        <button onClick={onClose} className="text-white/40 hover:text-white text-xs">✕</button>
      </div>
      <div className="p-4 space-y-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Accent</div>
          <div className="grid grid-cols-3 gap-1.5">
            {ACCENTS.map(a => (
              <button key={a.v} onClick={() => set("accentColor", a.v)}
                className={"text-[11px] py-2 border transition flex items-center gap-2 justify-center " + (state.accentColor === a.v ? "border-white" : "border-white/15 hover:border-white/40")}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: a.v }} />
                {a.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[11px] text-white/70">Constellation 3D</div>
          <button onClick={() => set("show3D", !state.show3D)}
            className={"w-9 h-5 rounded-full transition relative " + (state.show3D ? "bg-white" : "bg-white/20")}>
            <div className={"w-4 h-4 rounded-full bg-black absolute top-0.5 transition " + (state.show3D ? "left-4" : "left-0.5")} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[11px] text-white/70">Vidéos génératives</div>
          <button onClick={() => set("showVideo", !state.showVideo)}
            className={"w-9 h-5 rounded-full transition relative " + (state.showVideo ? "bg-white" : "bg-white/20")}>
            <div className={"w-4 h-4 rounded-full bg-black absolute top-0.5 transition " + (state.showVideo ? "left-4" : "left-0.5")} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ APP ============
function App() {
  const [state, setState] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Cursor halo
  const haloRef = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      if (!haloRef.current) return;
      haloRef.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen antialiased selection:bg-white selection:text-black">
      {/* Cursor halo */}
      <div
        ref={haloRef}
        className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full z-[1]"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(state.accentColor, 0.08)} 0%, transparent 60%)`,
          willChange: "transform",
        }}
      />

      <Nav accentColor={state.accentColor} />
      <Hero {...state} />
      <Thesis />
      <Verticals />
      <AxonShowcase accentColor={state.accentColor} />
      <KpiStrip />
      <Research />
      <Founder accentColor={state.accentColor} />
      <Contact accentColor={state.accentColor} />
      <Footer accentColor={state.accentColor} />

      {tweaksOpen && <TweaksPanel state={state} setState={setState} onClose={() => setTweaksOpen(false)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
